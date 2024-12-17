import Customer from "./features/customers/Customer";
import CreateCustomer from "./features/customers/CreateCustomer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { useSelector } from "react-redux";

const App = () => {
  const fullName = useSelector((state) => state.customer.fullName);
  return (
    <div>
      <h1>The Bank</h1>
      {fullName === "" ?( <CreateCustomer />) : 
      (<>
        <Customer />
        <AccountOperations />
        <BalanceDisplay />
      </>)}
    </div>
  )
}

export default App