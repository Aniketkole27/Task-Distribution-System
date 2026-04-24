import { Outlet } from "react-router-dom";
import AppInitializer from '../app/AppInitializer';
import { Sidebar } from './index'


const AdminLayout = () => {

  return (
    <main className='grid gap-4 p-4 grid-cols-[200px_1fr]' >
      <Sidebar />
      <div className="overflow-auto">
        <AppInitializer>
          <Outlet />
        </AppInitializer>
      </div>
    </main >
  )
}

export default AdminLayout

