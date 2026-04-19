import { Command, Search } from 'lucide-react'
import React, { useState } from 'react'
import CommandMenu from './CommandMenu'

const SearchBar = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className='group bg-card mb-4 relative rounded-xl flex items-center px-3 py-2 text-sm shadow-sm border border-border cursor-text transition-all hover:bg-muted/50 hover:shadow-md ring-primary/10 hover:ring-2'
      >
        <Search className='mr-2.5 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors' />
        <span className='flex-1 text-muted-foreground select-none'>Quick search...</span>

        <kbd className='hidden sm:flex items-center gap-1 ml-auto px-1.5 py-0.5 rounded border border-border bg-muted/50 font-mono text-[10px] font-medium text-muted-foreground'>
          <Command size={10} className="mb-0.5" />
          <span>K</span>
        </kbd>
      </div>

      <CommandMenu open={open} setOpen={setOpen} />
    </>
  )
}

export default SearchBar

