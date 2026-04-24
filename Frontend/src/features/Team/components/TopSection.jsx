import React from 'react'
import SearchMember from './SearchMember'
import { useSelector } from 'react-redux'

const TopSection = ({ setOpen }) => {
  const userProfile = useSelector((state) => state.currentUser.profile)
  const isAdmin = userProfile?.role === 'admin'

  return (
    <div className='p-4 mt-4 mx-4 border border-border rounded'>
      <div className='flex items-center justify-between'>
        <SearchMember />
        {isAdmin && (
          <button
            onClick={() => setOpen(true)}
            className='cursor-pointer text-shadow-xs border border-border  px-4 py-2 rounded font-medium text-foreground shadow hover:border-blue-300 hover:bg-blue-100  h hover:text-blue-500 active:bg-blue-200 transition-colors duration-300'>
            New Member
          </button>
        )}
      </div>
    </div>
  )
}


export default TopSection
