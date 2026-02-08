import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Search } from 'lucide-react'
import { setProjectSearch } from '../app/projectSlice'


const SearchProject = () => {
    const dispatch = useDispatch()
    const searchResult = useSelector((state) => state.project.projectSearch)
    return (
        <div className='flex items-center border border-stone-400 px-3 rounded gap-2'>
            <Search size="16" />
            <input
                value={searchResult}
                onChange={(e) => dispatch(setProjectSearch(e.target.value))}
                type="text"
                className='outline-none py-1.5 w-90 px-1.5 placeholder:font-medium font-medium'
                placeholder='Search Project'
            />
        </div>
    )
}

export default SearchProject
