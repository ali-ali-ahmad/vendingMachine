    // function addItem(itemName, quantity) {
    //     setItems(prevItems => {
    //         const newItems = { ...prevItems };
    //         if (itemName in newItems) {
    //             newItems[itemName] += quantity;
    //         } else {
    //             newItems[itemName] = quantity;
    //         }
    //         return newItems;
    //     });
    // }

        // const handleItem = item => {
    //     if (buttonType === "add"){
    //         setItems(items => {
    //             const newItems = { ...items };
    //             if (item.itemName in newItems) {
    //             //   newItems[item.itemName] += item.quantity;
    //               axios.put(`http://localhost:8000/api/items/${item.itemName}`, item)
    //                 .then(res => {
    //                   console.log(`Item ${item.itemName} updated successfully.`);
    //                 })
    //                 .catch(err => console.error(err));
    //             } else {
    //             //   newItems[item.itemName] = item.quantity;
    //               axios.post('http://localhost:8000/api/items', item)
    //                 .then(res => {
    //                   console.log(`Item ${item.itemName} added successfully.`);
    //                 })
    //                 .catch(err => console.error(err));
    //             }

    //             // return newItems;
    //           });

    //         } else if (buttonType === "remove") {
    //           setItems(prevItems => {
    //             const newItems = { ...prevItems };
    //             if (item.itemName in newItems) {
    //               if (newItems[item.itemName] > item.quantity) {
    //                 newItems[item.itemName] -= item.quantity;
    //               } else {
    //                 delete newItems[item.itemName];
    //               }
    //             } else {
    //               console.log(`${item.itemName} is not in the inventory.`);
    //             }
            
    //             axios.put('http://localhost:8000/api/items', item);
            
    //             return newItems;
    //           });
    //         }
            
    // }
    // const handleItem = item => {
    //     if (buttonType === "add"){
    //         setItems(prevItems => {
    //             const newItems = { ...prevItems };
    //             if (item.itemName in newItems) {
    //                 newItems[item.itemName] += item.quantity;
    //             } else {
    //                 newItems[item.itemName] = item.quantity;
    //             }
    //             return newItems;
    //         });
    //     }
    //     else if (buttonType === "remove"){
    //         setItems(prevItems => {
    //             const newItems = { ...prevItems };
    //             if (item.itemName in newItems) {
    //                 if (newItems[item.itemName] > item.quantity) {
    //                     newItems[item.itemName] -= item.quantity;
    //                 } else {
    //                     delete newItems[item.itemName];
    //                 }
    //             } else {
    //                 console.log(`${item.itemName} is not in the inventory.`);
    //             }
    //             return newItems;
    //         });
    //     }
    // }


    // const handleItem = item => {
    //     axios.post('http://localhost:8000/api/items', item)
    //     .then(res => {
    //         setItems([...items, res.data]);
    //         setValue(0);
    //         })
    //         .catch(err => console.error(err)) 
    // }

        // const [items, setItems] = useState({});
    // const [buttonType, setButtonType] = useState();

    // function addItem(itemName, quantity) {
    //     setItems(prevItems => {
    //         const newItems = { ...prevItems };
    //         if (itemName in newItems) {
    //             newItems[itemName] += quantity;
    //         } else {
    //             newItems[itemName] = quantity;
    //         }
    //         return newItems;
    //     });
    // }

    // function removeItem(itemName, quantity) {
    //     setItems(prevItems => {
    //         const newItems = { ...prevItems };
    //         if (itemName in newItems) {
    //             if (newItems[itemName] > quantity) {
    //                 newItems[itemName] -= quantity;
    //             } else {
    //                 delete newItems[itemName];
    //             }
    //         } else {
    //             console.log(`${itemName} is not in the inventory.`);
    //         }
    //         return newItems;
    //     });
    // }

    // function checkInventory() {
    //     if (!Object.keys(items).length) {
    //         console.log("The inventory is empty.");
    //     } else {
    //         for (const item in items) {
    //             console.log(`${item}: ${items[item]}`);
    //         }
    //     }
    // }


        // const handleSubmit = (event, buttonType) => {
    //     event.preventDefault();
    //     console.log('Form submitted with button type:', buttonType);
    //     console.log(formData);
    //     setStatus(0);
    //   };