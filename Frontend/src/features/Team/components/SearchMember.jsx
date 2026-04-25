import React from 'react'
import { Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { setUserSearch } from '@app/currentUserSlice';

const SearchMember = () => {
    const dispatch = useDispatch();
    const userSearch = useSelector(state => state.currentUser.userSearch);


    return (
        <div className='flex items-center border border-border px-3 rounded gap-2'>
            <Search size="16" />
            <input
                type="text"
                className='outline-none py-1.5 w-90 px-1.5 placeholder:font-medium font-medium'
                placeholder='Search Project'
                onChange={(e) => dispatch(setUserSearch(e.target.value))}
                value={userSearch}
            />
        </div>
    )
}

export default SearchMember
