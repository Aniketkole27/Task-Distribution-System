import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Greeting from '@shared/components/Greeting'
import NavigationSection from './ProjectInfo/NavigationSection'
import ProjectStatistic from './ProjectInfo/ProjectStatistic'
import FilterTasks from './ProjectInfo/FilterTasks'
import TaskList from './ProjectInfo/TaskList'
import CreateTask from './ProjectInfo/CreateTask'
import { useProjectTask } from './hook/useProjectTask'



const ProjectDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [openTask, setOpenTask] = useState(false)
    const { taskProject, loading } = useProjectTask(id)
    console.log("taskProject", taskProject)

    const allProject = useSelector(state => state.projectData.data);
    const selectedProjectDetails = allProject.find(project => project._id === id)
    const userProfile = useSelector(state => state.currentUser.profile)

    // Permission Logic
    const isAdmin = userProfile?.role === 'admin'
    const isSubAdmin = userProfile?.role === 'sub-admin'
    const canCreateTask = isAdmin || isSubAdmin

    return (
        <div className='bg-card text-foreground rounded-lg pb-3 shadow h-full'>

            <Greeting />
            {openTask && (
                <CreateTask openTask={openTask} setOpenTask={setOpenTask} />
            )}
            <NavigationSection
                setOpenTask={setOpenTask}
                selectedProjectDetails={selectedProjectDetails}
            />

            {
                taskProject.length === 0
                    ? <div className='flex px-4 py-8 font-semibold items-center h-10'><p>No Statistic</p></div>
                    : <ProjectStatistic taskProject={taskProject} />
            }

            <FilterTasks />

            {
                taskProject?.tasks?.length === 0
                    ? <div className='flex flex-col justify-center font-bold items-center h-60'>
                        <p className='px-5 mb-4'>No tasks available.</p>
                        {canCreateTask && (
                            <button onClick={() => setOpenTask(true)} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'>
                                Create Task
                            </button>
                        )}
                    </div>
                    : <TaskList taskProject={taskProject} />
            }
        </div>
    )


}

export default ProjectDetails