import { getWalletAddressOrConnect, web3 } from "../wallet.js";
import { formatValue} from "../utils.js";
import { NFTContract } from "../contract.js"
import { buildTx } from "../tx";
import { readOnlyWeb3 } from "../web3";
import { showAlert } from '../components/AutoHideAlert';

const findMethodByName = (methodName) =>
    Object.keys(NFTContract.methods)
        .find(key => key.toLowerCase() === methodName.toLowerCase())

const getMethodWithCustomName = (methodName) => {
    const method = window.DEFAULTS?.contractMethods ? window.DEFAULTS?.contractMethods[methodName] : undefined
    if (method) {
        console.log(`Using custom ${methodName} method name: `, method)
        if (NFTContract.methods[method]) {
            return NFTContract.methods[method]
        } else {
            alert(`Custom ${methodName} name isn't present in the ABI, using default name`)
            console.log(`Custom ${methodName} name isn't present in the ABI, using default name`)
        }
    }
    return undefined
}


const getDepositTx = ({ numberOfTokens }) => {
    const customMintMethod = getMethodWithCustomName('deposit')
    if (customMintMethod)
        return customMintMethod()

    console.log("Using hardcoded mint method detection")
    const methodNameVariants = ['deposit', 'depositeth']
    const name = methodNameVariants.find(n => findMethodByName(n) !== undefined)
    if (!name) {
        alert("widget doesn't know how to mint from your contract.")
        return undefined
    }
    return NFTContract.methods[findMethodByName(name)]();
}


const getWithDrawTx = ({ numberOfTokens }) => {
    const customMintMethod = getMethodWithCustomName('withdrawETH')
    if (customMintMethod)
        return customMintMethod(numberOfTokens)

    console.log("Using hardcoded mint method detection")
    const methodNameVariants = ['withdrawETH', 'withdrawETH']
    const name = methodNameVariants.find(n => findMethodByName(n) !== undefined)
    if (!name) {
        alert("widget doesn't know how to mint from your contract.")
        return undefined
    }
    return NFTContract.methods[findMethodByName(name)](numberOfTokens);
}



const getStrategy1Tx = async (strategyParams) => {
    // 检查策略参数，如果未提供，则使用默认值
    const {
        tokenSelection = 'ETH',
        stopLoss = 0.6,
        takeProfit = 1.5,
        positionSize = 0.7,
        maxDrawdownLimit = 0.2
    } = strategyParams;

    // 调用智能合约的strategy_1方法
    // 注意：这里假设所有的数值参数都已经是合适的格式（例如，stopLoss已经是合约期望的单位）
    // 如果合约期望的单位不同（如wei等），您需要进行转换
    return NFTContract.methods.strategy_1(
        tokenSelection,
        web3.utils.toWei(stopLoss.toString(), 'ether'),
        web3.utils.toWei(takeProfit.toString(), 'ether'),
        web3.utils.toWei(positionSize.toString(), 'ether'),
        web3.utils.toWei(maxDrawdownLimit.toString(), 'ether')
    );
};

const getStrategy2Tx = async (strategyParams) => {
    // 使用相同的参数和默认值逻辑
    const {
        tokenSelection = 'ETH',
        stopLoss = 0.6,
        takeProfit = 1.5,
        positionSize = 0.7,
        maxDrawdownLimit = 0.2
    } = strategyParams;

    // 调用智能合约的strategy_2方法
    return NFTContract.methods.strategy_2(
        tokenSelection,
        web3.utils.toWei(stopLoss.toString(), 'ether'),
        web3.utils.toWei(takeProfit.toString(), 'ether'),
        web3.utils.toWei(positionSize.toString(), 'ether'),
        web3.utils.toWei(maxDrawdownLimit.toString(), 'ether')
    );
};


