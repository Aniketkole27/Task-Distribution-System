import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Greeting from '@shared/components/Greeting'
import NavigationSection from './ProjectInfo/NavigationSection'
import ProjectStatistic from './ProjectInfo/ProjectStatistic'
import FilterTasks from './ProjectInfo/FilterTasks'
import TaskList from './ProjectInfo/TaskList'
import CreateTask from './ProjectInfo/CreateTask'
import { fetchTasksOnProjectId } from '@/app/projectTaskSlice'

import ProjectPanelDetails from './ProjectInfo/ProjectPanelDetails'
import TaskDetailsModal from '../JiraBoard/components/TaskDetailsModal'

const ProjectDetails = () => {
    const { id } = useParams()
    const location = useLocation()
    const [openTask, setOpenTask] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'tasks') // 'tasks' or 'details'
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
                                        className="px-6 py-2.5 bg-sky-500/8 dark:bg-sky-500/15 hover:bg-sky-500/15 dark:hover:bg-sky-500/25 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 rounded-full font-semibold text-sm border border-sky-500/30 dark:border-sky-500/40 hover:border-sky-500/50 dark:hover:border-sky-500/60 shadow-[0_2px_8px_rgba(14,165,233,0.08)] dark:shadow-[0_2px_12px_rgba(14,165,233,0.15)] active:scale-[0.97] transition-all duration-300 cursor-pointer"
                                    >
                                        Create First Task
                                    </button>
                                )}
                            </div>
                        ) : (
                            <TaskList onTaskClick={(task) => setSelectedTask(task)} />
                        )}
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <ProjectPanelDetails project={selectedProjectDetails} />
                    </div>
                )}
            </div>
            {selectedTask && (
                <TaskDetailsModal
                    task={{
                        ...selectedTask,
                        project: selectedTask.project?.name
                            ? selectedTask.project
                            : { name: selectedProjectDetails?.name || "Project" }
                    }}
                    status={selectedTask.status}
                    onClose={() => setSelectedTask(null)}
                />
            )}  
        </div>
    )
}

export default ProjectDetails
