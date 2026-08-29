import Capacitor
import HealthKit

@objc(BiosenseHealthPlugin)
public class BiosenseHealthPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "BiosenseHealthPlugin"
    public let jsName = "BiosenseHealth"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "available", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestAuthorization", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "queryDays", returnType: CAPPluginReturnPromise),
    ]

    private let store = HKHealthStore()

    private var readTypes: Set<HKObjectType> {
        var types = Set<HKObjectType>()
        let ids: [HKQuantityTypeIdentifier] = [
            .stepCount,
            .restingHeartRate,
            .heartRateVariabilitySDNN,
            .appleExerciseTime,
            .activeEnergyBurned,
        ]
        for id in ids {
            if let t = HKObjectType.quantityType(forIdentifier: id) {
                types.insert(t)
            }
        }
        if let sleep = HKObjectType.categoryType(forIdentifier: .sleepAnalysis) {
            types.insert(sleep)
        }
        return types
    }

    @objc func available(_ call: CAPPluginCall) {
        call.resolve(["available": HKHealthStore.isHealthDataAvailable()])
    }

    @objc func requestAuthorization(_ call: CAPPluginCall) {
        guard HKHealthStore.isHealthDataAvailable() else {
            call.reject("Health data is not available on this device")
            return
        }
        store.requestAuthorization(toShare: Set<HKSampleType>(), read: readTypes) { ok, err in
            if let err = err {
                call.reject(err.localizedDescription)
                return
            }
            call.resolve(["granted": ok])
        }
    }

    @objc func queryDays(_ call: CAPPluginCall) {
        guard HKHealthStore.isHealthDataAvailable() else {
            call.reject("Health data is not available on this device")
            return
        }

        let dayCount = max(1, min(call.getInt("days") ?? 14, 31))
        let cal = Calendar.current
        let end = Date()
        guard let start = cal.date(byAdding: .day, value: -(dayCount - 1), to: cal.startOfDay(for: end)) else {
            call.reject("Could not compute date range")
            return
        }

        var buckets: [String: [String: Double]] = [:]
        func key(_ date: Date) -> String {
            let c = cal.dateComponents([.year, .month, .day], from: date)
            return String(format: "%04d-%02d-%02d", c.year ?? 0, c.month ?? 0, c.day ?? 0)
        }
        let group = DispatchGroup()

        func stats(
            id: HKQuantityTypeIdentifier,
            options: HKStatisticsOptions,
            unit: HKUnit,
            field: String,
            mode: String
        ) {
            guard let type = HKQuantityType.quantityType(forIdentifier: id) else { return }
            group.enter()
            let interval = DateComponents(day: 1)
            let query = HKStatisticsCollectionQuery(
                quantityType: type,
                quantitySamplePredicate: HKQuery.predicateForSamples(withStart: start, end: end, options: .strictStartDate),
                options: options,
                anchorDate: start,
                intervalComponents: interval
            )
            query.initialResultsHandler = { _, results, error in
                defer { group.leave() }
                guard error == nil, let results = results else { return }
                results.enumerateStatistics(from: start, to: end) { stat, _ in
                    let qty: HKQuantity?
                    if options.contains(.cumulativeSum) {
                        qty = stat.sumQuantity()
                    } else {
                        qty = stat.averageQuantity()
                    }
                    guard let qty = qty else { return }
                    let value = qty.doubleValue(for: unit)
                    let k = key(stat.startDate)
                    var row = buckets[k] ?? [:]
                    if mode == "sum" {
                        row[field] = (row[field] ?? 0) + value
                    } else {
                        row[field] = value
                    }
                    buckets[k] = row
                }
            }
            store.execute(query)
        }

        let bpm = HKUnit.count().unitDivided(by: HKUnit.minute())
        stats(id: .stepCount, options: .cumulativeSum, unit: .count(), field: "steps", mode: "sum")
        stats(id: .appleExerciseTime, options: .cumulativeSum, unit: .minute(), field: "activeMinutes", mode: "sum")
        stats(id: .restingHeartRate, options: .discreteAverage, unit: bpm, field: "rhr", mode: "avg")
        stats(id: .heartRateVariabilitySDNN, options: .discreteAverage, unit: .secondUnit(with: .milli), field: "hrv", mode: "avg")

        group.enter()
        if let sleepType = HKObjectType.categoryType(forIdentifier: .sleepAnalysis) {
            let pred = HKQuery.predicateForSamples(withStart: start, end: end, options: .strictStartDate)
            let q = HKSampleQuery(sampleType: sleepType, predicate: pred, limit: HKObjectQueryNoLimit, sortDescriptors: nil) { _, samples, _ in
                defer { group.leave() }
                guard let samples = samples as? [HKCategorySample] else { return }
                for sample in samples {
                    let asleep: Bool
                    if #available(iOS 16.0, *) {
                        switch sample.value {
                        case HKCategoryValueSleepAnalysis.asleepUnspecified.rawValue,
                             HKCategoryValueSleepAnalysis.asleepCore.rawValue,
                             HKCategoryValueSleepAnalysis.asleepDeep.rawValue,
                             HKCategoryValueSleepAnalysis.asleepREM.rawValue:
                            asleep = true
                        default:
                            asleep = false
                        }
                    } else {
                        asleep = sample.value == HKCategoryValueSleepAnalysis.asleep.rawValue
                    }
                    guard asleep else { continue }
                    let hours = sample.endDate.timeIntervalSince(sample.startDate) / 3600.0
                    // Attribute overnight sleep to the wake calendar day.
                    let k = key(sample.endDate)
                    var row = buckets[k] ?? [:]
                    row["sleepHours"] = (row["sleepHours"] ?? 0) + hours
                    buckets[k] = row
                }
            }
            store.execute(q)
        } else {
            group.leave()
        }

        group.notify(queue: .main) {
            let days = buckets.keys.sorted().compactMap { date -> [String: Any]? in
                guard var row = buckets[date] else { return nil }
                if let steps = row["steps"] { row["steps"] = steps.rounded() }
                if let mins = row["activeMinutes"] { row["activeMinutes"] = mins.rounded() }
                if let hours = row["sleepHours"] {
                    row["sleepHours"] = (hours * 10).rounded() / 10
                }
                if let rhr = row["rhr"] { row["rhr"] = rhr.rounded() }
                if let hrv = row["hrv"] { row["hrv"] = (hrv * 10).rounded() / 10 }
                let meaningful = ["steps", "rhr", "hrv", "activeMinutes", "sleepHours"].contains { field in
                    (row[field] ?? 0) > 0
                }
                guard meaningful else { return nil }
                var out: [String: Any] = ["date": date]
                for (k, v) in row { out[k] = v }
                return out
            }
            call.resolve(["days": days])
        }
    }
}