const getStrategy3Tx = async (strategyParams) => {
    const {
        tokenSelection = 'ETH',
        stopLoss = 0.6,
        takeProfit = 1.5,
        positionSize = 0.7,
        maxDrawdownLimit = 0.2
    } = strategyParams;

    return NFTContract.methods.strategy_3(
        tokenSelection,
        web3.utils.toWei(stopLoss.toString(), 'ether'),
        web3.utils.toWei(takeProfit.toString(), 'ether'),
        web3.utils.toWei(positionSize.toString(), 'ether'),
        web3.utils.toWei(maxDrawdownLimit.toString(), 'ether')
    );
};

const getStrategy4Tx = async (strategyParams) => {
    const {
        tokenSelection = 'ETH',
        stopLoss = 0.6,
        takeProfit = 1.5,
        positionSize = 0.7,
        maxDrawdownLimit = 0.2
    } = strategyParams;

    return NFTContract.methods.strategy_4(
        tokenSelection,
        web3.utils.toWei(stopLoss.toString(), 'ether'),
        web3.utils.toWei(takeProfit.toString(), 'ether'),
        web3.utils.toWei(positionSize.toString(), 'ether'),
        web3.utils.toWei(maxDrawdownLimit.toString(), 'ether')
    );
};

const getStrategy5Tx = async (strategyParams) => {
    const {
        tokenSelection = 'ETH',
        stopLoss = 0.6,
        takeProfit = 1.5,
        positionSize = 0.7,
        maxDrawdownLimit = 0.2
    } = strategyParams;

    return NFTContract.methods.strategy_5(
        tokenSelection,
        web3.utils.toWei(stopLoss.toString(), 'ether'),
        web3.utils.toWei(takeProfit.toString(), 'ether'),
        web3.utils.toWei(positionSize.toString(), 'ether'),
        web3.utils.toWei(maxDrawdownLimit.toString(), 'ether')
    );
};

const getStrategy6Tx = async (strategyParams) => {
    const {
        tokenSelection = 'ETH',
        stopLoss = 0.6,
        takeProfit = 1.5,
        positionSize = 0.7,
        maxDrawdownLimit = 0.2
    } = strategyParams;

    return NFTContract.methods.strategy_6(
        tokenSelection,
        web3.utils.toWei(stopLoss.toString(), 'ether'),
        web3.utils.toWei(takeProfit.toString(), 'ether'),
        web3.utils.toWei(positionSize.toString(), 'ether'),
        web3.utils.toWei(maxDrawdownLimit.toString(), 'ether')
    );
};


// const getMintTx = ({ numberOfTokens }) => {
//     const customMintMethod = getMethodWithCustomName('withdrawETH')
//     if (customMintMethod)
//         return customMintMethod(numberOfTokens)

//     console.log("Using hardcoded mint method detection")
//     const methodNameVariants = ['withdrawETH', 'withdrawETH']
//     const name = methodNameVariants.find(n => findMethodByName(n) !== undefined)
//     if (!name) {
//         alert("widget doesn't know how to mint from your contract.")
//         return undefined
//     }
//     return NFTContract.methods[findMethodByName(name)](numberOfTokens);
// }

const getMintPriceConstant = () => {
    // for contracts without exported price variable or method
    const defaultPrice = window.DEFAULTS?.publicMint?.price
    if (defaultPrice) {
        const priceNumber = typeof defaultPrice === "string" ? Number(defaultPrice) : defaultPrice
        if (isNaN(priceNumber)) {
            alert("Wrong publicMintPrice format, should be a number in ETH (or native token)")
            return undefined
        }
        console.warn("Using DEFAULTS.publicMint.price as price not found in the smart-contract")
        return (priceNumber * 1e18).toString()
    }
    return undefined
}

