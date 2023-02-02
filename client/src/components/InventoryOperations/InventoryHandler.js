import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import InventoryForm from './InventoryForm';
import MoneyDisplay from './MoneyDisplay';
import OperationScreen from './OperationScreen';



const InventoryHandler = () => {
    const [items, setItems] = useState({});
    const [allMessages, setAllMessages] = useState([]);
    const [buttonType, setButtonType] = useState();
    const [allMoney, setAllMoney] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect (() =>{
        axios.get('http://localhost:8000/api/money')
            .then(res => {
                setAllMoney(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    }, [allMoney]);


    const handleItem = item => {
        let newMessage;
        if (buttonType === "add"){
            if (Object.keys(items).length >= 25) {
                newMessage = ("The number of items has reached the limit of 25");
                setAllMessages([...allMessages, newMessage])
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
                    newMessage = (`Item ${item.itemName} updated successfully.`);
                    setAllMessages([...allMessages, newMessage])
                })
                .catch(err => console.error(err));
            } else {
                axios.post('http://localhost:8000/api/items', item)
                .then(res => {
                    newMessage = (`Item ${item.itemName} added successfully.`);
                    setAllMessages([...allMessages, newMessage])
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
                        newMessage = (`Item ${item.itemName} updated successfully.`);
                        setAllMessages([...allMessages, newMessage])
                    })
                    .catch(err => console.error(err));
                } else if ( parseInt(existingItem.quantity) <= parseInt(item.quantity) ) {
                    axios.delete('http://localhost:8000/api/items/' + existingItem._id)
                    .then(res => {
                        newMessage = (`Item ${item.itemName} removed successfully.`);
                        setAllMessages([...allMessages, newMessage])
                    })
                    .catch(err => console.error(err));
                } 
            } else {
                newMessage = (`${item.itemName} is not in the inventory.`);
                setAllMessages([...allMessages, newMessage])
            }
        }
    }

    useEffect (() =>{
        axios.get('http://localhost:8000/api/items')
            .then(res => {
                setItems(res.data);
            })
            .catch(err => console.error(err));
    }, [items]);


    return (
        <>
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>

            <InventoryForm onSubmitProp={handleItem} items={items}>
                <Button type='submit' variant="contained" color="success" onClick={() => setButtonType('add')}>Add</Button>
                <Button type='submit' variant="contained" color="success" onClick={() => setButtonType('remove')}>Remove</Button>
            </InventoryForm>
            <OperationScreen allMessages={allMessages}/>
            {loaded && <MoneyDisplay allMoney={allMoney}/>}
        </div>
        </>
    )
};

export default InventoryHandler;



