import { Command, Search } from 'lucide-react'
import React, { useState } from 'react'
import CommandMenu from './CommandMenu'

const SearchBar = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className='bg-stone-200 mb-4 relative rounded flex items-center px-2 py-1 text-sm'>
        <span className='mr-2'><Search size={16} /></span>
        <input
          type="text"
          onFocus={(e) => {
            e.target.blur()
            setOpen(true)
          }}
          placeholder='Search'
          className='w-full bg-transparent placeholder:text-stone-400 focus:outline-none'
        />

        <span className='p-1 text-sm flex items-center gap-0.5 shadow bg-stone-50 rounded-sm'>
          <span><Command size={15} /></span>
          K
        </span>
      </div>
      <CommandMenu open={open} setOpen={setOpen} />
    </>
  )
}

export default SearchBar
