import './App.css';
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Review from "./components/Review/Review";
import Manage from "./components/Manage/Manage";
import NotMatch from "./components/NotMatch/NotMatch";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Shipment from './components/Shipment/Shipment';
import Login from './components/LogIn/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext();
function App() {
  const [loggedInUser, setloggedInUser] = useState({})
  return (
    <userContext.Provider value={[loggedInUser, setloggedInUser]}>
        <BrowserRouter>
        <Header></Header>
            <Routes>
                    <Route path="/shop" element={<Shop />}></Route>
                    <Route path="/review" element={<Review />}></Route>
                    <Route path="/manage" element={<Manage />}></Route>
                    <Route  path="/shipment" element={<PrivateRoute><Shipment/></PrivateRoute>}></Route>
                    <Route  path="/login" element={<Login />}></Route>
                    <Route exact path="/" element={<Shop />}></Route>
                    <Route exact path="/product/:productKey" element={<ProductDetails />}></Route>
                    <Route path="*" element={<NotMatch />}></Route>

            </Routes>
        </BrowserRouter>

    </userContext.Provider>
  );
}

export default App;
