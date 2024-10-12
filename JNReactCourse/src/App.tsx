import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";

function App () {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />}/>
                <Route path="pricing" element={<Pricing />}/>
                <Route path="product" element={<Product />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;