
export type StateType = {
    id: number;
    priority: number;
    description: string;
    status: boolean;
}

export type Actions = 
| {type: "Added"; id: number; priority: number; description: string;}
| {type: "Changed"; lists: StateType;}
| {type: "Deleted"; id: number;}



export function eventReducer (states: StateType[], action: Actions) {
    switch (action.type) {
        case "Added": {
            return [
                ...states,
                {
                    id: action.id,
                    priority: action.priority,
                    description: action.description,
                    status: false,
                }
            ]
        }

        case "Changed": {
            return states.map((state) => {
                if (state.id === action.lists.id) {
                    console.log(state + 'origin')
                    console.log(action.lists);
                    return action.lists;
                } else {
                    return state;
                }
            })
        }

        case "Deleted": {
            return states.filter((state) => state.id !== action.id);
        }

        default: {
            throw Error("Unknown action" + (action as any).type)
        }
    }
};