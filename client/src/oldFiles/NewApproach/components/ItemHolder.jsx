import React from "react";
import styled from "styled-components";

const DivBox = styled.div`
  border: 1px solid LIGHTSEAGREEN;
  height: 80px;
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

function SlotItem({ product, coin }) {
  const { itemName, price, quantity, code } = product;

  return (
    <DivBox>
      <DivName>{itemName}</DivName>
      <DivPrice>₪{price}</DivPrice>
      <DivQuantity>{quantity}</DivQuantity>
      <DivStatus
        // onClick={() => {
        //   if (price > coin) return;
        //   onPurchase(price);
        // }}
        // available={itemName && coin >= price}
      >Code: {code}</DivStatus>
    </DivBox>
  );
}
export default SlotItem;
