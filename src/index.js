import React from 'react';
import amplitude from 'amplitude-js';
import { render } from "react-dom";
import { App } from "./components/App.js";
import "./styles/index.css";
import { showAlert } from "./components/AutoHideAlert.js";
// import { showMintModal } from "./components/MintModal.js";

import { ShowDepositModal } from "./components/DepositModal";
import { ShowWithDrawModal } from "./components/WithDrawModal.js";


import { init } from "./mint";
import { dirtyFixConnectWalletUI } from "./utils";

// Anonymous analytics for Buildship to know how many users
const sendAnonymousAnalytics = () => {
    if (window.location.host.includes("localhost"))
        return

    try {
        amplitude.getInstance().init("e2aff4bf282355999267edb40276222a")
        amplitude.getInstance().setOptOut(window.DEFAULTS?.analyticsOptOut ?? false)
        amplitude.getInstance().logEvent("Opened minting website", {
            "url": window.location.host.replace('www.', '')
        })
        amplitude.getInstance().setDomain(window.location.host.replace('www.', ''))
    } catch (e) {
        console.log("Error in sendAnonymousAnalytics()")
    }
}

const createDOMElement = () => {
    const body = document.getElementsByTagName('body')[0];
    const div = Object.assign(document.createElement('div'), {
        id: "root",
    });
    body.appendChild(div);
    return div;
}

const renderAppContainer = () => {
    render(<App />, createDOMElement());
}

const isRendered = () => {
    return !!document.getElementById("root")
}

const renderAndInit = () => {
    renderAppContainer()
    if (!isRendered()) {
        console.error("React not rendered, returning")
        return
    }
    init()

    // TODO: remove this when migrated to @buildship/web3-login or forked Web3Modal
    // Puts "custom-metamask" provider as the first option
    dirtyFixConnectWalletUI()
    sendAnonymousAnalytics()
}

document.addEventListener("DOMContentLoaded", () => {
    renderAndInit()
});

window.onload = () => {
    if (!isRendered()) {
        console.warn("React re-rendering in window.onload")
        renderAndInit()
    }
}

export { showAlert, ShowDepositModal,ShowWithDrawModal, renderAppContainer };



