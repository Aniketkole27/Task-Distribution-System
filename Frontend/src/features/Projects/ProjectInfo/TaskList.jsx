import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useProjectsWithTask } from '../hook/useProjectsWithTask'

const TaskList = ({ taskProject }) => {
  // const projectData = useSelector(state => state.projectData.data);
  // const projectInfo = projectData.find((project) => project._id === clickedProject)


  return (
    <div className='m-4'>
      {/* All Task */}
      <div>
        <TaskFormate key={taskProject.project?._id} taskProject={taskProject} />
      </div>
    </div>
  )
}

export default TaskList

const TaskFormate = ({ taskProject }) => {
  // console.log("Project with tasks in TaskFormate = ", taskProject)
  return (
    <>
      {taskProject.tasks.map((task) => (
        <div className='flex justify-between hover:bg-stone-200 active:bg-stone-300 items-center my-1 border border-stone-300 px-3 py-2 rounded shadow cursor-pointer'>
          <div className='flex gap-5 items-center'>
            <span className={`border border-transparent rounded-full ${task.priority === 'high' ? "bg-red-500" : "bg-amber-400"}  w-3 h-3`}></span>

            <h2 className='font-semibold text-black'>{task.title}</h2>
          </div>

          <div className='flex items-center  gap-10'>
            <h1 className='text-sm text-stone-600'>Due: 1-3-2026</h1>
            <p className='text-sm text-stone-700 min-w-50'>Assigned to: <span className='font-bold text-black'>{task.assignedTo.name}</span></p>
            <p className='text-sm text-stone-700 w-30'>Status: <span className='font-bold text-black'>{task.status}</span></p>
          </div>
        </div>
      ))}
    </>
  )
}