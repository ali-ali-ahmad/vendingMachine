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
        const unusedCode = machineCodes.find(code => !items.find(p => p.code === code.code));
        onSubmitProp({itemName, quantity, price, code:unusedCode.code});
    }

    return  (
        <>
            <form onSubmit={handleSubmit}>
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
        </>
    )
}

export default InventoryForm;