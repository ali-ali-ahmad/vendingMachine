import React from "react";
// import DisplayScreen from "./views/MachineManager";
import styles from './App.module.css'
import MachineManager from "./views/MachineManager";
// import MoneyHandler from "./components/NewApproach/components/MoneyHandler";
// import MoneyManager from "./components/NewApproach/MoneyManager";
// import VendingMachinePaymentSlot from "./components/NewApproach/VendingMachinePaymentSlot";
// import Inventory from "./components/NewApproach/inventory";
// import Main from "./components/NewApproach/views/Main";

const App = () => {

  return (
    <div className={styles.container}>
      {/* <DisplayScreen /> */}
      {/* <Inventory/> */}
      {/* <Main/> */}
{/* <VendingMachinePaymentSlot/> */}
{/* <MoneyHandler/> */}
{/* <MoneyManager/> */}
  <MachineManager/>
    </div>
  );
}
export default App;



