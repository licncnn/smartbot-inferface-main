import React, { useEffect, useState } from 'react';
import { Box, Button, Skeleton, Slider,TextField } from '@mui/material';
import {
    withdraw_func
} from '../mint/web3';
import { showAlert } from './AutoHideAlert';
import { parseTxError, roundToDecimal } from '../utils';
import { Attribution } from './Attribution';
import { isEthereumContract } from "../contract";

export const QuantityModalStep = ({ setQuantity, setIsLoading, setTxHash, setStep }) => {
    const [WithdrawAmount, setWithdrawAmount] = useState(0.001)
    
    const handleWithdrawChange = (event) => {
        setWithdrawAmount(event.target.value);
        console.log("Handling withdraw amount change");
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
        const { tx } = await withdraw_func(WithdrawAmount)
        if (tx === undefined) {
            console.log("tx is not defined");
            setIsLoading(false)
        }
        tx?.on("transactionHash", (hash) => {
            setTxHash(hash)
        })?.on("confirmation", async () => {
            setIsLoading(false)
            showAlert(`Successfully withdraw your eth${window.DEFAULTS?.redirectURL ? ". You will be redirected in less than a second" : ""}`, "success")
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
                showAlert(`Withdraw error: ${message}. Please try again or contact us`, "error");
            }
        })
    }

    return <div style={{ width: "100%" }}>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Withdraw Amount (ETH)"
                variant="outlined"
                value={WithdrawAmount}
                onChange={handleWithdrawChange}
                type="number"
                InputProps={{ inputProps: { min: 0, step: "0.01" } }}
            />
            <Button
                onClick={onSuccess}
                sx={{ width: "100%" }}
                variant="contained"
            >
                Withdraw ETH...
            </Button>
        </Box>
        <Attribution sx={{ mt: 3, justifyContent: "center" }} />
    </div>
}
