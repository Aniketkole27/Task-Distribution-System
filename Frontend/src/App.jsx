import { useState } from 'react'
import AdminLayout from './layouts/AdminLayout';
import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LocomotiveScroll from 'locomotive-scroll';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';

function App() {
  // const scroll = new LocomotiveScroll();
  return (
    <>
      <div className='bg-background max-w-screen-2xl mx-auto 2xl:8px'>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/signin" />} />
              <Route path="/admin/*" element={<AdminLayout />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
    </>
  )
}

export default App