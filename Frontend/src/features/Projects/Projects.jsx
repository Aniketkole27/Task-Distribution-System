import React, { useEffect, useState } from 'react'
import Greeting from '@shared/components/Greeting'
import ProjectData from './components/ProjectData'
import FilterSection from './components/FilterSection'
import TotalProjects from './components/TotalProjects'
import CreateProject from './components/CreateProject'
import NavigationSection from './ProjectInfo/NavigationSection'
import ProjectStatistic from './ProjectInfo/ProjectStatistic'
import FilterTasks from './ProjectInfo/FilterTasks'
import TaskList from './ProjectInfo/TaskList'
import { useSelector, useDispatch } from 'react-redux'
import CreateTask from './ProjectInfo/CreateTask'
import { useProjectTask } from './hook/useProjectTask'


const Projects = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className='bg-card text-foreground rounded-lg pb-3 shadow h-full' >
      <Greeting />
      <ProjectData />
      <FilterSection setOpen={setOpen} />
      <TotalProjects />
      {open ? <CreateProject open={open} setOpen={setOpen} /> : null}
    </div >

  )

}

export default Projects