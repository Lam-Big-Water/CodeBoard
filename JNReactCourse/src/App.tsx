import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";

function App () {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />}/>
                <Route path="pricing" element={<Pricing />}/>
                <Route path="product" element={<Product />}/>
                <Route path="login" element={<Login />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;