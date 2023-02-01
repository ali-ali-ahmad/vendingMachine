import React, { useState, useEffect } from "react";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 200px;
  height: 120px;
`;
const Item = styled.div`
  font-size: 1.7em;
  margin: 5px 15px 0 15px;
  padding: 5px;
  background-color: grey;
  color: black;
  width: 60px;
  text-align: center;
  border-radius: 50px;
  &:hover {
    cursor: pointer;
  }
`;

const Total = styled.div`
  font-size: 1.5em;
  margin: 25px 15px 0 15px;
  padding: 5px;
  text-align: center;
  background-color: Green;
  color: white;
  width: 200px;
  border-radius: 50px;
  &:hover {
    cursor: pointer;
  }
`;
const Return = styled.div`
  font-size: 1.5em;
  margin: 25px 15px 0 15px;
  padding: 5px;
  text-align: center;
  background-color: Grey;
  color: white;
  width: 200px;
  border-radius: 50px;
  &:hover {
    cursor: pointer;
  }
`;
const MoneyManager = (props) => {
  const { coin, onCoinChanged } = props;
  const [total, setTotal] = useState(coin);
  const [allMessages, setAllMessages] = useState([]);
  const [Change, setChange] = useState();

  useEffect(() => {
    setTotal(coin);
  }, [coin]);

  const onItemClick = value => {
    const newTotal = total + value;
    const newMessage = `you have entered ₪${value}`
    setAllMessages([...allMessages, newMessage])
    setTotal(newTotal);
    onCoinChanged(newTotal, newMessage);
  };

  const onReturn = () => {
    setChange(total);
    const newTotal = 0;
    setTotal(newTotal);
    onCoinChanged(newTotal);
  };
  return (
    <Container>
      <Item onClick={() => onItemClick(1)}>₪1</Item>
      <Item onClick={() => onItemClick(2)}>₪2</Item>
      <Item onClick={() => onItemClick(5)}>₪5</Item>
      <Item onClick={() => onItemClick(10)}>₪10</Item>
      <Item onClick={() => onItemClick(20)}>₪20</Item>
      <Item data-testid="50nis" onClick={() => onItemClick(50)}>₪50</Item>
      <Item data-testid="100nis" onClick={() => onItemClick(100)}>₪100</Item>
      <Item data-testid="200nis" value='200' onClick={() => onItemClick(200)}>₪200</Item>
      <Total data-testid="total">Inserted: ₪{total}</Total>
      <Return onClick={onReturn}>Change: ₪{Change}</Return>
    </Container>
  );
}

export default MoneyManager;
