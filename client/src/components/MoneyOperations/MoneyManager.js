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

    //Handle the money when inserted by the customers
    const handleMoney = insertedMoney => {
        //Check if the money type is credit card and setCreditCardStatus to true, this will be used when the cutomers asked for their change back to it take the money from the credit card type when updating the database
        if (insertedMoney.moneyType === "credit card"){
            setCreditCardStatus(true);
        }
        //calculate the new total by adding the inserted money if the customer wants to add more coins or cash
        const newTotal = total + parseInt(insertedMoney.amount);
        const newMessage = `you have entered ₪${insertedMoney.amount} of ${insertedMoney.moneyType} type`
        setAllMessages([...allMessages, newMessage])
        setTotal(newTotal);
        onCoinChanged(newTotal, newMessage);
        const newMoney = { ...allMoney };
        const existingMoney = Object.values(newMoney).find(i => i.value === insertedMoney.value);
         //find the current money object  exists in the database with the same value as the inserted money
        if (existingMoney) {
        //create a updatedMoney object by adding the inserted amount to the existing amount and incrementing the quantity by 1
            const updatedMoney = {
                ...existingMoney,
                amount: parseInt(existingMoney.amount) + parseInt(insertedMoney.amount),
                quantity: parseInt(existingMoney.quantity) +1
            };
            //update the money in the database
            axios.put('http://localhost:8000/api/money/' + existingMoney._id, updatedMoney)
            .then(res => {
            })
            .catch(err => console.error(err));
        } else {
            //create a new money object if the type or the value doesnt exists in the database
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
        // if credit card was used, update the credit card in the database
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
        // sort the values of all money types in descending order so it give back the customers thier change based on the remaining total and the values of the money in the database, and update each value based on the quanity that has been taken from
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
        // reset the total to 0 and call the onCoinChanged function with 0 value and newMessage, which is being lefted in the PurchaseHandler component
        setTotal(0);
        onCoinChanged(0, newMessage);
    };

    // get all the money from the database
    useEffect (() =>{
        axios.get('http://localhost:8000/api/money')
            .then(res => {
                setAllMoney(res.data);
            })
            .catch(err => console.error(err));
    }, [allMoney]);

    return (
            <div className={styles.container}>
                <MoneyHandler onMoneyInserted={handleMoney} change={change} onReturn={onReturn}/>
                <div className={styles.moneyDisplay}>
                    <Button className={styles.total} variant="contained" color="primary">Inserted: ₪{total}</Button>
                    <Button className={styles.return} variant="contained" color="warning" onClick={onReturn}>Change: ₪{change}</Button>
                </div>
            </div>
    );
}

export default MoneyManager;
