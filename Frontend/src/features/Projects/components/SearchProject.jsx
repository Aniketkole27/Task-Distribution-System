import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Search } from 'lucide-react'
import { setProjectSearch } from '@app/projectDataSlice'


const SearchProject = () => {
    const dispatch = useDispatch()
    const searchResult = useSelector((state) => state.projectData.projectSearch)
    return (
        <div className='flex items-center bg-muted/30 border border-border px-3.5 rounded-xl gap-2.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 transition-all duration-200'>
            <Search size={16} className="text-muted-foreground" />
            <input
                value={searchResult}
                onChange={(e) => dispatch(setProjectSearch(e.target.value))}
                type="text"
                className='outline-none py-2 text-sm w-64 placeholder:text-muted-foreground font-medium bg-transparent'
                placeholder='Search projects...'
            />
        </div>
    )
}

export default SearchProject
