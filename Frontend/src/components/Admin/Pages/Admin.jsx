import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../Sidebar/Sidebar'
import Dashboard from "../Dashboard/Dashboard"
import Projects from '../Projects/Projects'
import Team from '../Team/Team'

const Admin = () => {

  const currentTab = useSelector((state) => state.currentTab.value)
  const projectInfo = useSelector(state => state.currentTab.ProjectInfo)

  const renderContent = () => {
    switch (currentTab) {
      case "dashboard":
        return <Dashboard />;

      case "projects":
        return <Projects />;

      case "team":
        return <Team />;  

      case "todo's":
        return <Todos />;

      default:
        return <>h3llo</>;
    }
  };

  return (
    <main className='grid gap-4 p-4 grid-cols-[200px_1fr]'>
      <Sidebar />
      {
        renderContent()
      }
    </main>
  )

}

export default Admin
