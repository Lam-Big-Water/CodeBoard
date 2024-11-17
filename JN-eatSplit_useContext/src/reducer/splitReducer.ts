
export type FriendsType = {
    id: number;
    name: string;
    avatar: string;
    balance: number;
}



export type FriendsAction = 
    | {type: "added"; id: number; name: string; avatar: string;}
    | {type: "split"; selected: FriendsType | null; value: number;}


export function splitReducer (state: FriendsType[], action: FriendsAction) {
    switch(action.type) {
        case "added":
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    avatar: action.avatar,
                    balance: 0
                }
            ]

        case "split":
            return state.map((friend) => 
                            friend.id === action.selected?.id
                            ? {...friend, balance: friend.balance + action.value}
                            : friend
            )
    }
}