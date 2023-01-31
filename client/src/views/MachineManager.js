import styled from "styled-components";
// import MoneyManager from '../components/MoneyManager';
// import Operation from '../components/Operation';
import React, { useState } from "react";
// import MoneyManager from "../components/NewApproach/MoneyManager";
// import Main from "../components/NewApproach/views/Main";
import PurchaseHandler from "../components/PurchaseOperations/PurchaseHandler";
import MoneyManager from "../components/MoneyOperations/MoneyManager";
// import MoneyManager from "../components/MoneyManager";



const Cabinet = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const MachineManager = (props) => {
    const [coin, setCoin] = useState(0);
    const [message, setMessage] = useState([]);

    const onCoinChanged = (total, newMessage) => {
      setCoin(total);
      setMessage([...message, newMessage]);
    };

    const onPurchase = price => {
      setCoin(coin - price);
    };

    return (
        <Cabinet>
            {/* <Operation coin={coin} onPurchase={onPurchase}  message={message}/> */}
            {/* <Main coin={coin} onPurchase={onPurchase}  message={message}/> */}
            <PurchaseHandler coin={coin} onPurchase={onPurchase}  message={message}/>
            <MoneyManager coin={coin} onCoinChanged={onCoinChanged} />
        </Cabinet>
    )
}

export default MachineManager;
