import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { Link } from 'react-router-dom';


const Inventory = (props) => {
    const {onSubmitProp, children, items} = props;
    const [itemName, setItemName] = useState();
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    // const [code, setCode] = useState(unusedCode);

    const machineCodes = [
        // ToDo: add product quantity
        { code: 'A1' },{ code: 'A2' },{ code: 'A3' },{ code: 'A4' },{ code: 'A5' },
        { code: 'B1' },{ code: 'B2' },{ code: 'B3' },{ code: 'B4' },{ code: 'B5' },
        { code: 'C1' },{ code: 'C2' },{ code: 'C3' },{ code: 'C4' },{ code: 'C5' },
        { code: 'D1' },{ code: 'D2' },{ code: 'D3' },{ code: 'D4' },{ code: 'D5' },
        { code: 'E1' },{ code: 'E2' },{ code: 'E3' },{ code: 'E4' },{ code: 'E5' },
    ];
    
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
                    ></Box>
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

export default Inventory;