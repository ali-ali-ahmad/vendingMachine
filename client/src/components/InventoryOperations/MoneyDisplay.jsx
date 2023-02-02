import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const MoneyDisplay = (props) => {
    const {allMoney} = props;


    return (
        <div style={{width: "400px", textAlign: "center"}}>
            <h3>Your current money in the machine</h3>
        <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 500 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Money Type</TableCell>
                        <TableCell align="center">Value</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Total Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {allMoney.map((money, inx) => {
                    return(
                    <TableRow
                        key={inx}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" align="center">
                            {money.moneyType}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                            {money.value}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                            {money.quantity}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                            {money.amount}₪
                        </TableCell>
                    </TableRow>
                    )
                })}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    )
}

export default MoneyDisplay;