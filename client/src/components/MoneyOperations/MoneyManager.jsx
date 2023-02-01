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
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTotal(coin);
    }, [coin]);

    const handleMoney = insertedMoney => {
        const newTotal = total + insertedMoney.amount;
        const newMessage = `you have entered ₪${insertedMoney.amount}`
        setAllMessages([...allMessages, newMessage])
        setTotal(newTotal);
        onCoinChanged(newTotal, newMessage);
        const newMoney = { ...allMoney };
        const existingMoney = Object.values(newMoney).find(i => i.moneyType === insertedMoney.moneyType);
        if (existingMoney) {
            const updatedMoney = {
                ...existingMoney,
                amount: parseInt(existingMoney.amount) + parseInt(insertedMoney.amount)
            };
            axios.put('http://localhost:8000/api/money/' + existingMoney._id, updatedMoney)
            .then(res => {
                console.log(`Money ${insertedMoney.moneyType} updated successfully.`);
            })
            .catch(err => console.error(err));
        } else {
            axios.post('http://localhost:8000/api/money', insertedMoney)
            .then(res => {
                console.log(`Money ${insertedMoney.moneyType} added successfully.`);
            })
            .catch(err => console.error(err));
        }
    }

    const onReturn = () => {
        setChange(total);
        const newTotal = 0;
        setTotal(newTotal);
        onCoinChanged(newTotal);
    };

    // useEffect (() =>{
    //     axios.get('http://localhost:8000/api/money')
    //         .then(res => {
    //             setAllMoney(res.data);
    //             setLoaded(true);
    //         })
    //         .catch(err => console.error(err));
    // }, [allMoney]);

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
