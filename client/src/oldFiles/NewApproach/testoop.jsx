class PaymentMethod {
    constructor(amount) {
      this.amount = amount;
    }
  
    pay() {
      throw new Error("pay method not implemented");
    }
  }
  
  class Coin extends PaymentMethod {
    pay() {
      console.log(`Paid ${this.amount} using coin`);
    }
  }
  
  class Cash extends PaymentMethod {
    pay() {
      console.log(`Paid ${this.amount} using cash`);
    }
  }
  
  class CreditCard extends PaymentMethod {
    pay() {
      console.log(`Paid ${this.amount} using credit card`);
    }
  }
  
  function VendingMachinePaymentSlot({ amount, onPaymentAccepted }) {
    const handlePayment = paymentMethod => {
      paymentMethod.pay();
      onPaymentAccepted();
    };
  
    return (
      <div>
        <button onClick={() => handlePayment(new Coin(amount))}>Pay with coin</button>
        <button onClick={() => handlePayment(new Cash(amount))}>Pay with cash</button>
        <button onClick={() => handlePayment(new CreditCard(amount))}>Pay with credit card</button>
      </div>
    );
  }
  