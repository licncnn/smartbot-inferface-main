import React, { useImperativeHandle, useState } from "react";
import { Box, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { StrategiesQuantityModalStep } from './StrategesQuantityModalStep.js';
import { isMobile } from "../utils";

const DialogTitleWithClose = ({ children, onClose }) => {
    return <DialogTitle>
        <Box sx={{ textAlign: "center" }}>
            {children}
        </Box>
        {onClose ? (
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
            <CloseIcon />
        </IconButton>) : null}
    </DialogTitle>
}

export const StrategiesModal = (props, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [txHash, setTxHash] = useState(undefined)
    const [strategyID, setStrategyID] = useState(1) // 假设默认策略为1

    const handleClose = () => {
        setIsOpen(false);
    }

    // useImperativeHandle(ref, () => ({
    //     setIsOpen,
    // }))

    useImperativeHandle(ref, () => ({
        setIsOpen,
        setStrategyID, // 新增行：允许外部调用setStrategyID来更新内部状态
    }));

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}>
            {isLoading &&
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 300,
                    height: 300,
                }}>
                    <CircularProgress />
                    <Typography
                        sx={{ mt: 3, textAlign: "center" }}
                        variant="h4">
                        Executing Strategy...
                    </Typography>
                </Box>
            }
            {!isLoading && <>
            <DialogTitleWithClose onClose={handleClose}>
                <Typography variant="h6">Execute Strategy</Typography>
            </DialogTitleWithClose>
            <DialogContent>
                <StrategiesQuantityModalStep
                    setIsLoading={setIsLoading}
                    setTxHash={setTxHash}
                    strategyID={strategyID}
                />
            </DialogContent>
            </>}
        </Dialog>
    )
}

export const strategiesModalRef = React.createRef();

// export const ShowStrategiesModal = () => {
//     strategiesModalRef.current?.setIsOpen(true);
// }
export const ShowStrategiesModal = (strategyID) => {
    if (strategiesModalRef.current) {
        strategiesModalRef.current.setIsOpen(true);
        strategiesModalRef.current.setStrategyID(strategyID); // 新增行：设置策略ID
    }
};

export default React.forwardRef(StrategiesModal);