export const getMintPrice = async () => {
    const customMintPriceMethod = getMethodWithCustomName('price')
    if (customMintPriceMethod) {
        return customMintPriceMethod().call()
    }

    const mintPriceConstant = getMintPriceConstant()
    if (mintPriceConstant !== undefined) {
        console.log("Using constant mint price specified in DEFAULTS")
        return mintPriceConstant
    }

    const matches = Object.keys(NFTContract.methods).filter(key =>
        !key.includes("()") && (key.toLowerCase().includes('price') || key.toLowerCase().includes('cost'))
    )
    switch (matches.length) {
        // Use auto-detection only when sure
        // Otherwise this code might accidentally use presale price instead of public minting price
        case 1:
            console.log("Using price method auto-detection")
            return NFTContract.methods[matches[0]]().call()
        default:
            console.log("Using hardcoded price detection")
            const methodNameVariants = ['price', 'cost', 'public_sale_price', 'getPrice', 'salePrice']
            const name = methodNameVariants.find(n => findMethodByName(n) !== undefined)
            if (!name) {
                alert("Buildship widget doesn't know how to fetch price from your contract. Contact https://buildship.xyz in Discord to resolve this.")
                return undefined
            }
            return NFTContract.methods[findMethodByName(name)]().call();
    }
}

export const getMintedNumber = async () => {
    if (!NFTContract)
        return undefined

    const customTotalSupplyMethod = getMethodWithCustomName('totalSupply')
    if (customTotalSupplyMethod)
        return await customTotalSupplyMethod().call()

    if (NFTContract.methods.totalSupply)
        return await NFTContract.methods.totalSupply().call()
    // temporary solution, works only for buildship.xyz contracts
    // totalSupply was removed to save gas when minting
    // but number minted still accessible in the contract as a private variable
    // TODO: remove this in NFTFactory v1.1
    const minted = await readOnlyWeb3.eth.getStorageAt(
        NFTContract._address,
        '0x00000000000000000000000000000000000000000000000000000000000000fb'
    )
    return readOnlyWeb3.utils.hexToNumber(minted)
}

export const getMaxSupply = async () => {
    if (!NFTContract)
        return undefined

    const customMaxSupplyMethod = getMethodWithCustomName('maxSupply')
    if (customMaxSupplyMethod)
        return await customMaxSupplyMethod().call()

    if (NFTContract.methods.maxSupply)
        return await NFTContract.methods.maxSupply().call()
    if (NFTContract.methods.MAX_SUPPLY)
        return await NFTContract.methods.MAX_SUPPLY().call()
    alert("Widget doesn't know how to fetch maxSupply from your contract. Contact https://buildship.xyz to resolve this.")
    return undefined
}

export const getDefaultMaxTokensPerMint = () => {
    const defaultMaxPerMintConfig = window.DEFAULTS?.publicMint?.maxPerMint || window.MAX_PER_MINT
    if (!defaultMaxPerMintConfig || isNaN(Number(defaultMaxPerMintConfig))) {
        console.error("Can't read maxPerMint from your contract & config, using default value: 10")
        return 10
    }
    return Number(defaultMaxPerMintConfig)
}

export const getMaxTokensPerMint = async () => {
    const customMaxPerMintMethod = getMethodWithCustomName('maxPerMint')
    if (customMaxPerMintMethod)
        return await customMaxPerMintMethod().call().then(Number)

    if (NFTContract?.methods?.maxPerMint) {
        return Number(await NFTContract.methods.maxPerMint().call())
    }
    if (NFTContract?.methods?.maxMintAmount) {
        return Number(await NFTContract.methods.maxMintAmount().call())
    }
    if (NFTContract?.methods?.MAX_TOKENS_PER_MINT) {
        return Number(await NFTContract.methods.MAX_TOKENS_PER_MINT().call())
    }
    return getDefaultMaxTokensPerMint()
}



