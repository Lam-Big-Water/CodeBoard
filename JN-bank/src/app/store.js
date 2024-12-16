import {configureStore} from "@reduxjs/toolkit";
import customerReducer from "../features/customers/customerSlice";

const store = configureStore({
  reducer: {
    customer: customerReducer,
  },
});

export default store;
