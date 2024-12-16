import Customer from "./features/customers/Customer";
import CreateCustomer from "./features/customers/CreateCustomer";
import { useSelector } from "react-redux";

const App = () => {
  const fullName = useSelector((state) => state.customer.fullName);
  return (
    <div>
      <h1>The Bank</h1>
      {fullName === "" ? <CreateCustomer /> : <Customer />}
    </div>
  )
}

export default App