import { MoreHorizontal } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import KebabMenu from './KebabMenu'
import { setOpenMenu } from '../app/teamSlice'


const PrintList = ({ name, email, id }) => {

    const dispatch = useDispatch();
    const openMenu = useSelector((state) => state.team.openMenu)

    useEffect(() => {
        const close = () => dispatch(setOpenMenu(null));
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, []);

    const handleClick = (label, title) => {
        alert(`Clicked on ${title}`)
    }

    const isOpen = openMenu === id;

    return (
        <>
            <div
                className='px-4 py-2 mb-1 border flex items-center justify-between rounded border-stone-300'>
                <div className='space-y-1'>
                    <p className='text-sm text-black font-semibold'>{name}</p>
                    <p className='text-xs text-stone-500'>{email}</p>
                </div>
                <p
                    onClick={(e) => {
                        dispatch(setOpenMenu(isOpen ? null : id))
                        e.stopPropagation()
                    }}
                    className='text-xs capitalize font-medium cursor-pointer hover:bg-stone-200 active:bg-stone-300 p-1.5 rounded-full'>
                    <MoreHorizontal size={14} />
                </p>
            </div>
            {isOpen && <KebabMenu handleClick={handleClick} />}
        </>
    )
}

export default PrintList
