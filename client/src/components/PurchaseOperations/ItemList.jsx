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
    const [machineCodes] = useState(slotCodes);

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