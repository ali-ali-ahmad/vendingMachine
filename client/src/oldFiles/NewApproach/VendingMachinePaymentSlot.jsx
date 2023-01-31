const PaymentMethod = (amount) => ({
    amount,
    pay: () => { throw new Error("pay method not implemented") }
  });
  
  const Coin = (amount) => ({
    ...PaymentMethod(amount),
    pay: () => console.log(`Paid ${this.amount} using coin`)
  });
  
  const Cash = (amount) => ({
    ...PaymentMethod(amount),
    pay: () => console.log(`Paid ${this.amount} using cash`)
  });
  
  const CreditCard = (amount) => ({
    ...PaymentMethod(amount),
    pay: () => console.log(`Paid ${this.amount} using credit card`)
  });
  
  const VendingMachinePaymentSlot = ({ amount, onPaymentAccepted }) => {
    const handlePayment = (paymentMethod) => {
      paymentMethod.pay();
      onPaymentAccepted();
    };
    
    return (
      <div>
        <button onClick={() => handlePayment(Coin(amount))}>Pay with coin</button>
        <button onClick={() => handlePayment(Cash(amount))}>Pay with cash</button>
        <button onClick={() => handlePayment(CreditCard(amount))}>Pay with credit card</button>
      </div>
    );
  };
  export default VendingMachinePaymentSlot;  