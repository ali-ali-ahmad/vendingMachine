// import { Link } from 'react-router-dom';
// import DeleteButton from './DeleteButton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import EditIcon from '@mui/icons-material/Edit';
// import Fab from '@mui/material/Fab';
// import Box from '@mui/material/Box';
import React from "react";
import styled from "styled-components";
// import ItemHolder from "../NewApproach/components/ItemHolder";

const Container = styled.div`
    width: 500px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

// const Purchase = styled.div`
//     font-size: 1.2em;
//     margin: 10px 10px;
//     padding: 5px;
//     text-align: center;
//     background-color: Green;
//     color: white;
//     width: 200px;
//     border-radius: 50px;
//     &:hover {
//         cursor: pointer;
//     }
// `;

const DivBox = styled.div`
    border: 1px solid LIGHTSEAGREEN;
    height: 100px;
    width: 80px;
    display: flex;
    flex-direction: column;
    margin-left: 2px;
    margin-top: 2px;
    border-radius: 5px;
    box-shadow: 2px 2px 2px 2px;
`;

const DivName = styled.div`
    font-size: 0.9em;
    text-align: center;
    font-weight: bold;
`;
const DivPrice = styled.div`
    text-align: center;
`;
const DivQuantity = styled.div`
    text-align: center;
`;

const DivStatus = styled.div`
    background-color: ${props =>
        props.available ? "limegreen" : "red"};
    height: 25px;
    width: 90%;
    margin: auto;
    border-radius: 5px;
    text-align: center;
    &:hover {
        cursor: ${props => (props.available ? "pointer" : "arrow")};
    }
`;

const ItemList = (props) => {
    const { items, coin } = props;

    const machineCodes = [
        { code: 'A1' },{ code: 'A2' },{ code: 'A3' },{ code: 'A4' },{ code: 'A5' },
        { code: 'B1' },{ code: 'B2' },{ code: 'B3' },{ code: 'B4' },{ code: 'B5' },
        { code: 'C1' },{ code: 'C2' },{ code: 'C3' },{ code: 'C4' },{ code: 'C5' },
        { code: 'D1' },{ code: 'D2' },{ code: 'D3' },{ code: 'D4' },{ code: 'D5' },
        { code: 'E1' },{ code: 'E2' },{ code: 'E3' },{ code: 'E4' },{ code: 'E5' },
    ];


    return (
        <>
            <Container>
                {machineCodes.map(code => {
                    const item = items.find(p => p.code === code.code);
                    return (
                    <DivBox>
                        <DivName>{item ? item.itemName : 'Empty'}</DivName>
                        <DivPrice>₪{item ? item.price : '0'}</DivPrice>
                        <DivQuantity>Left: {item ? item.quantity : '0'}</DivQuantity>
                        <DivStatus available={item && coin >= item.price}>Code: {code.code}</DivStatus>
                    </DivBox>
                    );
                })}
            </Container>
        </>
    )
}

export default ItemList;