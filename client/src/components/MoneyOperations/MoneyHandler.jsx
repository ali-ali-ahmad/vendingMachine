import React, { useState } from "react";
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
            <div className={styles.coinContainer}>
                <h3>Insert Coin:</h3>
                <div className={styles.allCoins}>
                    <Button id={styles.coin} onClick={() => handleInsert("coin", 1)}>1 ₪</Button>
                    <Button id={styles.coin} onClick={() => handleInsert("coin", 2)}>2 ₪</Button>
                    <Button id={styles.coin} onClick={() => handleInsert("coin", 5)}>5 ₪</Button>
                    <Button id={styles.coin} onClick={() => handleInsert("coin", 10)}>10 ₪</Button>
                </div>
            </div>
            <div className={styles.cashContainer}>
                <h3>Insert Cash:</h3>
                <div>
                    <Button id={styles.cash} onClick={() => handleInsert("cash", 20)}>20 ₪</Button>
                    <Button id={styles.cash} onClick={() => handleInsert("cash", 50)}>50 ₪</Button>
                </div>
            </div>
            <div className={styles.creditCard}>
                <form onSubmit={(e) => {e.preventDefault(); handleInsert("credit card", amount)}}>
                    <div className={styles.creditCardText}>
                        <h4>Credit Card:</h4>
                        <h4>Card Balance: ₪{amount}</h4>
                    </div>
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
                        <Button type='submit' variant="contained" color="success">Insert</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default MoneyHandler;

