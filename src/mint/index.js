import { updateWithDrawButton,updateDepositButton, updateMintedCounter,updateStrategy1Button,updateStrategy2Button,updateStrategy3Button,updateStrategy4Button,updateStrategy5Button,updateStrategy6Button } from "./ui.js";
import { updateConnectButton, updateWalletStatus } from "../wallet.js";
import { setContracts } from "../contract.js";
import { blacklist } from "./blacklist";

export const init = async () => {
    if (blacklist.includes(window.location.host.replace('www.', ''))) {
        alert("This website is blacklisted by Buildship minting widget as it's a scam. " +
            "You shouldn't mint as it's pretending to be another project")
        return
    }

    await updateWalletStatus();
    await setContracts();
    updateConnectButton();
    updateMintedCounter();
    updateWithDrawButton();
    updateDepositButton();
    updateStrategy1Button();
    updateStrategy2Button();
    updateStrategy3Button();
    updateStrategy4Button();
    updateStrategy5Button();
    updateStrategy6Button();
}