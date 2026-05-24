import { useState, useEffect, useRef } from 'react'
import { X, Search } from 'lucide-react'

const TeamMemberSelect = ({ allUsers, handleAddTeamMember, handleRemoveTeamMember, initialSelected = [] }) => {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(initialSelected)
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const filteredMembers = allUsers?.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) &&
      !selected.some((s) => s._id === m._id)
  )

  useEffect(() => {
    if (open && filteredMembers?.length > 0) {
      const scrollToBottom = () => {
        const scrollableParent = containerRef.current?.closest('.overflow-y-auto')
        if (scrollableParent) {
          scrollableParent.scrollTo({
            top: scrollableParent.scrollHeight,
            behavior: 'smooth'
          })
        }
      }
      scrollToBottom()
      const timer = setTimeout(scrollToBottom, 100)
      return () => clearTimeout(timer)
    }
  }, [open, filteredMembers?.length])

  const addMember = (member) => {
    setSelected([...selected, member])
    setQuery('')
    setOpen(false)
    handleAddTeamMember(member)
  }

  const removeMember = (id, memberId) => {
    setSelected(selected.filter((m) => m._id !== id))
    handleRemoveTeamMember(memberId)
  }

  const getInitials = (name) => {
    if (!name) return ""
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
  }

  return (
    <div ref={containerRef} className="relative w-full space-y-3">
      {/* Search Input Container */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground/50">
          <Search size={16} />
        </span>
        <input
          type="text"
          placeholder="Search and add team members..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-foreground font-medium placeholder:text-muted-foreground/40"
        />
      </div>

      {/* Dropdown Popover (opens to the bottom) */}
      {open && filteredMembers?.length > 0 && (
        <div className="absolute z-[100] top-full mt-1.5 left-0 w-full bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-xl max-h-48 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150 py-1">
          {filteredMembers.map((member) => (
            <div
              key={member._id}
              onClick={() => addMember(member)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors font-medium text-foreground/80 hover:bg-muted hover:text-foreground cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-[10px] font-extrabold shrink-0 border border-blue-500/20 shadow-sm">
                {getInitials(member.name)}
              </div>
              <span className="truncate">{member.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Selected Chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 w-full pt-1">
          {selected.map((member) => (
            <div
              key={member._id}
              className="flex items-center gap-2 px-2.5 py-1.5 bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/10 rounded-xl transition-all shadow-sm animate-in zoom-in-95 duration-150"
            >
              <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-[9px] font-extrabold shrink-0 border border-blue-500/20">
                {getInitials(member.name)}
              </div>
              <span className="text-xs font-semibold text-foreground/80">{member.name}</span>
              <button
                type="button"
                onClick={() => removeMember(member._id, member.id)}
                className="text-muted-foreground/60 hover:text-red-500 p-0.5 rounded-full transition-colors cursor-pointer"
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TeamMemberSelect