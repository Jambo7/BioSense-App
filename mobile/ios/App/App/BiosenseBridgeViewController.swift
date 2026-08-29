import UIKit
import Capacitor

class BiosenseBridgeViewController: CAPBridgeViewController {
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(BiosenseHealthPlugin())
    }
}
