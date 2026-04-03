import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Greeting from '@shared/components/Greeting'
import NavigationSection from './ProjectInfo/NavigationSection'
import ProjectStatistic from './ProjectInfo/ProjectStatistic'
import FilterTasks from './ProjectInfo/FilterTasks'
import TaskList from './ProjectInfo/TaskList'
import CreateTask from './ProjectInfo/CreateTask'

const ProjectDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [openTask, setOpenTask] = useState(false)

    return (
        <div className='bg-white text-black rounded-lg pb-3 shadow h-full'>

            <Greeting />
            {openTask && (
                <CreateTask openTask={openTask} setOpenTask={setOpenTask} />
            )}
            <NavigationSection setOpenTask={setOpenTask} />

            {/* Pass ID instead of state */}
            <ProjectStatistic clickedProject={id} />
            <FilterTasks />
            <TaskList clickedProject={id} />
        </div>
    )

}

export default ProjectDetails