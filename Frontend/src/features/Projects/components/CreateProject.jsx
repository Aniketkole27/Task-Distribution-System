import { useEffect, useState } from 'react'
import TeamMemberSelect from './TeamMemberSelector'
import { useSelector } from 'react-redux'
import { X, Layout, AlignLeft, Calendar, Flag, Users } from 'lucide-react'

function CreateProject({ setOpen }) {
  const allUsers = useSelector(state => state.currentUser.allUsers)

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Project Created:", formData);
    setOpen(false);
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
            <InputField
              label="Due Date"
              icon={<Calendar size={14} />}
              type='date'
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
            />
            <InputField 
              label="Priority" 
              icon={<Flag size={14} />}
              name="priority" 
              as="select" 
              required
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="" disabled>Select Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </InputField>
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

        {/* Footer */}
        <div className="px-6 py-4 bg-muted/30 border-t border-border flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-5 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
          >
            Create Project
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