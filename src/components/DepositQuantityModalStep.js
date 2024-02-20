import React, { useEffect, useState } from 'react';
import { Box, Button, Skeleton, Slider,TextField } from '@mui/material';
import {
    deposit_func
} from '../mint/web3';
import { showAlert } from './AutoHideAlert';
import { parseTxError, roundToDecimal } from '../utils';
import { Attribution } from './Attribution';
import { isEthereumContract } from "../contract";

export const QuantityModalStep = ({ setQuantity, setIsLoading, setTxHash, setStep }) => {
    const [depositAmount, setDepositAmount] = useState(0.001)
    
    const handleDepositChange = (event) => {
        setDepositAmount(event.target.value);
        console.log("Handling deposit amount change");
    };
    
    useEffect(() => {
        if (isEthereumContract()) {
        }
        if (!window.DEFAULTS?.hideCounter) {
        }
    }, [])

    const onSuccess = async () => {
        console.log("onSuccess triggered");
        setIsLoading(true)
        const { tx } = await deposit_func(depositAmount)
        if (tx === undefined) {
            console.log("tx is not defined");
            setIsLoading(false)
        }
        tx?.on("transactionHash", (hash) => {
            setTxHash(hash)
        })?.on("confirmation", async () => {
            setIsLoading(false)
            showAlert(`Successfully deposited your eth${window.DEFAULTS?.redirectURL ? ". You will be redirected in less than a second" : ""}`, "success")
            // TODO: show success state in the modal
            if (window.DEFAULTS?.redirectURL) {
                setTimeout(() => {
                    window.location.href = window.DEFAULTS?.redirectURL
                }, 800)
            }
        })?.on("error", (e) => {
            setIsLoading(false)
            const { code, message } = parseTxError(e);
            if (code !== 4001) {
                showAlert(`Deposit error: ${message}. Please try again or contact us`, "error");
            }
        })
    }

    return <div style={{ width: "100%" }}>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Deposit Amount (ETH)"
                variant="outlined"
                value={depositAmount}
                onChange={handleDepositChange}
                type="number"
                InputProps={{ inputProps: { min: 0, step: "0.01" } }}
            />
            <Button
                onClick={onSuccess}
                sx={{ width: "100%" }}
                variant="contained"
            >
                Deposit ETH
            </Button>
        </Box>
        <Attribution sx={{ mt: 3, justifyContent: "center" }} />
    </div>
}
