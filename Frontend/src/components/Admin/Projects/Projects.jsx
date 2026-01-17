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

  return (
    <div className='bg-white text-black rounded-lg pb-3 shadow h-full'>
      <Greeting />
      <ProjectData />
      <FilterSection setOpen={setOpen} />
      <TotalProjects />
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
