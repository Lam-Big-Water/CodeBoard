import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../contexts/FakeAuthContext_ts";

type ProtectedRoute = {
    children: ReactNode;
}

function ProtectedRoute ({children}: ProtectedRoute) {
    const {isAuthenticated}: any = useAuth();
    const navigate = useNavigate();

    useEffect(function () {
        if (!isAuthenticated) navigate("/");
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children : null;
}

export default ProtectedRoute;