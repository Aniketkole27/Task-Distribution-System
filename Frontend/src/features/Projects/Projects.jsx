import React, { useState } from 'react'
import Greeting from '@shared/components/Greeting'
import ProjectData from './components/ProjectData'
import FilterSection from './components/FilterSection'
import TotalProjects from './components/TotalProjects'
import CreateProject from './components/CreateProject'

const Projects = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className='flex flex-col gap-6 bg-background text-foreground rounded-2xl pb-6 px-4 pt-4 h-full overflow-auto' >
      <Greeting />
      <ProjectData />
      <FilterSection setOpen={setOpen} />
      <TotalProjects />
      {open ? <CreateProject open={open} setOpen={setOpen} /> : null}
    </div >
  )
}

export default Projects
