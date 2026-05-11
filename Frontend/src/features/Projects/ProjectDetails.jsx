import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Greeting from '@shared/components/Greeting'
import NavigationSection from './ProjectInfo/NavigationSection'
import ProjectStatistic from './ProjectInfo/ProjectStatistic'
import FilterTasks from './ProjectInfo/FilterTasks'
import TaskList from './ProjectInfo/TaskList'
import CreateTask from './ProjectInfo/CreateTask'
import { fetchTasksOnProjectId } from '@/app/projectTaskSlice'

import ProjectPanelDetails from './ProjectInfo/ProjectPanelDetails'

const ProjectDetails = () => {
    const { id } = useParams()
    const [openTask, setOpenTask] = useState(false)
    const [activeTab, setActiveTab] = useState('tasks') // 'tasks' or 'details'
    const dispatch = useDispatch()
    const [selectedProjectDetails, setSelectedProjectDetails] = useState({});
    const projectData = useSelector(state => state.projectData.data)
    const { projectTasks, loading } = useSelector((state) => state.projectTask)

    useEffect(() => {
        const selectedProject = projectData.find((project) => project._id === id)
        setSelectedProjectDetails(selectedProject || {});
    }, [projectData, id])

    useEffect(() => {
        if (id) {
            dispatch(fetchTasksOnProjectId(id))
        }
    }, [id, dispatch])

    const userProfile = useSelector(state => state.currentUser.profile)
    const isAdmin = userProfile?.role === 'admin'
    const isSubAdmin = userProfile?.role === 'sub-admin'
    const canCreateTask = isAdmin || isSubAdmin

    return (
        <div className='bg-background text-foreground  pb-3  h-full flex flex-col px-4 pt-4'>
            <Greeting />

            {openTask && (
                <CreateTask
                    setOpenTask={setOpenTask}
                    selectedProjectDetails={selectedProjectDetails}
                />
            )}

            <NavigationSection
                setOpenTask={setOpenTask}
                selectedProjectDetails={selectedProjectDetails}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div className='flex-1 overflow-y-auto'>
                {activeTab === 'tasks' ? (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {projectTasks.length === 0 ? (
                            <div className='px-4 py-8 font-semibold flex items-center h-10'>
                                <p>No Statistic</p>
                            </div>
                        ) : (
                            <ProjectStatistic
                                loading={loading}
                                taskProject={{ tasks: projectTasks }}
                            />
                        )}

                        <FilterTasks />

                        {projectTasks.length === 0 ? (
                            <div className='flex flex-col justify-center font-bold items-center h-60'>
                                <p className='mb-4 text-muted-foreground'>No tasks available for this project.</p>
                                {canCreateTask && (
                                    <button
                                        onClick={() => setOpenTask(true)}
                                        className='bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20'
                                    >
                                        Create First Task
                                    </button>
                                )}
                            </div>
                        ) : (
                            <TaskList />
                        )}
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <ProjectPanelDetails project={selectedProjectDetails} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProjectDetails
