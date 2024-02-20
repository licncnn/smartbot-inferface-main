import React from "react";
import AutoHideAlert, {alertRef} from "./AutoHideAlert.js";
import ShowDepositModal, {depositmodalRef} from "./DepositModal.js";
import ShowWithDrawModal, {withdrawmodalRef} from "./WithDrawModal.js";

import StrategiesModal, {strategiesModalRef} from "./StrategesModal.js";
// import { showDepositModal } from "../components/DepositModal";
// import { showWithDrawModal } from "../components/WithDrawModal.js";

import {ThemeProvider} from "@mui/material";
import {theme} from "../styles/theme.js";

export const App = () => {
    return <ThemeProvider theme={theme}>
        <div>
            <AutoHideAlert ref={alertRef} />
            <ShowDepositModal ref={depositmodalRef} />
            <ShowWithDrawModal ref={withdrawmodalRef} />
            <StrategiesModal ref={strategiesModalRef}/>
        </div>
    </ThemeProvider>
}
