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
          className="px-5 py-2 bg-sky-500/8 dark:bg-sky-500/15 hover:bg-sky-500/15 dark:hover:bg-sky-500/25 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 rounded-full font-semibold text-sm border border-sky-500/30 dark:border-sky-500/40 hover:border-sky-500/50 dark:hover:border-sky-500/60 shadow-[0_2px_8px_rgba(14,165,233,0.08)] dark:shadow-[0_2px_12px_rgba(14,165,233,0.15)] active:scale-[0.97] transition-all duration-300 cursor-pointer"
        >
          Create Project
        </button>
      )}
    </div>
  )
}

export default FilterSection
