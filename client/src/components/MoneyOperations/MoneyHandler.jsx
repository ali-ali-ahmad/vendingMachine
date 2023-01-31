import React, { useState } from "react";
// import styled from "styled-components";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './MoneyHandler.module.css'


const MoneyHandler = (props) => {
    const {onMoneyInserted} = props;
    const [amount, setAmount] = useState(0);

    const handleInsert = (moneyType, amount) => {
        onMoneyInserted({moneyType, amount});
    };

    return (
        <div className={styles.container}>
            <div>
                <h3>Insert Coin:</h3>
                <button className={styles.item} onClick={() => handleInsert("coin", 1)}>1 ₪</button>
                <button className={styles.item} onClick={() => handleInsert("coin", 2)}>2 ₪</button>
                <button className={styles.item} onClick={() => handleInsert("coin", 5)}>5 ₪</button>
                <button className={styles.item} onClick={() => handleInsert("coin", 10)}>10 ₪</button>
            </div>
            <div>
                <h3>Insert Cash:</h3>
                <button className={styles.item} onClick={() => handleInsert("cash", 20)}>20 ₪</button>
                <button className={styles.item} onClick={() => handleInsert("cash", 50)}>50 ₪</button>
            </div>
            <form onSubmit={(e) => {e.preventDefault(); handleInsert("credit card", amount)}}>
                <h3>Use Credit Card:</h3>
                <div>
                    <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    ></Box>
                    <p>
                        <TextField
                            id="outlined-error-helper-text"
                            label="XXXX-XXXX-XXXX-XXXX"
                            type='text'
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </p>
                    <h3>Card Amount: ₪{amount}</h3>
                    <Button type='submit' variant="contained" color="success">Use Card</Button>
                </div>
            </form>
        </div>
    );
}
export default MoneyHandler;

