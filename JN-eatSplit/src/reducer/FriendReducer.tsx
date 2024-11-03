

export type States = {
    id: number;
    name: string;
    avatar: string;
    balance: number;
}

export type Actions = 
    | {type: "Added"; id: number; name: string; avatar: string;}
    | {type: "Changed"; friend: States;}
    | {type: "test"; testNum: number;}



export function friendReducer (states: States[], actions: Actions) {
    switch (actions.type) {
        case "Added": {
            return [
                ...states,
                {
                   id: actions.id,
                   name: actions.name,
                   avatar: actions.avatar,
                   balance: 0, 
                }
            ]
        }

        case "Changed": {
            return states.map((state) => {
                if (state.id === actions.friend.id) {
                    return actions.friend
                } else {
                    return state
                }
            })
        }
        

        default: {
            throw Error("Action Wrong!!!")
        }
    }
};