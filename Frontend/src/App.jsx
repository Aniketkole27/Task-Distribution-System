import { useState } from 'react'
import Admin from './components/Admin/Pages/Admin'
import { Provider } from 'react-redux'
import { store } from './components/Admin/app/store'

function App() {

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

{/* <div className="text-lg font-medium">
  Kevin Dukkon
  <p className="text-sm text-gray-500">hey@kevdu.co</p>
</div> */}