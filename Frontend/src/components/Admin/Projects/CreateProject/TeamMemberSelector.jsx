import { useState } from 'react'
import { X } from 'lucide-react'

const TeamMemberSelect = ({ members }) => {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState([])
  const [open, setOpen] = useState(false)

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) &&
      !selected.some((s) => s.id === m.id)
  )
  console.log(query)

  const addMember = (member) => {
    setSelected([...selected, member])
    setQuery('')
    setOpen(false)
  }

  const removeMember = (id) => {
    setSelected(selected.filter((m) => m.id !== id))
  }

  return (
    <div className="m-4 space-y-2 relative">
      <label className="block text-xs p-0.5">Team Members</label>

      {/* Selected chips */}
      <div className="flex flex-wrap gap-2 w-full max-w-lg mx-auto">
        {selected.map((member) => (
          <span
            key={member.id}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-stone-200 rounded-full"
          >
            {member.name}
            <button onClick={() => removeMember(member.id)}>
              <X size={12} />
            </button>
          </span>
        ))}
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search team members..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        className="w-full px-3 py-2 text-sm outline-none border border-stone-300 rounded shadow"
      />

      {/* Dropdown */}
      {open && filteredMembers.length > 0 && (
        <div className="absolute z-10 w-full bg-white border rounded shadow max-h-48 overflow-y-auto">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => addMember(member)}
              className="px-3 py-2 cursor-pointer hover:bg-stone-100 text-sm"
            >
              {member.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


export default TeamMemberSelect