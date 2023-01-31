import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MoneyHandler from "./MoneyHandler";
import axios from 'axios';
// import './css/main.css'


const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 200px;
    height: 120px;
`;
const Item = styled.div`
    font-size: 1.7em;
    margin: 5px 15px 0 15px;
    padding: 5px;
    background-color: grey;
    color: black;
    width: 60px;
    text-align: center;
    border-radius: 50px;
    &:hover {
        cursor: pointer;
    }
`;

const Total = styled.div`
    // font-size: 1.5em;
    margin: 250px 15px 0 15px;
    padding: 5px;
    text-align: center;
    background-color: Green;
    color: white;
    width: 200px;
    height: 20px;
    border-radius: 50px;
    &:hover {
        cursor: pointer;
    }
`;
const Return = styled.div`
    font-size: 1.5em;
    margin: 25px 15px 0 15px;
    padding: 5px;
    text-align: center;
    background-color: Grey;
    color: white;
    width: 200px;
    height: 10px;
    border-radius: 50px;
    &:hover {
        cursor: pointer;
    }
`;
const MoneyManager = ({ coin, onCoinChanged }) => {
    const [total, setTotal] = useState(0);
    const [allMoney, setAllMoney] = useState({});
    const [allMessages, setAllMessages] = useState([]);
    const [Change, setChange] = useState();
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
            <MoneyHandler onMoneyInserted={handleMoney}/>
            <Total>Inserted: ₪{total}</Total>
            <Return onClick={onReturn}>Change: ₪{Change}</Return>
        </>
    );
}

export default MoneyManager;
