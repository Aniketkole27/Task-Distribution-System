import React, { useEffect } from 'react'
import TeamMemberSelect from './TeamMemberSelector'

function CreateProject({ setOpen }) {

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const teamMembers = [
  { id: 1, name: 'Aniket Kole' },
  { id: 2, name: 'Sudarshan Salunke' },
  { id: 3, name: 'Pitter Parker' },
  { id: 4, name: 'Picky Blander' },
  { id: 5, name: 'John Carton' },
  { id: 6, name: 'Picky Blander' },
  { id: 7, name: 'John Carton' },
]

  return (
    <div
      className='fixed inset-0 bg-stone-950/50 border z-50 flex items-start justify-center'
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=' bg-white rounded-lg shadow-xl border-stone-300 w-full max-w-2xl mx-auto mt-5 flex flex-col'
      >
        <div className="p-4 border-b text-center text-shadow-2xs border-stone-300 text-lg font-semibold">
          Create New Project
        </div>

        <div className='flex-1 overflow-y-auto max-h-[80vh] px-6 pb-4 mx-auto'>
          <InputField
            label={"Project Name"}
            placeholder={"Write project name"}
          />
          <InputField
            label={"Description"}
            placeholder={"Write description"}
            as='textarea'
            row={4}
          />
          <InputField
            label={"Due Date"}
            placeholder={"Write project name"}
            type='date'
          />
          <InputField label={"Priority"} as="select" defaultValue="" >
            <option value="" disabled>
              Select Priority
            </option>
            <option value="">High</option>
            <option value="">Medium</option>
            <option value="">Low</option>

          </InputField>
          {/* <InputField label={"Team Members"} placeholder={"Write project name"} /> */}
          <TeamMemberSelect members={teamMembers} />

          <div className="p-4 border-t flex justify-center gap-2">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm border rounded"
            >
              Cancel
            </button>
            <button className="px-4 py-2 text-sm bg-black text-white rounded">
              Create
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CreateProject


const InputField = ({
  label,
  type = "text",
  as: Component = "input",
  placeholder,
  className = "",
  ...props
}) => {
  return (
    <div className='m-4 space-y-1.5'>
      <label className='block text-xs p-0.5'>{label}</label>
      <Component
        type={Component === 'input' ? type : undefined}
        placeholder={placeholder}
        className='px-3 py-2 text-sm outline-none border w-120 text-black font-medium border-stone-300 rounded shadow'
        {...props}
      />
    </div>
  )
}