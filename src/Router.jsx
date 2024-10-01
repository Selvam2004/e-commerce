import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import AuthProvider from './context/AuthProvider';
import SignUp from './pages/login/signUp';
import ProtectedRoutes from './Routes/ProtectedRoutes';
import Login from './pages/login/Login';
import Home from './pages/home/home'
import Product from './pages/product/Product';
import AllProducts from './pages/product/AllProducts';
const Routing = () => {
  return (
    <AuthProvider>
        <Router>
            <Routes>
                <Route path='/' element={<SignUp/>}/>
                <Route path='/login' element={<Login/>}/>  
                <Route path='/home' element={<ProtectedRoutes> <Home/></ProtectedRoutes>}/>        
                <Route path='/home/product/:name' element={ <ProtectedRoutes> <Product/> </ProtectedRoutes>}/>         
                <Route path='/home/allproducts' element={ <ProtectedRoutes>  <AllProducts/>  </ProtectedRoutes>}/>    
            </Routes>
        </Router>
    </AuthProvider>
  )
}

export default Routing;