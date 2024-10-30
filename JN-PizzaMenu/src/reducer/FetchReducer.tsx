import type { Reducer } from "react";

export type Pizza = {
  name: string;
  photo: string;
  describe: string;
  price: number;
  sold: boolean;
};

type States = {
  pizzas: Pizza[];
  loading: boolean;
  error: boolean;
};

type Actions =
  | { type: "receive";}
  | { type: "received"; payload: Pizza[];}
  | { type: "error";};

const FetchReducer: Reducer<States[], Actions> = (state, action) => {
    switch (action.type) {
        case "receive":
            return {
                ...state,
                loading: true,
                error: false,
            }
        case "received":
            return {
                ...state,
                loading: false,
                error: false,
                pizzas: action.payload,
            }
        case "error":
            return {
                ...state,
                loading: false,
                error: true,
            }
        default:
            throw new Error();
    }
};

export default FetchReducer;
