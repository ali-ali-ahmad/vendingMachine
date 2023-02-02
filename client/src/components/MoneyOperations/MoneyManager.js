import React, { useState, useEffect } from "react";
import MoneyHandler from "./MoneyHandler";
import axios from 'axios';
import styles from './MoneyManager.module.css'
import Button from '@mui/material/Button';

const MoneyManager = (props) => {
    const {coin, onCoinChanged } = props;
    const [total, setTotal] = useState(0);
    const [allMoney, setAllMoney] = useState({});
    const [allMessages, setAllMessages] = useState([]);
    const [change, setChange] = useState();
    const [creditCardStatus, setCreditCardStatus] = useState(false);

    useEffect(() => {
        setTotal(coin);
    }, [coin]);

    const handleMoney = insertedMoney => {
        if (insertedMoney.moneyType === "credit card"){
            setCreditCardStatus(true);
        }
        const newTotal = total + parseInt(insertedMoney.amount);
        const newMessage = `you have entered ₪${insertedMoney.amount} of ${insertedMoney.moneyType} type`
        setAllMessages([...allMessages, newMessage])
        setTotal(newTotal);
        onCoinChanged(newTotal, newMessage);
        const newMoney = { ...allMoney };
        const existingMoney = Object.values(newMoney).find(i => i.value === insertedMoney.value);
        if (existingMoney) {
            const updatedMoney = {
                ...existingMoney,
                amount: parseInt(existingMoney.amount) + parseInt(insertedMoney.amount),
                quantity: parseInt(existingMoney.quantity) +1
            };
            axios.put('http://localhost:8000/api/money/' + existingMoney._id, updatedMoney)
            .then(res => {
            })
            .catch(err => console.error(err));
        } else {
            axios.post('http://localhost:8000/api/money', insertedMoney)
            .then(res => {
            })
            .catch(err => console.error(err));
        }
    }
    
    const onReturn = async () => {
        setChange(total);
        let newMessage;
        let remaining = total;
        if (creditCardStatus) {
            const currentMoney = allMoney.find(money => money.moneyType === "credit card");
            const updatedCurrentMoney = {
                ...currentMoney,
                amount: currentMoney.amount - remaining,
            };
            remaining = 0;
            setCreditCardStatus(false);
            try {
                await axios.put(`http://localhost:8000/api/money/${currentMoney._id}`, updatedCurrentMoney);
            } catch (err) {
                console.error(err);
            }
        } else {
            const moneyValues = Object.values(allMoney).map(money => money.value).sort((a, b) => b - a);
            for (let i = 0; i < moneyValues.length; i++) {
                if (remaining >= moneyValues[i]){
                    const currentMoney = allMoney.find(money => money.value === moneyValues[i]);
                    let numOfValue = Math.floor(remaining / moneyValues[i]);
                    const updatedCurrentMoney = {
                        ...currentMoney,
                        amount: currentMoney.amount - numOfValue * currentMoney.value,
                        quantity: currentMoney.quantity - numOfValue,
                    };
                    remaining -= numOfValue * currentMoney.value;
                    try {
                        await axios.put(`http://localhost:8000/api/money/${currentMoney._id}`, updatedCurrentMoney);
                    } catch (err) {
                        console.error(err);
                    }
                }
            }
        }
        if (total === 0) {
            newMessage = "Bye Bye";
        } else {
            newMessage = `Thank you for your purchase, here is your change value: ₪${total}.`;
        }
        setTotal(0);
        onCoinChanged(0, newMessage);
    };

    useEffect (() =>{
        axios.get('http://localhost:8000/api/money')
            .then(res => {
                setAllMoney(res.data);
            })
            .catch(err => console.error(err));
    }, [allMoney]);

    return (
        <>
            <div className={styles.container}>
                <MoneyHandler onMoneyInserted={handleMoney} total={total} change={change} onReturn={onReturn}/>
                <div className={styles.moneyDisplay}>
                    <Button className={styles.total} variant="contained" color="primary">Inserted: ₪{total}</Button>
                    <Button className={styles.return} variant="contained" color="warning" onClick={onReturn}>Change: ₪{change}</Button>
                </div>
            </div>
        </>
    );
}

export default MoneyManager;
