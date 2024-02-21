import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { executeStrategyFunction } from '../mint/web3'; // 从 ../mint/web3 导入执行策略的方法
import { showAlert } from './AutoHideAlert';
import { parseTxError } from '../utils';

export const StrategiesQuantityModalStep = ({ setIsLoading, setTxHash,strategyID }) => {
    const [tokenSelection, setTokenSelection] = useState('ETH');
    const [stopLoss, setStopLoss] = useState(0.6);
    const [takeProfit, setTakeProfit] = useState(1.5);
    const [positionSize, setPositionSize] = useState(0.7);
    const [maxDrawdownLimit, setMaxDrawdownLimit] = useState(0.2);

    const handleExecute = async () => {
        console.log("Executing strategy with parameters");
        setIsLoading(true);
        try {
            // 调用 executeStrategyFunction 发送交易
            // const txResponse = await executeStrategyFunction({
            //     tokenSelection,
            //     stopLoss,
            //     takeProfit,
            //     positionSize,
            //     maxDrawdownLimit,
            // });
            const { tx } = await executeStrategyFunction(strategyID, {
                tokenSelection,
                stopLoss,
                takeProfit,
                positionSize,
                maxDrawdownLimit,
            });

            // 监听 transactionHash 事件
            tx.on("transactionHash", (hash) => {
                console.log(`Transaction hash: ${hash}`);
                setTxHash(hash);
                showAlert(`Transaction submitted: ${hash}`, "info");
            });

            // 监听 confirmation 事件
            tx.on("confirmation", (confirmationNumber, receipt) => {
                console.log(`Transaction confirmed, confirmation number: ${confirmationNumber}`);
                setIsLoading(false);
                if (receipt.status) {
                    showAlert("Strategy executed successfully", "success");
                } else {
                    showAlert("Strategy execution failed", "error");
                }
            });

            // 监听 error 事件
            tx.on("error", (error) => {
                console.error("Transaction error", error);
                setIsLoading(false);
                const { message } = parseTxError(error);
                showAlert(`Strategy execution error: ${message}`, "error");
            });

            
            // // 监听交易的状态
            // console.log("txResponse: ",txResponse)
            // if (txResponse && txResponse.hash) {
            //     setTxHash(txResponse.hash); // 设置交易哈希
            //     showAlert(`Transaction submitted: ${txResponse.hash}`, "info");

            //     const receipt = await txResponse.wait(); // 等待交易确认
            //     console.log("receipt : ",receipt)
            //     if (receipt.status === 1) {
            //         showAlert("Strategy executed successfully", "success");
            //     } else {
            //         showAlert("Strategy execution failed", "error");
            //     }
            // }
        } catch (e) {

            console.error("Execution error", e);
            setIsLoading(false);
            const { message } = parseTxError(e);
            showAlert(`Strategy execution error: ${message}`, "error");


            // const { message } = parseTxError(e);
            // showAlert(`Strategy execution error: ${message}`, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" gutterBottom>Strategy Parameters</Typography>
            {/* 策略参数输入字段 */}
            <TextField label="Token Selection" variant="outlined" value={tokenSelection} onChange={e => setTokenSelection(e.target.value)} />
            <TextField label="Stop-Loss Setting" variant="outlined" value={stopLoss} type="number" onChange={e => setStopLoss(parseFloat(e.target.value))} />
            <TextField label="Take-Profit Setting" variant="outlined" value={takeProfit} type="number" onChange={e => setTakeProfit(parseFloat(e.target.value))} />
            <TextField label="Position Size" variant="outlined" value={positionSize} type="number" onChange={e => setPositionSize(parseFloat(e.target.value))} />
            <TextField label="Maximum Drawdown Limit" variant="outlined" value={maxDrawdownLimit} type="number" onChange={e => setMaxDrawdownLimit(parseFloat(e.target.value))} />
            <Button onClick={handleExecute} sx={{ width: "100%", mt: 2 }} variant="contained">Execute Strategy</Button>
        </Box>
    );
}
