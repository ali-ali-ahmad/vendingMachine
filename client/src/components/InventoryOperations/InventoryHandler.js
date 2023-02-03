import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import InventoryForm from './InventoryForm';
import MoneyDisplay from './MoneyDisplay';
import OperationScreen from './OperationScreen';


// InventoryHandler is a functional component that manages the inventory operations
const InventoryHandler = () => {
    const [items, setItems] = useState({});
      // State to store all messages for customer process
    const [allMessages, setAllMessages] = useState([]);
    const [buttonType, setButtonType] = useState();
      // State to store all money thta been handleing the Money operations and will be used in the Money dipslay component
    const [allMoney, setAllMoney] = useState({});
    const [loaded, setLoaded] = useState(false);

      // fetch all money information from the database
    useEffect (() =>{
        axios.get('http://localhost:8000/api/money')
            .then(res => {
                setAllMoney(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    }, [allMoney]);

  // Function to handle adding or removing items from the database using the inventoryFrom component
    const handleItem = item => {
        let newMessage;
        // Check if the button clicked was "add" as being considered as an abstraction method
        if (buttonType === "add"){
            // Check if the number of items in the inventory is at the limit of 25 (5*5)
            if (Object.keys(items).length >= 25) {
                newMessage = ("The number of items has reached the limit of 25");
                setAllMessages([...allMessages, newMessage])
                return;
            }
            const newItems = { ...items };
            // Check if the item being added already exists in the database and update it if it exists
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
                // If it does not exist, add it as a new item in the database
                axios.post('http://localhost:8000/api/items', item)
                .then(res => {
                    newMessage = (`Item ${item.itemName} added successfully.`);
                    setAllMessages([...allMessages, newMessage])
                })
                .catch(err => console.error(err));
            }
            // Check if the button clicked was "remove" as being considered as an abstraction method
        } else if (buttonType === "remove") {
            const newItems = { ...items };
                // Find the item with the same item name in the database
            const existingItem = Object.values(newItems).find(i => i.itemName === item.itemName);
                // If the item exists in the database, update it
            if (existingItem) {
                 // Check if the quantity of the existing item is greater than the item being removed
                if ( parseInt(existingItem.quantity) > parseInt(item.quantity) ) {
                    const updatedItem = {
                        ...existingItem,
                        quantity: parseInt(existingItem.quantity) - parseInt(item.quantity)
                    };
                    // update the item in the database based of it existance
                    axios.put('http://localhost:8000/api/items/' + existingItem._id, updatedItem)
                    .then(res => {
                        newMessage = (`Item ${item.itemName} updated successfully.`);
                        setAllMessages([...allMessages, newMessage])
                    })
                    .catch(err => console.error(err));
                     // If the quantity of the existing item is less than or equal to the item being removed from the database
                } else if ( parseInt(existingItem.quantity) <= parseInt(item.quantity) ) {
                    axios.delete('http://localhost:8000/api/items/' + existingItem._id)
                    .then(res => {
                        newMessage = (`Item ${item.itemName} removed successfully.`);
                        setAllMessages([...allMessages, newMessage])
                    })
                    .catch(err => console.error(err));
                } 
                    // If the item does not exist in the database, it will let the owner that its not
            } else {
                newMessage = (`${item.itemName} is not in the inventory.`);
                setAllMessages([...allMessages, newMessage])
            }
        }
    }

    // get all items from the datbase
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



