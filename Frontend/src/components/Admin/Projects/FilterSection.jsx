import React, { useState } from 'react'
import FilterButton from './FilterButton'
import SearchProject from './SearchProject'
import { useDispatch } from 'react-redux'
import { setProject } from '../app/currentTabSlice'

const FilterSection = ({ setOpen, projectList }) => {
  const dispatch = useDispatch()
  return (
    <div className='p-4 mt-6 mx-4 border rounded flex items-center justify-between border-stone-200'>
      <FilterButton />
      <SearchProject />
      <button type="button" onClick={() => setOpen(true)} className='cursor-pointer text-shadow-xs border border-stone-300  px-4 py-2 rounded font-medium text-black shadow hover:border-blue-300 hover:bg-blue-100  h hover:text-blue-500 active:bg-blue-200 transition-colors duration-300'>
        Create Project
      </button>
    </div>
  )
}

export default FilterSection
