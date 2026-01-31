import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Greeting from '../Dashboard/Greeting'
import ProjectData from './ProjectData'
import FilterSection from './FilterSection'
import TotalProjects from './TotalProjects'
import CreateProject from './CreateProject/CreateProject'


const Projects = () => {
  const subCurrent = useSelector((state) => state.currentTab.subValue)
  const [open, setOpen] = useState(false)

  const projectList = [
    {
      name: "Task Distribution System",
      dueDate: "20/1/1026",
      status: "pending",
      teamMember: [{ name: "Aniket Kole", role: "user", mobile: "8766726367", joinDate: "12/12/2025" }]
    },
    {
      name: "Ai Virtual Assistant",
      dueDate: "20/1/1026",
      status: "failed",
      teamMember: [{ name: "Aniket Kole", role: "user", mobile: "8766726367", joinDate: "12/12/2025" }]
    },
    {
      name: "Online Clipboard",
      dueDate: "20/1/1026",
      status: "pending",
      teamMember: [{ name: "Aniket Kole", role: "user", mobile: "8766726367", joinDate: "12/12/2025" }]
    },
    {
      name: "Salon Booking System",
      dueDate: "20/1/1026",
      status: "completed",
      teamMember: [{ name: "Aniket Kole", role: "user", mobile: "8766726367", joinDate: "12/12/2025" }]
    },
  ]

  return (
    <div className='bg-white text-black rounded-lg pb-3 shadow h-full'>
      <Greeting />
      <ProjectData />
      <FilterSection setOpen={setOpen} projectList={projectList} />
      <TotalProjects projectList={projectList} />
      {
        open ? <CreateProject open={open} setOpen={setOpen} /> : null
      }
    </div>
  )

  // switch (subCurrent) {
  //   case "projects": {
  //   }
  //     break;

  //   case 'createProject': {
  //     return (
  //       <div className='bg-white text-black rounded-lg pb-3 shadow h-full'>
  //         <Greeting />
  //         <ProjectData />
  //         <FilterSection />
  //         <TotalProjects /> 
  //       </div>
  //     )
  //   }

  //   default:
  //     break;
  // }
}

export default Projects
