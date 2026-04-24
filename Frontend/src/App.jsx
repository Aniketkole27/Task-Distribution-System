import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className='bg-background max-w-screen-2xl mx-auto 2xl:8px'>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App