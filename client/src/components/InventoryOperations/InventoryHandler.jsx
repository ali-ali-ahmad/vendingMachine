import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import InventoryForm from './InventoryForm';


const InventoryHandler = (props) => {
    const [items, setItems] = useState({});
    const [message, setMessage] = useState();
    const [buttonType, setButtonType] = useState();


    const handleItem = item => {
        if (buttonType === "add"){
            if (Object.keys(items).length >= 25) {
                setMessage("The number of items has reached the limit of 25");
                // console.log("The number of items has reached the limit of 25");
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
                    setMessage(`Item ${item.itemName} updated successfully.`);
                    // console.log(`Item ${item.itemName} updated successfully.`);
                })
                .catch(err => console.error(err));
            } else {
                axios.post('http://localhost:8000/api/items', item)
                .then(res => {
                    setMessage(`Item ${item.itemName} added successfully.`);
                    // console.log(`Item ${item.itemName} added successfully.`);
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
                        setMessage(`Item ${item.itemName} updated successfully.`);
                        // console.log(`Item ${item.itemName} updated successfully.`);
                    })
                    .catch(err => console.error(err));
                } else if ( parseInt(existingItem.quantity) <= parseInt(item.quantity) ) {
                    axios.delete('http://localhost:8000/api/items/' + existingItem._id)
                    .then(res => {
                        setMessage(`Item ${item.itemName} removed successfully.`);
                        // console.log(`Item ${item.itemName} removed successfully.`);
                    })
                    .catch(err => console.error(err));
                } 
            } else {
                setMessage(`${item.itemName} is not in the inventory.`);
                // console.log(`${item.itemName} is not in the inventory.`);
            }
        }
    }

    useEffect (() =>{
        axios.get('http://localhost:8000/api/items')
            .then(res => {
                setItems(res.data);
                // setLoaded(true);
            })
            .catch(err => console.error(err));
    }, [items]);


    return (
        <>
            <h1>Add Items</h1>
            <InventoryForm onSubmitProp={handleItem} items={items}>
                <Button type='submit' variant="contained" color="success" onClick={() => setButtonType('add')}>Add</Button>
                <Button type='submit' variant="contained" color="success" onClick={() => setButtonType('remove')}>Remove</Button>
            </InventoryForm>
            <p>{message}</p>
        </>
    )
};

export default InventoryHandler;



