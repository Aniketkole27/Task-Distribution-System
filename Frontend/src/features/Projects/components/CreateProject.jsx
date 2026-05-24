import { useEffect, useState } from 'react'
import TeamMemberSelect from './TeamMemberSelector'
import { useSelector, useDispatch } from 'react-redux'
import { X, Layout, AlignLeft, Calendar, Flag, Users, Loader2 } from 'lucide-react'
import CustomSelect from '@/shared/components/CustomSelect'
import CustomDatePicker from '@/shared/components/CustomDatePicker'
import { createProject } from '../api/createProject'
import { fetchAllProjects } from '@/features/Dashboard/api/fetchAllProjects'
import { setData } from '@/app/projectDataSlice'

const priorityOptions = [
  { value: "high", label: "High", dotColor: "bg-red-500" },
  { value: "medium", label: "Medium", dotColor: "bg-amber-500" },
  { value: "low", label: "Low", dotColor: "bg-emerald-500" },
]

function CreateProject({ setOpen }) {
  const allUsers = useSelector(state => state.currentUser.allUsers)
  const dispatch = useDispatch()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    priority: "",
    teamMembers: []
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddTeamMember = (member) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, member]
    }))
  }

  const handleRemoveTeamMember = (id) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(member => member.id !== id)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        priority: formData.priority,
        dueDate: formData.date,
        teamMembers: formData.teamMembers.map(member => member.name),
      };
      await createProject(payload);

      // Refresh projects list in Redux store
      const response = await fetchAllProjects();
      dispatch(setData(response.data.projects || []));

      setOpen(false);
    } catch (err) {
      const status = err.response?.status;
      if (status === 403) {
        setError('You do not have permission to create projects.');
      } else {
        setError(err.response?.data?.message || 'Failed to create project. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className='fixed inset-0 bg-background/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'
      onClick={() => setOpen(false)}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className='bg-card rounded-2xl shadow-2xl border border-border w-full max-w-xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200'
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/30">
          <div className='flex items-center gap-2.5'>
            <div className='p-2 bg-blue-500/10 rounded-lg text-blue-500'>
              <Layout size={18} strokeWidth={2.5} />
            </div>
            <h2 className="text-lg font-extrabold tracking-tight text-foreground">Create New Project</h2>
          </div>
          <button 
            type="button"
            onClick={() => setOpen(false)}
            className='p-2 hover:bg-muted rounded-xl text-muted-foreground transition-colors'
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto max-h-[75vh] px-6 py-6 space-y-5 scrollbar-hide'>
          <InputField
            label="Project Name"
            icon={<Layout size={14} />}
            placeholder="Enter a descriptive project name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <InputField
            label="Description"
            icon={<AlignLeft size={14} />}
            placeholder="What is this project about?"
            as='textarea'
            rows={3}
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
          />

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2 px-1 text-muted-foreground'>
                <Calendar size={14} />
                <label className='text-[10px] font-bold uppercase tracking-widest'>Due Date</label>
              </div>
              <CustomDatePicker
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Select Due Date"
                openDirection="bottom"
              />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-2 px-1 text-muted-foreground'>
                <Flag size={14} />
                <label className='text-[10px] font-bold uppercase tracking-widest'>Priority</label>
              </div>
              <CustomSelect
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                options={priorityOptions}
                placeholder="Select Priority"
                openDirection="bottom"
              />
            </div>
          </div>

          <div className='space-y-2'>
            <div className='flex items-center gap-2 px-1 text-muted-foreground'>
              <Users size={14} />
              <span className='text-[10px] font-bold uppercase tracking-widest'>Team Members</span>
            </div>
            <TeamMemberSelect
              allUsers={allUsers}
              handleAddTeamMember={handleAddTeamMember}
              handleRemoveTeamMember={handleRemoveTeamMember}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mb-2 px-4 py-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-sm text-rose-500 font-medium">
            {error}
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 bg-muted/30 border-t border-border flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={submitting}
            className="px-5 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 bg-emerald-500/8 dark:bg-emerald-500/15 hover:bg-emerald-500/15 dark:hover:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-full font-semibold text-sm border border-emerald-500/30 dark:border-emerald-500/40 hover:border-emerald-500/50 dark:hover:border-emerald-500/60 shadow-[0_2px_8px_rgba(16,185,129,0.08)] dark:shadow-[0_2px_12px_rgba(16,185,129,0.15)] active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 disabled:active:scale-100"
          >
            {submitting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Creating...
              </>
            ) : (
              'Create Project'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProject

const InputField = ({
  label,
  icon,
  type = "text",
  as: Component = "input",
  placeholder,
  className = "",
  value,
  onChange,
  children,
  required,
  ...props
}) => {
  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-2 px-1 text-muted-foreground'>
        {icon}
        <label className='text-[10px] font-bold uppercase tracking-widest'>{label}</label>
      </div>
      <Component
        required={required}
        value={value}
        onChange={onChange}
        type={Component === 'input' ? type : undefined}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-foreground font-medium placeholder:text-muted-foreground/50 ${className}`}
        {...props}
      >
        {children}
      </Component>
    </div>
  )
}