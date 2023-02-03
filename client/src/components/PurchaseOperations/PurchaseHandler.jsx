import React, {useState, useEffect} from 'react'
import axios from 'axios';
import ItemList from './ItemList';
import styles from './PurchaseHandler.module.css'
import MoneyManager from '../MoneyOperations/MoneyManager';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const PurchaseHandler = () => {
    const [items, setItems] = useState({});
    const [selectedCode, setSelectedCode] = useState('');
    const [dispensedItem, setDispensedItem] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [coin, setCoin] = useState(0);
    const [message, setMessage] = useState([]);

    useEffect (() =>{
        axios.get('http://localhost:8000/api/items')
            .then(res => {
                setItems(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    }, [items]);



    const onCoinChanged = (total, newMessage) => {
        // update the total value of the coin inserted, the total and the messages had been lefted from the MoneyManager component
        setCoin(total);
        setMessage([...message, newMessage]);
    };

    const handlePurchase = () => {
        // find the selected item by its code
        const item = items.find(item => item.code === selectedCode);
        // check if the item is found and if the inserted coin is sufficient to purchase it
        if (item && coin >= item.price) {
            // check if the quantity of the item is greater than 0
            // decrement the quantity of the item by 1 and update it in the database
            if ( parseInt(item.quantity) > 0 ) {
                const updatedItem = {
                    ...item,
                    quantity: parseInt(item.quantity) - 1
                };
                axios.put('http://localhost:8000/api/items/' + item._id, updatedItem)
                .then(res => {
                    const newMessage = (`You have bought ${item.itemName}.`);
                    setMessage([...message, newMessage]);
                })
                .catch(err => console.error(err));
            }
        // subtract the price of the item from the inserted coin
        setCoin(coin - item.price);
        // add the item to the list of dispensed items
        setDispensedItem([...dispensedItem, item]);
        // reset the error message, if there is any
        setErrorMessage('');
        } else {
        // set an error message if the item is not found or the inserted coin is not sufficient
        setErrorMessage('Invalid selection or insufficient balance');
        }
    }

    // clear the list of dispensed items when the cutomer take their purchased items
    const onTake = () => {
    setDispensedItem([]);
    };

    return (
        <>
        <div className={styles.container}>
            <div className={styles.machineItems}>
                {loaded && <ItemList items={items} coin={coin}/>}
            </div>
            <div>
                <div className={styles.codeBox}>
                    <TextField
                            id="outlined-error-helper-text"
                            label="item code"
                            value={selectedCode}
                            type='text'
                            onChange={e => setSelectedCode(e.target.value)}
                        />
                    <Button type='submit' variant="contained" color="success" onClick={handlePurchase}>Purchase</Button>
                </div>
                <MoneyManager coin={coin} onCoinChanged={onCoinChanged} />
            </div>
            <div>
                <div className={styles.displayScreen}>
                    <div>
                        <h1>Welcome Stranger...</h1>
                        <h4>Please Insert your coins first then select the required items based on the green color</h4>
                    </div>
                    <ul className={styles.msgDisplay}>
                        {errorMessage && <li style={{color: 'red'}}>{errorMessage}</li>}
                        {message.map(message => (
                            <li key={message}>{message}</li>
                        ))}
                    </ul>
                    <div>
                        <h4>Dont forget to collect your items and take your change</h4>
                    </div>
                </div>
                <div className={styles.itemsBox}>
                        <p>Your Items</p>
                    <div className={styles.takeItems} >
                        {dispensedItem && (
                            <div className="dispensed-item">
                                {dispensedItem.map(item => (
                                <Button variant="contained" color="warning" onClick={onTake} key={item.code}>{item.itemName}</Button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
export default PurchaseHandler;
