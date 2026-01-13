import React from 'react'
import { useSelector} from 'react-redux'
import Greeting from '../Dashboard/Greeting'
import ProjectData from './ProjectData'
import FilterSection from './FilterSection'
import TotalProjects from './TotalProjects'
import CreateProject from './CreateProject/CreateProject'


const Projects = () => {
  const subCurrent = useSelector((state) => state.currentTab.subValue)

  switch (subCurrent) {
    case "projects": {
      return (
        <div className='bg-white text-black rounded-lg pb-3 shadow h-full'>
          <Greeting />
          <ProjectData />
          <FilterSection />
          <TotalProjects />
        </div>
      )
    }
      break;

    case 'createProject': {
      return (
        <div className='bg-white text-black rounded-lg pb-3 shadow h-full'>
          <Greeting />
          <CreateProject />
        </div>
      )
    }

    default:
      break;
  }
}

export default Projects
