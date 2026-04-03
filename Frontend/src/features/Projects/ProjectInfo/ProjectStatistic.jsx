// import { CheckCircle, Clock, Workflow, X } from 'lucide-react'
// import React from 'react'
// import { useSelector } from 'react-redux'

// const ProjectStatistic = ({ clickedProject }) => {
//   const allData = useSelector(state => state.projectData.projectData);
//   const selectedProject = allData.filter((data) => data.id === clickedProject)[0]
//   const taskInfoObject = {
//     totalTask: selectedProject.tasks.length, 
//     completed: selectedProject.tasks.filter((task) => task.status === "completed").length,
//     inReview: selectedProject.tasks.filter((task) => task.status === "in-review").length,
//     failed: selectedProject.tasks.filter((task) => task.status === "failed").length,
//   }


//   return (
//     <div className='grid grid-cols-4 gap-3 m-4'>
//       <LabelData label="Total Tasks" icon={<Workflow size={16} />} value={taskInfoObject.totalTask} />
//       <LabelData label="Completed" icon={<CheckCircle size={16} />} value={taskInfoObject.completed} />
//       <LabelData label="In-Review" icon={<Clock size={16} />} value={taskInfoObject.inReview} />
//       <LabelData label="Failed" icon={<X size={16} />} value={taskInfoObject.failed} />
//     </div>
//   )
// }

// export default ProjectStatistic



import { CheckCircle, Clock, Workflow, X } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

const ProjectStatistic = ({ clickedProject }) => {
  const allData = useSelector(state => state.projectData.data);

  const selectedProject = allData.find(
    (data) => data.id === clickedProject
  );

  // ✅ Guard clause
  if (!selectedProject || !selectedProject.tasks) {
    return <div className="m-4 text-sm text-gray-500">No data available</div>;
  }

  // ✅ Single pass calculation
  const taskInfoObject = selectedProject.tasks.reduce(
    (acc, task) => {
      acc.totalTask++;

      if (task.status === "completed") acc.completed++;
      else if (task.status === "in-review") acc.inReview++;
      else if (task.status === "failed") acc.failed++;

      return acc;
    },
    { totalTask: 0, completed: 0, inReview: 0, failed: 0 }
  );

  return (
    <div className='grid grid-cols-4 gap-3 m-4'>
      <LabelData label="Total Tasks" icon={<Workflow size={16} />} value={taskInfoObject.totalTask} />
      <LabelData label="Completed" icon={<CheckCircle size={16} />} value={taskInfoObject.completed} />
      <LabelData label="In-Review" icon={<Clock size={16} />} value={taskInfoObject.inReview} />
      <LabelData label="Failed" icon={<X size={16} />} value={taskInfoObject.failed} />
    </div>
  )
}

export default ProjectStatistic


const LabelData = ({ label, value, icon, color = "bg-white" }) => {
  return (
    <div className='p-4 border rounded border-stone-300 shadow'>
      <div className='flex mb-3 gap-2 items-start '>
        <div className='flex flex-col gap-2 items-center justify-center'>
          <p className={`text-xs font-medium px-2 py-1 rounded ${color}`}>
            {icon}
          </p>
          <p className='text-2xl font-semibold'>{value}</p>
        </div>
        <h3 className='text-stone-500 mb-2 text-sm'>{label}</h3>
      </div>
    </div>
  )
}


