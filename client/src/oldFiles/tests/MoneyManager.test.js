import { render, fireEvent, screen } from "@testing-library/react";
import MoneyManager from "../../components/MoneyManager";


test("Money Counter", () => {

render(<MoneyManager />);


const total = screen.getByTestId("total");
const add200nis = screen.getByTestId("200nis");


fireEvent.click(add200nis);


expect(total).toHaveTextContent("Inserted: ₪200");
});