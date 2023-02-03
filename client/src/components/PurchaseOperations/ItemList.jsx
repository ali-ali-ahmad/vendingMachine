import React, {useState} from 'react';
import styled from "styled-components";
import styles from './ItemList.module.css';
import { slotCodes } from '../SlotCodes';


const DivStatus = styled.div`
    background-color: ${props =>
        props.available ? "limegreen" : "red"};
    &:hover {
        cursor: ${props => (props.available ? "pointer" : "arrow")};
    }
`;

const ItemList = (props) => {
    const { items, coin } = props;
    // state that holds the ready codes which they are used to be displayed in the items slots
    const [machineCodes] = useState(slotCodes);

    // in the return, the codes are being displayed through mapping, and if the existing items match the code then they take place in the empty slot
    // there is also a functionality to check if the inserted money is greater that the item price, if so it change the color from red to green to notify the customer that they can buy that partiular item
    return (
        <>
        
            <div className={styles.container}>
                {machineCodes.map(code => {
                    const item = items.find(p => p.code === code.code);
                    return (
                    <div className={styles.divBox}>
                        <div className={styles.divName}>{item ? item.itemName : 'Empty'}</div>
                        <div className={styles.divPrice}>₪{item ? item.price : '0'}</div>
                        <div className={styles.divQuantity}>Left: {item ? item.quantity : '0'}</div>
                        <DivStatus className={styles.divStatus} available={item && coin >= item.price}>Code: {code.code}</DivStatus>
                    </div>
                    );
                })}
            </div>
        </>
    )
}

export default ItemList;