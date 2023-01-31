import React, { useState } from 'react';

const PaymentTracker = () => {
  const [total, setTotal] = useState(0);
  const [allMessages, setAllMessages] = useState([]);
  const [paymentMethodTotals, setPaymentMethodTotals] = useState({
    coin: 0
  });

  const onMoneyInsert = insertedMoney => {
    if (insertedMoney.paymentMethod === "coin") {
      setPaymentMethodTotals({
        ...paymentMethodTotals,
        [insertedMoney.paymentMethod]:
          paymentMethodTotals[insertedMoney.paymentMethod] + insertedMoney.amount
      });
    }
    const newTotal = total + insertedMoney.amount;
    const newMessage = `you have entered ₪${insertedMoney.amount}`
    setAllMessages([...allMessages, newMessage])
    setTotal(newTotal);
  };

  return (
    <div>
      <h2>Total: ₪{total}</h2>
      <h3>Payment Method Totals:</h3>
      <ul>
        {Object.keys(paymentMethodTotals).map(method => (
          <li key={method}>
            {method}: ₪{paymentMethodTotals[method]}
          </li>
        ))}
      </ul>
      <h3>Messages:</h3>
      <ul>
        {allMessages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentTracker;


