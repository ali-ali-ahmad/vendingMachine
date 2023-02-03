import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { slotCodes } from '../SlotCodes';


const InventoryForm = (props) => {
    const {onSubmitProp, children, items} = props;
    const [machineCodes] = useState(slotCodes);
    const [itemName, setItemName] = useState();
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // find an unused code from the machineCodes array
        const unusedCode = machineCodes.find(code => !items.find(p => p.code === code.code));
        // call the onSubmitProp function and pass the form data as an object to the InvetoryHandler component
        onSubmitProp({itemName, quantity, price, code:unusedCode.code});
    }

    return  (
        <>
        <div style={{width: "250px", textAlign: "center"}}>
            <form onSubmit={handleSubmit}>
                <h1>Add Items</h1>
                <div>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                    </Box>
                    <p>
                        <TextField
                            id="outlined-error-helper-text"
                            label="Item Name"
                            value={itemName}
                            type='text'
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    </p>
                    <p>
                        <TextField
                            id="outlined-error-helper-text"
                            label="Quantity"
                            value={quantity}
                            type='number'
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </p>
                    <p>
                        <TextField
                            id="outlined-error-helper-text"
                            label="Price"
                            value={price}
                            type='number'
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </p>
                </div>
                <div>
                    {children}
                </div>
            </form>
        </div>
        </>
    )
}

export default InventoryForm;