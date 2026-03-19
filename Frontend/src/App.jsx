import { useState } from 'react'
// import Admin from './components/Admin/pages/Admin'
import AdminLayout from './layouts/AdminLayout';
import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LocomotiveScroll from 'locomotive-scroll';

function App() {
  // const scroll = new LocomotiveScroll();
  return (
    <>
      <div className='max-w-screen-2xl mx-auto 2xl:8px'>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/admin/dashboard" />} />
              <Route path="/admin/*" element={<AdminLayout />} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
    </>
  )
}

export default App