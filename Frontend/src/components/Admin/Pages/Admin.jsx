import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../Sidebar/Sidebar'
import Dashboard from "../Dashboard/Dashboard"
import Projects from '../Projects/Projects'

const Admin = () => {

  const currentTab = useSelector((state) => state.currentTab.value)

  switch (currentTab) {
    case "dashboard": {
      return (
        <main className='grid gap-4 p-4 grid-cols-[200px_1fr]'>
          <Sidebar />
          <Dashboard />
        </main>
      )
    }
      break;

    case "projects": {
      return (
        <main className='grid gap-4 p-4 grid-cols-[200px_1fr]'>
          <Sidebar />
          <Projects />
        </main>
      )
    }
      break;

    case "team": {
      return (
        <main className='grid gap-4 p-4 grid-cols-[200px_1fr]'>
          <Sidebar />
        </main>
      )
    }
      break;

    case "todo's": {
      return (
        <main className='grid gap-4 p-4 grid-cols-[200px_1fr]'>
          <Sidebar />
        </main>
      )
    }
      break;

    default: return (<> h3llo</>)
      break;
  }


}

export default Admin
