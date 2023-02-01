import React, {useState, useEffect} from 'react'
import axios from 'axios';
import TabPanel from '../../../components/TabPanel';
import './css/main.css'
import {Tabs, Tab, Box } from '@mui/material';
import Inventory from '../components/InventoryForm';
import Button from '@mui/material/Button';
import ItemList from '../../PurchaseOperations/ItemList';
import styled from "styled-components";

function a11yProps(index) {
    return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Container1 = styled.div`
    width: 400px;
    height: 400px;
    border: 1px solid black;
    border-radius: 50px;
    text-align: center;
`;

const Purchase = styled.div`
    font-size: 1.2em;
    margin: 10px 10px;
    padding: 5px;
    text-align: center;
    background-color: Green;
    color: white;
    width: 200px;
    border-radius: 50px;
    &:hover {
        cursor: pointer;
    }
`;

const Take = styled.div`
    font-size: 1.3em;
    margin: 25px 15px 0 15px;
    padding: 5px;
    text-align: center;
    background-color: TOMATO;
    color: white;
    width: 200px;
    border-radius: 50px;
    &:hover {
        cursor: pointer;
    }
`;

const Main = (props) => {
    const {coin, onPurchase, message } = props;
    const [items, setItems] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [value, setValue] = useState(0);
    const [buttonType, setButtonType] = useState();
    const [selectedCode, setSelectedCode] = useState('');
    const [dispensedItem, setDispensedItem] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    const handleItem = item => {
        if (buttonType === "add"){
            if (Object.keys(items).length >= 25) {
                console.log("The number of items has reached the limit of 25");
                return;
            }
            const newItems = { ...items };
            const existingItem = Object.values(newItems).find(i => i.itemName === item.itemName);
            if (existingItem) {
                const updatedItem = {
                    ...existingItem,
                    quantity: parseInt(existingItem.quantity) + parseInt(item.quantity)
                };
                axios.put('http://localhost:8000/api/items/' + existingItem._id, updatedItem)
                .then(res => {
                    setValue(0);
                    console.log(`Item ${item.itemName} updated successfully.`);
                })
                .catch(err => console.error(err));
            } else {
                axios.post('http://localhost:8000/api/items', item)
                .then(res => {
                    setValue(0);
                    console.log(`Item ${item.itemName} added successfully.`);
                })
                .catch(err => console.error(err));
            }
        } else if (buttonType === "remove") {
            const newItems = { ...items };
            const existingItem = Object.values(newItems).find(i => i.itemName === item.itemName);
            if (existingItem) {
                if ( parseInt(existingItem.quantity) > parseInt(item.quantity) ) {
                    const updatedItem = {
                        ...existingItem,
                        quantity: parseInt(existingItem.quantity) - parseInt(item.quantity)
                    };
                    axios.put('http://localhost:8000/api/items/' + existingItem._id, updatedItem)
                    .then(res => {
                        setValue(0);
                        console.log(`Item ${item.itemName} updated successfully.`);
                    })
                    .catch(err => console.error(err));
                } else if ( parseInt(existingItem.quantity) <= parseInt(item.quantity) ) {
                    axios.delete('http://localhost:8000/api/items/' + existingItem._id)
                    .then(res => {
                        setValue(0);
                        console.log(`Item ${item.itemName} removed successfully.`);
                    })
                    .catch(err => console.error(err));
                } 
            } else {
                console.log(`${item.itemName} is not in the inventory.`);
            }
        }
    }

    useEffect (() =>{
        axios.get('http://localhost:8000/api/items')
            .then(res => {
                setItems(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    }, [items]);

    const handlePurchase = () => {
        const item = items.find(item => item.code === selectedCode);
        if (item && coin >= item.price) {
        onPurchase(item.price);
        setDispensedItem([...dispensedItem, item]);
        setErrorMessage('');
        } else {
        setErrorMessage('Invalid selection or insufficient balance');
        }
    }
    
    const onTake = () => {
        setDispensedItem([]);
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Customers" {...a11yProps(0)} />
                        <Tab label="Owner" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    {/* <Container1>
                        <h1>Welcome Stanger...</h1>
                        <h3>Please Insert your coins first then select the required items based on the green color</h3>
                        <div style={{height: '100px',   scrollBehavior: 'auto'}}>
                        {message.map(message => (
                            <p key={message}>{message}</p>
                            ))}
                        </div>
                        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                    </Container1> */}
                    <div className="items">
                        <div>Enter item code:</div>
                        <input type="text" value={selectedCode} onChange={e => setSelectedCode(e.target.value)} />
                        <Purchase onClick={handlePurchase}>Purchase</Purchase>
                    </div>
                    {loaded && <ItemList items={items} coin={coin} onPurchase={onPurchase}/>}
                    <Take onClick={onTake}>
                        <p>Your Items: </p>
                        {dispensedItem && (
                            <div className="dispensed-item">
                            {dispensedItem.map(item => (
                            <p key={item.code}>{item.name}</p>
                            ))}
                            </div>
                        )}
                    </Take>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <h1>Add Items</h1>
                    <Inventory onSubmitProp={handleItem} items={items}>
                        <Button type='submit' variant="contained" color="success" onClick={(e) => setButtonType('add')}>Add</Button>
                        <Button type='submit' variant="contained" color="success" onClick={(e) => setButtonType('remove')}>Remove</Button>
                    </Inventory>
                </TabPanel>
            </Box>
        </>
    )
};

export default Main;



