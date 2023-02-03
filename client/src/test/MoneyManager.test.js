jest.mock('../components/MoneyOperations/MoneyManager', () => {
  return {
    setCreditCardStatus: jest.fn(),
    setTotal: jest.fn(),
    setAllMessages: jest.fn(),
    insertedMoney: {
      moneyType: 'cash', 
      amount: 10, 
      value: 10, 
      quantity: 1 
    },
    handleMoney: jest.fn(),
    allMessages: [],
    allMoney: {}
  };
});

const { setCreditCardStatus, setTotal, setAllMessages, handleMoney, allMessages } = require('../components/MoneyOperations/MoneyManager');

describe('handleMoney', () => {
  it('should set credit card status to true if money type is credit card', () => {
    const insertedMoney = {
      moneyType: 'credit card',
      amount: 10,
      value: 10,
      quantity: 1
    };

    handleMoney(insertedMoney);

    expect(setCreditCardStatus).toHaveBeenCalledWith(true); 
  });

  it('should add the amount to the total and update all messages with new message', () => {
    const insertedMoney = {
      moneyType: 'cash', 
      amount: 10, 
      value: 10, 
      quantity: 1 
    };

    handleMoney(insertedMoney);

    expect(setTotal).toHaveBeenCalledWith(30); 
    expect(setAllMessages).toHaveBeenCalledWith([...allMessages, `you have entered ₪${insertedMoney.amount} of ${insertedMoney.moneyType} type`]); 
  });

  // it('should update existing money in the database if it exists', () => {
  //   // jest.spyOn(axios, 'put').mockResolvedValue();

  //   const existingMoney = Object.values({ ...allMoney }).find(i => i.value === insertedMoney.value); 

  //   handleMoney(existingMoney);  

  //   // expect(axios.put).toHaveBeenCalled();  
  // });  

  // it('should post new money to the database if it does not exist', () => {
  //   // jest.spyOn(axios, 'post').mockResolvedValue();

  //   const nonExistingMoney = Object.values({ ...allMoney }).find(i => i.value !== insertedMoney.value); 

  //   handleMoney(nonExistingMoney);  

  //   // expect(axios.post).toHaveBeenCalled();  
  // });
});
