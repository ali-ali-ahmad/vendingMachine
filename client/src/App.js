import React from "react";
import styles from './App.module.css'
import MachineManager from "./views/MachineManager";

const App = () => {

  return (
    <div className={styles.container}>
      <MachineManager/>
    </div>
  );
}
export default App;



