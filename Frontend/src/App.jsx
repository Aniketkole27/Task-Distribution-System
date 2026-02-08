import { useState } from 'react'
import Admin from './components/Admin/Pages/Admin'
import { Provider } from 'react-redux'
import { store } from './components/Admin/app/store'
import LocomotiveScroll from 'locomotive-scroll';

function App() {
  // const scroll = new LocomotiveScroll();
  return (
    <>
      <div className='max-w-screen-2xl mx-auto 2xl:8px'>
        <Provider store={store}>
          <Admin />
        </Provider>
      </div>
    </>
  )
}

export default App