import React from 'react'
import SearchProject from '../Projects/SearchProject'

const TopSection = ({setOpen}) => {
  return (
    <div className='p-4 mt-4 mx-4 border border-stone-200 rounded'>
      <div className='flex items-center justify-between'>
        <SearchProject />
        <button type="button" onClick={() => setOpen(true)} className='cursor-pointer text-shadow-xs border border-stone-300  px-4 py-2 rounded font-medium text-black shadow hover:border-blue-300 hover:bg-blue-100  h hover:text-blue-500 active:bg-blue-200 transition-colors duration-300'>
          New Member
        </button>
      </div>
      {/* <h2>Create</h2> */}
    </div>
  )
}

export default TopSection
