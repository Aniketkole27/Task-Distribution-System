import React from 'react'
import { Search } from 'lucide-react'


const SearchMember = () => {
    return (
        <div className='flex items-center border border-stone-400 px-3 rounded gap-2'>
            <Search size="16" />
            <input
                type="text"
                className='outline-none py-1.5 w-90 px-1.5 placeholder:font-medium font-medium'
                placeholder='Search Project'
            />
        </div>
    )
}

export default SearchMember
