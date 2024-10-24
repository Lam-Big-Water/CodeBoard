import { ReactNode, createContext, useContext, useReducer } from "react";

const AuthContext = createContext<CreateContextType | undefined>(undefined);

type UserType = {
    name: string;
    email: string;
    password: string;
    avatar: string;
}

type State = {
    user: null | UserType;
    isAuthenticated: boolean;
}

type MethodType = {
    login: (email: string, password: string) => void;
    logout: () => void;
}

type CreateContextType = {
    user: null | UserType;
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

interface LoginAction {
    type: "login";
    payload: UserType;
}

interface LogOutAction {
    type: "logout";
}

type Actions = | LoginAction | LogOutAction;

const initialState = {
    user: null,
    isAuthenticated: false,
};

function reducer (state: State, action: Actions) {
    switch (action.type) {
        case "login":
            return {...state, user: action.payload, isAuthenticated: true};
        case "logout":
            return {...state, user: null, isAuthenticated: false};
        default:
            throw new Error("Unknown action");
    };
};

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
}


type AuthProvider = {children: ReactNode}

function AuthProvider ({children}:AuthProvider) {
    
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState);

    function login (email: string, password: string) {
        if (email === FAKE_USER.email && password === FAKE_USER.password)
            dispatch({type: "login", payload: FAKE_USER})
    }

    function logout () {
        dispatch({type: "logout"})
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth () {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("AuthContext was used outside AuthProvider");
    return context;
}

export {AuthProvider, useAuth};