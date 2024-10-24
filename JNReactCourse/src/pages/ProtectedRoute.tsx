import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../contexts/FakeAuthContext_ts";

export default function ProtectedRoute({children}: {children: ReactNode}) {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(
        function () {
            if (!isAuthenticated) navigate("/");
        },
        [isAuthenticated, navigate]
    );

  return isAuthenticated ? children : null;
}
