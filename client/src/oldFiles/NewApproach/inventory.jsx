import React, { useState } from "react";

export default function Inventory() {
    const [items, setItems] = useState({});

    function addItem(itemName, quantity) {
        setItems(prevItems => {
            const newItems = { ...prevItems };
            if (itemName in newItems) {
                newItems[itemName] += quantity;
            } else {
                newItems[itemName] = quantity;
            }
            return newItems;
        });
    }

    function removeItem(itemName, quantity) {
        setItems(prevItems => {
            const newItems = { ...prevItems };
            if (itemName in newItems) {
                if (newItems[itemName] > quantity) {
                    newItems[itemName] -= quantity;
                } else {
                    delete newItems[itemName];
                }
            } else {
                console.log(`${itemName} is not in the inventory.`);
            }
            return newItems;
        });
    }

    function checkInventory() {
        if (!Object.keys(items).length) {
            console.log("The inventory is empty.");
        } else {
            for (const item in items) {
                console.log(`${item}: ${items[item]}`);
            }
        }
    }

    return (
        <>
            <button onClick={() => addItem("Chips", 10)}>Add Chips</button>
            <button onClick={() => addItem("Soda", 5)}>Add Soda</button>
            <button onClick={() => removeItem("Chips", 2)}>Remove 2 Chips</button>
            <button onClick={checkInventory}>Check Inventory</button>
        </>
    );
}