export const withdraw_func = async (nTokens) => {
    const wallet = await getWalletAddressOrConnect(true);
    if (!wallet) {
        console.log("wallet error");
        return { tx: undefined }
    }
    // const numberOfTokens = (nTokens ?? 1) * 1e18;
    const BigNumber = require('bignumber.js'); // 假设你使用的是bignumber.js库
    // const numberOfTokens = new BigNumber(nTokens ?? 1).multipliedBy(new BigNumber(1e18));
    const numberOfTokens = (new BigNumber(nTokens ?? 1).multipliedBy(new BigNumber('1000000000000000000'))).toString();
    
    const txParams = {
        from: wallet,
        value: 0,
    }
    const mintTx = await getWithDrawTx({ numberOfTokens })
    if (!mintTx) {
        console.log("mintTx error");
        return { tx: undefined }
    }
    const txBuilder = await buildTx(
        mintTx,
        txParams,
        // TODO: use different limits for ERC721A / ERC721
        window.DEFAULTS?.publicMint?.defaultGasLimit ?? 100000,
        window.DEFAULTS?.publicMint?.gasLimitSlippage ?? 5000
    )
    if (!txBuilder) {
        console.log("txBuilder error");
        return { tx: undefined }
    }
    const tx = mintTx.send(txBuilder)
    // https://github.com/ChainSafe/web3.js/issues/1547
    return Promise.resolve({ tx })
}



export const deposit_func = async (nTokens) => {
    const wallet = await getWalletAddressOrConnect(true);
    if (!wallet) {
        console.log("wallet error");
        return { tx: undefined }
    }
    const numberOfTokens = nTokens ?? 1;
    const txParams = {
        from: wallet,
        value: formatValue(numberOfTokens*1e18),
    }
    const mintTx = await getDepositTx({ numberOfTokens })
    if (!mintTx) {
        console.log("mintTx error");
        return { tx: undefined }
    }
    const txBuilder = await buildTx(
        mintTx,
        txParams,
        // TODO: use different limits for ERC721A / ERC721
        window.DEFAULTS?.publicMint?.defaultGasLimit ?? 100000,
        window.DEFAULTS?.publicMint?.gasLimitSlippage ?? 5000
    )
    if (!txBuilder) {
        console.log("txBuilder error");
        return { tx: undefined }
    }
    const tx = mintTx.send(txBuilder)
    // https://github.com/ChainSafe/web3.js/issues/1547
    return Promise.resolve({ tx })
}



export const executeStrategyFunction = async (strategyId, strategyParams) => {
    const wallet = await getWalletAddressOrConnect(true);
    if (!wallet) {
        showAlert("Wallet connection error", "error");
        return { tx: undefined };
    }

    // 构建策略执行的交易参数
    const txParams = {
        from: wallet,
        // 注意: 根据策略的具体要求，可能需要设置value字段
        // value: web3.utils.toWei("0.1", "ether"), // 仅当策略执行需要发送ETH时设置
    };

    // 根据strategyId选择执行的策略方法
    let executeTx;
    console.log("current  strategyId",strategyId)
    if (strategyId === "1") {
        executeTx = await getStrategy1Tx(strategyParams);
    } else if (strategyId === "2") {
        executeTx = await getStrategy2Tx(strategyParams);
    } else if (strategyId === "3") {
        executeTx = await getStrategy3Tx(strategyParams);
    } else if (strategyId === "4") {
        executeTx = await getStrategy4Tx(strategyParams);
    } else if (strategyId === "5") {
        executeTx = await getStrategy5Tx(strategyParams);
    } else if (strategyId === "6") {
        executeTx = await getStrategy6Tx(strategyParams);
    } else {
        console.log("executeTx: ", executeTx);
        showAlert("Invalid strategy ID", "error");
        return { tx: undefined };
    }

    if (!executeTx) {
        showAlert("Failed to build strategy execution transaction", "error");
        return { tx: undefined };
    }

    // 构建并发送交易
    try {
        const txBuilder = await buildTx(
            executeTx,
            txParams,
            window.DEFAULTS?.publicMint?.defaultGasLimit ?? 100000,
            window.DEFAULTS?.publicMint?.gasLimitSlippage ?? 5000
        );

        if (!txBuilder) {
            showAlert("Failed to build transaction", "error");
            return { tx: undefined };
        }

        const tx = executeTx.send(txBuilder);
        console.log("txParams data:  ",txParams)
        console.log("tx data:  ",tx)

        return Promise.resolve({ tx });
    } catch (error) {
        showAlert(`Strategy execution failed: ${error.message}`, "error");
        console.error("Error executing strategy:", error);
        return { tx: undefined };
    }
};