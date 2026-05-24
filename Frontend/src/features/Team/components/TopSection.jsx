import React from 'react'
import SearchMember from './SearchMember'
import { useSelector } from 'react-redux'

const TopSection = ({ setOpen }) => {
  const userProfile = useSelector((state) => state.currentUser.profile)
  const isAdmin = userProfile?.role === 'admin'

  return (
    <div className='p-4 border border-border rounded-xl bg-card'>
      <div className='flex items-center justify-between'>
        <SearchMember />
        {isAdmin && (
          <button
            onClick={() => setOpen(true)}
            className="px-5 py-2.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 backdrop-blur-md rounded-full font-semibold text-sm border border-sky-500/20 hover:border-sky-500/40 shadow-lg shadow-sky-500/10 active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            New Member
          </button>
        )}
      </div>
    </div>
  )
}


export default TopSection
