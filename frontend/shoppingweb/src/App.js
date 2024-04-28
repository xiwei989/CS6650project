import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Product from "./components/Product";
import Order from "./components/Order";
import DisplayProducts from "./components/DisplayProduct";
import Home from "./components/Layout";
import DisplayOrder from "./components/DiaplayOrder";

function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
              <Route path="/register" element= { <Register/>} />
              <Route path="/" element= { <Login/>} />
              <Route path="/home" element= { <Home/>} >
                <Route path="products" element={<DisplayProducts />} />
                <Route path="addproduct" element={<Product />} />
                <Route path="addorder" element={<Order />} />
                <Route path='orders' element={<DisplayOrder />} />
              </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
