import styled from "styled-components";
// import React, { useState } from "react";
import PurchaseHandler from "../components/PurchaseOperations/PurchaseHandler";
import MoneyManager from "../components/MoneyOperations/MoneyManager";
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import TabPanel from '../components/TabPanel';
import './css/main.css'
import {Tabs, Tab, Box } from '@mui/material';
import Inventory from '../components/InventoryForm';
import Button from '@mui/material/Button';
import ItemList from '../../PurchaseOperations/ItemList';
// import styled from "styled-components";

const Cabinet = styled.div`
  // display: flex;
  // flex-direction: row;
  // justify-content: center;
`;

const MachineManager = (props) => {
    // const [coin, setCoin] = useState(0);
    // const [message, setMessage] = useState([]);

    // const onCoinChanged = (total, newMessage) => {
    //   setCoin(total);
    //   setMessage([...message, newMessage]);
    // };

    // const onPurchase = price => {
    //   setCoin(coin - price);
    // };

    return (
      <>
            <PurchaseHandler/>
      </>
    )
}

export default MachineManager;
