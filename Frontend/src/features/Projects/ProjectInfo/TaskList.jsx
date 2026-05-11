import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchTasksOnProjectId } from '@/app/projectTaskSlice'
import { Calendar, MoreVertical, CheckCircle2, Clock, AlertCircle, User2, AlertTriangle, ChevronDown } from 'lucide-react'

const TaskList = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { projectTasks, filters, loading } = useSelector((state) => state.projectTask)

  useEffect(() => {
    if (id) {
      dispatch(fetchTasksOnProjectId(id))
    }
  }, [id, dispatch, projectTasks?.length])

  // Filter logic
  const filteredTasks = projectTasks.filter(task => {
    const statusMatch = filters.status === "all" || task.status === filters.status;
    const priorityMatch = filters.priority === "all" || task.priority === filters.priority;
    return statusMatch && priorityMatch;
  });

  if (loading) {
    return (
      <div className='flex item-center justify-center h-40 mt-20 mb-30'>
        <div className="animate-spin border-4 border-t-blue-500 border-r-blue-500 rounded-full w-12 h-12"></div>
      </div>
    )
  }

  return (
    <div className='m-4'>
      {/* All Task */}
      <div className='min-h-[400px]'>
        <TaskFormate tasks={filteredTasks} />
      </div>
    </div>
  )
}

export default TaskList

const TaskFormate = ({ tasks }) => {
  return (
    <div className="grid gap-3">
      {tasks?.map((task) => (
        <div
          key={task._id}
          className='group relative bg-card hover:bg-muted/40 transition-all duration-300 border border-border/60 rounded-xl p-4 shadow-sm hover:shadow-md flex items-center justify-between gap-4 cursor-pointer overflow-hidden'
        >
          {/* Accent Glow on Hover */}
          <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${getPriorityBg(task.priority)} opacity-70 group-hover:w-1.5`} />

          {/* Left Section: Info & Title */}
          <div className='flex items-center gap-4 flex-1 min-w-0 ml-1'>
            <div className='flex flex-col min-w-0'>
              <div className='flex items-center gap-2 mb-1'>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border ${getStatusStyles(task.status)} shadow-sm transition-colors`}>
                  {task.status.replace('-', ' ')}
                </span>
                {/* <span className='text-[10px] font-medium text-muted-foreground/60 flex items-center gap-1'>
                  <Clock size={10} />
                  ID: {task._id.slice(-6).toUpperCase()}
                </span> */}
              </div>

              <h2 className='font-bold text-foreground text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate'>
                {task.title}
              </h2>

              <div className='flex items-center gap-4 mt-2'>
                <div className='flex items-center gap-1.5 text-muted-foreground'>
                  <Calendar size={12} className="text-blue-500/70" />
                  <span className='text-[11px] font-medium'>
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : 'No Date'}
                  </span>
                </div>
                <div className='flex items-center gap-1.5 text-muted-foreground'>
                  {getPriorityIcon(task.priority)}
                  <span className='text-[11px] font-medium capitalize'>{task.priority}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Assignment */}
          <div className='flex items-center gap-4'>
            <div className='flex flex-col items-end'>
              <p className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50 mb-1'>Assigned To</p>
              <div className='flex items-center gap-2 bg-muted/50 px-2 py-1 rounded-full border border-border/40 hover:border-border transition-colors'>
                <span className='text-[11px] font-semibold text-foreground truncate max-w-[100px]'>
                  {task.assignedTo?.name || (typeof task.assignedTo === 'string' ? 'User: ' + task.assignedTo.slice(-4) : 'Unassigned')}
                </span>
                <div className='w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm ring-1 ring-white/10'>
                  {getInitials(task.assignedTo?.name || task.assignedTo)}
                </div>
              </div>
            </div>

            {/* <button className='p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground/30 hover:text-foreground'>
              <MoreVertical size={16} />
            </button> */}
          </div>
        </div>
      ))}
    </div>
  )
}

// Helper functions for dynamic styling (Standard Colors)
const getPriorityBg = (priority) => {
  switch (priority) {
    case 'urgent': return 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.4)]';
    case 'medium': return 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.2)]';
    case 'low': return 'bg-slate-400';
    default: return 'bg-slate-300';
  }
}

const getPriorityIcon = (priority) => {
  switch (priority) {
    case 'urgent': return <AlertTriangle size={12} className="text-rose-500" />;
    case 'medium': return <AlertCircle size={12} className="text-amber-500" />;
    case 'low': return <ChevronDown size={12} className="text-slate-400" />;
    default: return <AlertCircle size={12} className="text-slate-300" />;
  }
}

const getStatusStyles = (status) => {
  switch (status) {
    case 'approved':
      return 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400';
    case 'rejected':
      return 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-400';
    case 'under-review':
      return 'bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20 text-purple-700 dark:text-purple-400';
    case 'submitted':
      return 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-400';
    case 'in-progress':
      return 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400';
    case 'todo':
      return 'bg-slate-50 dark:bg-slate-500/10 border-slate-200 dark:border-slate-500/20 text-slate-700 dark:text-slate-400';
    default:
      return 'bg-slate-50 dark:bg-slate-500/10 border-slate-200 dark:border-slate-500/20 text-slate-700 dark:text-slate-400';
  }
}

const getInitials = (name) => {
  if (!name || typeof name !== 'string') return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}
