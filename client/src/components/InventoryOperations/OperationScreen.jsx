import styles from './OperationScreen.module.css'



const OperationScreen = (props) => {
    const {allMessages} = props;

// all the Messages that been created in the InventoryHandler are being displayed here through mapping
    return (
        <div className={styles.displayScreen}>
            <div>
                <h1>Hello Vending Machine Owner...</h1>
                <h4>Here is your Opreation tracker</h4>
            </div>
            <ul className={styles.msgDisplay}>
                {allMessages.map(message => (
                    <li key={message}>{message}</li>
                ))}
            </ul>
        </div>
    )
}

export default OperationScreen;