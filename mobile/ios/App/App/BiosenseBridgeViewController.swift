import UIKit
import WebKit
import Capacitor

final class BiosenseHealthScriptHandler: NSObject, WKScriptMessageHandler {
    weak var webView: WKWebView?

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let body = message.body as? [String: Any],
              let id = body["id"] as? String,
              let method = body["method"] as? String
        else { return }

        let options = body["options"] as? [String: Any] ?? [:]
        let days = options["days"] as? Int ?? 14

        func send(ok: Bool, data: Any? = nil, error: String? = nil) {
            var payload: [String: Any] = ["id": id, "ok": ok]
            if let data { payload["data"] = data }
            if let error { payload["error"] = error }
            guard let jsonData = try? JSONSerialization.data(withJSONObject: payload),
                  let json = String(data: jsonData, encoding: .utf8)
            else { return }
            DispatchQueue.main.async {
                self.webView?.evaluateJavaScript("window.__biosenseHealthDone(\(json));", completionHandler: nil)
            }
        }

        switch method {
        case "available":
            send(ok: true, data: ["available": BiosenseHealthKit.shared.isAvailable()])
        case "requestAuthorization":
            BiosenseHealthKit.shared.requestAuthorization { result in
                switch result {
                case .success(let granted):
                    send(ok: true, data: ["granted": granted])
                case .failure(let err):
                    send(ok: false, error: err.localizedDescription)
                }
            }
        case "queryDays":
            BiosenseHealthKit.shared.queryDays(days) { result in
                switch result {
                case .success(let rows):
                    send(ok: true, data: ["days": rows])
                case .failure(let err):
                    send(ok: false, error: err.localizedDescription)
                }
            }
        default:
            send(ok: false, error: "Unknown Apple Health method")
        }
    }
}

class BiosenseBridgeViewController: CAPBridgeViewController {
    private let healthHandler = BiosenseHealthScriptHandler()

    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(BiosenseHealthPlugin())
        healthHandler.webView = webView
        let ucc = webView?.configuration.userContentController
        ucc?.add(healthHandler, name: "biosenseHealth")
        let js = """
        window.__biosenseNative = true;
        window.__biosenseHealthCb = window.__biosenseHealthCb || {};
        window.__biosenseHealthDone = function(payload) {
          var c = window.__biosenseHealthCb[payload.id];
          if (!c) return;
          delete window.__biosenseHealthCb[payload.id];
          if (payload.ok) c.resolve(payload.data);
          else c.reject(new Error(payload.error || 'Apple Health failed'));
        };
        """
        ucc?.addUserScript(WKUserScript(source: js, injectionTime: .atDocumentStart, forMainFrameOnly: false))
    }
}
