import { Command, Search } from 'lucide-react'
import React, { useState } from 'react'
import CommandMenu from './CommandMenu'

const SearchBar = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className='bg-card mb-4 relative rounded flex items-center px-2 py-1 text-sm shadow-sm border border-border'>
        <span className='mr-2 text-muted-foreground'><Search size={16} /></span>
        <input
          type="text"
          onFocus={(e) => {
            e.target.blur()
            setOpen(true)
          }}
          placeholder='Search'
          className='w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none'
        />

        <span className='p-1 text-xs px-1.5 flex items-center gap-0.5 shadow-xs bg-muted text-muted-foreground rounded-sm border border-border'>
          <span><Command size={13} /></span>
          K
        </span>
      </div>
      <CommandMenu open={open} setOpen={setOpen} />
    </>
  )
}

export default SearchBar
