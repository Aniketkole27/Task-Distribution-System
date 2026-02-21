import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const TaskList = ({ clickedProject }) => {
  const projectData = useSelector(state => state.projectData.projectData);
  const projectInfo = projectData.filter((project) => project.id === clickedProject)[0]
  console.log(projectInfo)
  return (
    <div className='m-4'>
      {/* All Task */}
      <div>
        <TaskFormate projectInfo={projectInfo} />
      </div>
    </div>
  )
}

export default TaskList

const TaskFormate = ({ projectInfo }) => {
  return (
    <>
      {projectInfo.tasks.map((task) => (
        <div className='flex justify-between hover:bg-stone-200 active:bg-stone-300 items-center my-1 border border-stone-300 px-3 py-2 rounded shadow cursor-pointer'>
          <div className='flex gap-5 items-center'>
            <span className={`border border-transparent rounded-full ${task.priority === 'high' ? "bg-red-500" : "bg-amber-400"}  w-3 h-3`}></span>

            <h2 className='font-semibold text-black'>{task.title}</h2>
          </div>

          <div className='flex items-center  gap-10'>
            <h1 className='text-sm text-stone-600'>Due: 1-3-2026</h1>
            <p className='text-sm text-stone-700 min-w-50'>Assigned to: <span className='font-bold text-black'>{task.assignedTo}</span></p>
            <p className='text-sm text-stone-700 w-30'>Status: <span className='font-bold text-black'>{task.status}</span></p>
          </div>
        </div>
      ))}
    </>
  )
}