import React from 'react'
import FilterButton from './FilterButton'
import SearchProject from './SearchProject'
import { useSelector } from 'react-redux'

const FilterSection = ({ setOpen }) => {
  const userProfile = useSelector(state => state.currentUser.profile)
  const isAdmin = userProfile?.role === 'admin'

  return (
    <div className='p-6 mt-6 mx-4 bg-card border border-border rounded-xl flex items-center justify-between shadow-sm'>
      <div className="flex items-center gap-6">
        <FilterButton />
        <div className="h-8 w-px bg-border hidden md:block" />
        <SearchProject />
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

