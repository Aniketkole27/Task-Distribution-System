import { Command, Search } from 'lucide-react'
import React from 'react'

const SearchBar = () => {
  return (
    <div className='bg-stone-200 mb-4 relative rounded flex items-center px-2 py-1 text-sm'>
      <span className='mr-2'><Search size={16} /></span>
      <input type="text" placeholder='Search' className='w-full bg-transparent placeholder:text-stone-400 focus:outline-none' />
      <span className='p-1 text-sm flex items-center gap-0.5 shadow bg-stone-50 rounded-sm'>
        <span><Command size={15} /></span>
        K
      </span>
    </div>
  )
}

export default SearchBar
