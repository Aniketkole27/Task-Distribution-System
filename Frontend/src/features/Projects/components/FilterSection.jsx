import React from 'react'
import FilterButton from './FilterButton'
import SearchProject from './SearchProject'
import { useSelector } from 'react-redux'
import { Plus } from 'lucide-react'

const FilterSection = ({ setOpen }) => {
  const userProfile = useSelector(state => state.currentUser.profile)
  const isAdmin = userProfile?.role === 'admin'

  return (
    <div className='p-4 bg-card border border-border rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-sm gap-4'>
      <div className="flex items-center gap-4 w-full md:w-auto">
        <FilterButton />
        <div className="h-8 w-px bg-border hidden md:block" />
        <div className="flex-1 md:flex-initial">
          <SearchProject />
        </div>
      </div>

      {isAdmin && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className='cursor-pointer text-shadow-xs border border-border dark:border-border  px-4 py-2 rounded font-medium text-foreground dark:text-foreground shadow hover:border-blue-300 hover:bg-blue-100  h hover:text-blue-500 active:bg-blue-200 transition-colors duration-300'>
          Create Project
        </button>
      )}
    </div>
  )
}

export default FilterSection
