// const handlePurchase = () => {
//     const item = items.find(item => item.code === selectedCode);
//     if (item && coin >= item.price) {
//     // onPurchase(item.price);
//     setCoin(coin - item.price);
//     setDispensedItem([...dispensedItem, item]);
//     setErrorMessage('');
//     } else {
//     setErrorMessage('Invalid selection or insufficient balance');
//     }
// }

    // const onReturn = () => {
    //     setChange(total);
    //     let newMessage;
    //     if(total === 0){
    //         newMessage = ("Bye Bye");
    //     } else {
    //         newMessage = (`Thank you for your purchase, here is your change value: ₪${total}.`);
    //     }
    //     const newTotal = 0;
    //     setTotal(newTotal);
    //     onCoinChanged(newTotal, newMessage);
    // };

    // const onReturn = async () => {
    //     setChange(total);
    //     let newMessage;
    //     const moneyTypes = Object.values(allMoney).sort((a, b) => b.value - a.value);
    //     for (const moneyType of moneyTypes) {
    //         const moneyAmount = Math.min(total, moneyType.value * moneyType.quantity);
    //         if (moneyAmount === 0) {
    //             continue;
    //         }
    //         // total -= moneyAmount;
    //         setTotal(-moneyAmount);
    //         // total -= moneyAmount;
    //         const updatedMoneyType = {
    //             ...moneyType,
    //             amount: moneyType.amount - moneyAmount,
    //             quantity: moneyType.quantity - moneyAmount / moneyType.value,
    //         };
    //         try {
    //             await axios.put(`http://localhost:8000/api/money/${moneyType._id}`, updatedMoneyType);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    //     if (total === 0) {
    //         newMessage = "Bye Bye";
    //     } else {
    //         newMessage = `Thank you for your purchase, here is your change value: ₪${total}.`;
    //     }

    //     const newTotal = 0;
    //     setTotal(newTotal);
    //     onCoinChanged(newTotal, newMessage);
    // };

    // const onReturn = async () => {
    //     setChange(total);
    //     let newMessage;
    //     const moneyTypes = Object.values(allMoney).sort((a, b) => b.value - a.value);
    //     let remaining = total;
    //     for (const moneyType of moneyTypes) {
    //         const moneyAmount = Math.min(remaining, moneyType.value * moneyType.quantity);
    //         if (moneyAmount === 0) {
    //             continue;
    //         }
    //         remaining -= moneyAmount;
    //         const updatedMoneyType = {
    //             ...moneyType,
    //             amount: moneyType.amount - moneyAmount,
    //             quantity: moneyType.quantity - moneyAmount / moneyType.value,
    //         };
    //         try {
    //             await axios.put(`http://localhost:8000/api/money/${moneyType._id}`, updatedMoneyType);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    //     if (remaining === 0) {
    //         newMessage = "Bye Bye";
    //     } else {
    //         newMessage = `Thank you for your purchase, here is your change value: ₪${remaining}.`;
    //     }
    
    //     const newTotal = 0;
    //     setTotal(newTotal);
    //     onCoinChanged(newTotal, newMessage);
    // };

    // const onReturn = async () => {
    //     setChange(total);
    //     let newMessage;
    //     const moneyTypes = Object.values(allMoney).sort((a, b) => b.value - a.value);
    //     let remaining = total;
    //     for (const moneyType of moneyTypes) {
    //         const moneyAmount = Math.min(remaining, moneyType.value * moneyType.quantity);
    //         if (moneyAmount === 0) {
    //             continue;
    //         }
    //         remaining -= moneyAmount;
    //         const updatedMoneyType = {
    //             ...moneyType,
    //             amount: moneyType.amount - moneyAmount,
    //             quantity: moneyType.quantity - moneyAmount / moneyType.value,
    //         };
    //         try {
    //             await axios.put(`http://localhost:8000/api/money/${moneyType._id}`, updatedMoneyType);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //         if (remaining <= 0) {
    //             break;
    //         }
    //     }
    //     if (remaining === 0) {
    //         newMessage = "Bye Bye";
    //     } else {
    //         newMessage = `Thank you for your purchase, here is your change value: ₪${remaining}.`;
    //     }
    
    //     const newTotal = 0;
    //     setTotal(newTotal);
    //     onCoinChanged(newTotal, newMessage);
    // };
    
    // const onReturn = async () => {
    //     setChange(total);
    //     let newMessage;
    //     const moneyTypes = Object.values(allMoney)
    //         .sort((a, b) => b.value - a.value)
    //         .filter(moneyType => moneyType.value <= total);
    //     let remaining = total;
    //     for (const moneyType of moneyTypes) {
    //         const moneyAmount = Math.min(remaining, moneyType.value * moneyType.quantity);
    //         if (moneyAmount === 0) {
    //             continue;
    //         }
    //         remaining -= moneyAmount;
    //         const updatedMoneyType = {
    //             ...moneyType,
    //             amount: moneyType.amount - moneyAmount,
    //             quantity: moneyType.quantity - moneyAmount / moneyType.value,
    //         };
    //         try {
    //             await axios.put(`http://localhost:8000/api/money/${moneyType._id}`, updatedMoneyType);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    //     if (remaining === 0) {
    //         newMessage = "Bye Bye";
    //     } else {
    //         newMessage = `Thank you for your purchase, here is your change value: ₪${remaining}.`;
    //     }
    
    //     setTotal(0);
    //     onCoinChanged(0, newMessage);
    // };
    
    // const onReturn = async () => {
    //     setChange(total);
    //     let newMessage;
    //     let remaining = total;
    //     const moneyValues = Object.values(allMoney)
    //         .map(moneyType => moneyType.value)
    //         .sort((a, b) => b - a)
    //         .filter(value => value <= remaining);
    //     for (const value of moneyValues) {
    //         const moneyType = allMoney.find(money => money.value === value);
    //         const moneyAmount = Math.min(remaining, value * moneyType.quantity);
    //         if (moneyAmount === 0) {
    //             continue;
    //         }
    //         remaining -= moneyAmount;
    //         const updatedMoneyType = {
    //             ...moneyType,
    //             amount: moneyType.amount - moneyAmount,
    //             quantity: moneyType.quantity - moneyAmount / value,
    //         };
    //         try {
    //             await axios.put(`http://localhost:8000/api/money/${moneyType._id}`, updatedMoneyType);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    //     if (remaining === 0) {
    //         newMessage = "Bye Bye";
    //     } else {
    //         newMessage = `Thank you for your purchase, here is your change value: ₪${remaining}.`;
    //     }
    
    //     setTotal(0);
    //     onCoinChanged(0, newMessage);
    // };

    // const onReturn = async () => {
    //     setChange(total);
    //     let newMessage;
    //     let remaining = total;
    //     const moneyValues = Object.values(allMoney)
    //         .map(moneyType => moneyType.value)
    //         .sort((a, b) => b - a);
    //     while (remaining > 0) {
    //         const value = moneyValues.find(value => value <= remaining);
    //         if (!value) {
    //             break;
    //         }
    //         const moneyType = allMoney.find(money => money.value === value);
    //         const moneyAmount = Math.min(remaining, value * moneyType.quantity);
    //         if (moneyAmount === 0) {
    //             continue;
    //         }
    //         remaining -= moneyAmount;
    //         const updatedMoneyType = {
    //             ...moneyType,
    //             amount: moneyType.amount - moneyAmount,
    //             quantity: moneyType.quantity - moneyAmount / value,
    //         };
    //         try {
    //             await axios.put(`http://localhost:8000/api/money/${moneyType._id}`, updatedMoneyType);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    //     if (remaining === 0) {
    //         newMessage = "Bye Bye";
    //     } else {
    //         newMessage = `Thank you for your purchase, here is your change value: ₪${remaining}.`;
    //     }
    
    //     setTotal(0);
    //     onCoinChanged(0, newMessage);
    // };
    
    // const onReturn = async () => {
    //     setChange(total);
    //     let newMessage;
    //     let remaining = total;
    //     const moneyValues = Object.values(allMoney)
    //         .map(moneyType => moneyType.value)
    //         .sort((a, b) => b - a);
    //     while (remaining > 0) {
    //         const maxValue = moneyValues.find(val => val <= remaining);
    //         if (!maxValue) {
    //             break;
    //         }
    //         const moneyType = allMoney.find(money => money.value === maxValue);
    //         const moneyAmount = Math.min(remaining, maxValue * moneyType.quantity);
    //         if (moneyAmount === 0) {
    //             continue;
    //         }
    //         remaining -= moneyAmount;
    //         const updatedMoneyType = {
    //             ...moneyType,
    //             amount: moneyType.amount - moneyAmount,
    //             quantity: moneyType.quantity - moneyAmount / maxValue,
    //         };
    //         try {
    //             await axios.put(`http://localhost:8000/api/money/${moneyType._id}`, updatedMoneyType);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    //     if (remaining === 0) {
    //         newMessage = "Bye Bye";
    //     } else {
    //         newMessage = `Thank you for your purchase, here is your change value: ₪${remaining}.`;
    //     }
    
    //     setTotal(0);
    //     onCoinChanged(0, newMessage);
    // };
    
    // const onReturn = async () => {
    //     setChange(total);
    //     let newMessage;
    //     let remaining = total;
    //     const moneyValues = Object.values(allMoney)
    //         .map(moneyType => moneyType.value)
    //         .sort((a, b) => b - a);
    //     while (remaining > 0) {
    //         const maxValue = moneyValues.find(value => value.value <= remaining);
    //         // if (typeof maxValue === 'undefined') {
    //         //     break;
    //         // }
    //         const moneyType = allMoney.find(money => money.value === maxValue);
    //         const moneyAmount = Math.min(remaining, maxValue * moneyType.quantity);
    //         if (moneyAmount === 0) {
    //             continue;
    //         }
    //         remaining -= moneyAmount;
    //         const updatedMoneyType = {
    //             ...moneyType,
    //             amount: moneyType.amount - moneyAmount,
    //             quantity: moneyType.quantity - moneyAmount / maxValue,
    //         };
    //         try {
    //             await axios.put(`http://localhost:8000/api/money/${moneyType._id}`, updatedMoneyType);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    //     if (remaining === 0) {
    //         newMessage = "Bye Bye";
    //     } else {
    //         newMessage = `Thank you for your purchase, here is your change value: ₪${remaining}.`;
    //     }
    
    //     setTotal(0);
    //     onCoinChanged(0, newMessage);
    // };