import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopperHome } from './components/shopper-home';
import { AdminLogin } from './components/admin-login';
import { AdminDashboard } from './components/admin-dashboard';
import { AdminAddProduct } from './components/admin-add-product';
import { AdminDeleteProduct } from './components/admin-delete-product';
import { CustomerRegister } from './components/customer-register';
import { CustomerLogin } from './components/customer-login';
import { CustomerDashBoard } from './components/customer-dashboard';



function App() {

  return (
    <div className='body-background'>
      <div className='bg-shade'>
        <h1 className='text-light text-center pt-5'>Shopping Application</h1>


        <BrowserRouter>
          <Routes>

            <Route path='/' element={<ShopperHome />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/admin-dashboard' element={<AdminDashboard />} />
            <Route path='/add-product' element={<AdminAddProduct />} />
            <Route path='/delete-product/:id' element={<AdminDeleteProduct />} />
            <Route path='/customer-register' element={<CustomerRegister />} />
            <Route path='/customer-login' element={<CustomerLogin />} />
            <Route path='/customer-dashboard' element={<CustomerDashBoard />} />

          </Routes>
        </BrowserRouter>


      </div>
    </div>
  )
}

export default App
