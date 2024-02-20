import { getMaxSupply, getMintedNumber} from "./web3.js";
import { ShowDepositModal } from "../components/DepositModal";
import { ShowWithDrawModal } from "../components/WithDrawModal.js";

// 假设这里是您的策略模态框组件的导入
import { ShowStrategiesModal } from "../components/StrategesModal";


// 添加更新策略1按钮的函数
export const updateStrategy1Button = () => {
    const strategy1Buttons = [...document.querySelectorAll('#strategy_1-button')];

    if (strategy1Buttons.length) {
        strategy1Buttons.forEach((button) => {
            button.href = "#";
            button.onclick = async () => {
                // 这里可以添加逻辑来处理点击事件，例如显示策略1的模态框
                ShowStrategiesModal("1");
            };
        });
    }
};

// 添加更新策略2按钮的函数
export const updateStrategy2Button = () => {
    const strategy2Buttons = [...document.querySelectorAll('#strategy_2-button')];

    if (strategy2Buttons.length) {
        strategy2Buttons.forEach((button) => {
            button.href = "#";
            button.onclick = async () => {
                // 这里可以添加逻辑来处理点击事件，例如显示策略2的模态框
                ShowStrategiesModal("2");
            };
        });
    }
};

// 添加更新策略3按钮的函数
export const updateStrategy3Button = () => {
    const strategy3Buttons = [...document.querySelectorAll('#strategy_3-button')];

    if (strategy3Buttons.length) {
        strategy3Buttons.forEach((button) => {
            button.href = "#";
            button.onclick = async () => {
                // 这里可以添加逻辑来处理点击事件，例如显示策略3的模态框
                ShowStrategiesModal("3");
            };
        });
    }
};

// 添加更新策略4按钮的函数
export const updateStrategy4Button = () => {
    const strategy4Buttons = [...document.querySelectorAll('#strategy_4-button')];

    if (strategy4Buttons.length) {
        strategy4Buttons.forEach((button) => {
            button.href = "#";
            button.onclick = async () => {
                // 这里可以添加逻辑来处理点击事件，例如显示策略4的模态框
                ShowStrategiesModal("4");
            };
        });
    }
};

// 添加更新策略5按钮的函数
export const updateStrategy5Button = () => {
    const strategy5Buttons = [...document.querySelectorAll('#strategy_5-button')];

    if (strategy5Buttons.length) {
        strategy5Buttons.forEach((button) => {
            button.href = "#";
            button.onclick = async () => {
                // 这里可以添加逻辑来处理点击事件，例如显示策略5的模态框
                ShowStrategiesModal("5");
            };
        });
    }
};

// 添加更新策略6按钮的函数
export const updateStrategy6Button = () => {
    const strategy6Buttons = [...document.querySelectorAll('#strategy_6-button')];

    if (strategy6Buttons.length) {
        strategy6Buttons.forEach((button) => {
            button.href = "#";
            button.onclick = async () => {
                // 这里可以添加逻辑来处理点击事件，例如显示策略6的模态框
                ShowStrategiesModal("6");
            };
        });
    }
};


export const updateWithDrawButton = () => {
    const mintButtons = [
        ...document.querySelectorAll('#withdraw-button'),
        ...document.querySelectorAll("a[href*='#withdraw-button']")
    ]

    if (mintButtons) {
        console.log(mintButtons)
        mintButtons.forEach((mintButton) => {
            mintButton.href = "#"
            mintButton.onclick = async () => {
                const initialBtnText = mintButton.textContent;
                setButtonText(mintButton, "Loading...")
                try {
                    const quantity = getMintQuantity();
                    ShowWithDrawModal(quantity);
                } catch (e) {
                    console.log("Error on pressing mint")
                    console.error(e)
                    alert(`Error on mint: ${e}`)
                }
                setButtonText(mintButton, initialBtnText)
            }
        })
    }
}

export const updateDepositButton = () => {
    const mintButtons = [
        ...document.querySelectorAll('#deposit-button'),
        ...document.querySelectorAll("a[href*='#deposit-button']")
    ]

    if (mintButtons) {
        console.log(mintButtons)
        mintButtons.forEach((mintButton) => {
            mintButton.href = "#"
            mintButton.onclick = async () => {
                const initialBtnText = mintButton.textContent;
                setButtonText(mintButton, "Loading...")
                try {
                    const quantity = getMintQuantity();
                    ShowDepositModal(quantity);
                } catch (e) {
                    console.log("Error on pressing mint")
                    console.error(e)
                    alert(`Error on mint: ${e}`)
                }
                setButtonText(mintButton, initialBtnText)
            }
        })
    }
}

// export const updateMintButton = () => {
//     const mintButtons = [
//         ...document.querySelectorAll('#withdraw-button'),
//         ...document.querySelectorAll("a[href*='#withdraw-button']")
//     ]

//     if (mintButtons) {
//         console.log(mintButtons)
//         mintButtons.forEach((mintButton) => {
//             mintButton.href = "#"
//             mintButton.onclick = async () => {
//                 const initialBtnText = mintButton.textContent;
//                 setButtonText(mintButton, "Loading...")
//                 try {
//                     const quantity = getMintQuantity();
//                     showMintModal(quantity);
//                 } catch (e) {
//                     console.log("Error on pressing mint")
//                     console.error(e)
//                     alert(`Error on mint: ${e}`)
//                 }
//                 setButtonText(mintButton, initialBtnText)
//             }
//         })
//     }
// }

export const updateMintedCounter = async () => {
    // just test
}

const getMintQuantity = () => {
    const quantity = document.querySelector('#quantity-select')?.value
    return quantity !== '' && quantity !== undefined ? Number(quantity) : undefined;
}

const setButtonText = (btn, text) => {
    if (btn.childElementCount > 0) {
        btn.children[0].textContent = text;
    } else {
        btn.textContent = text;
    }
}
