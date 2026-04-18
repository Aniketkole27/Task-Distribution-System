import { MoreHorizontal } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSelectedMemberId, setDetailsSidebarOpen } from '@app/teamSlice'


const PrintList = ({ name, email, id }) => {

    const dispatch = useDispatch();

    const handleOpenSidebar = (e) => {
        e.stopPropagation();
        dispatch(setSelectedMemberId(id));
        dispatch(setDetailsSidebarOpen(true));
    };

    return (
        <>
            <div
                className='px-4 py-2 mb-1 border flex items-center justify-between rounded border-border hover:bg-muted/30 transition-colors group cursor-pointer'
                onClick={handleOpenSidebar}
            >
                <div className='space-y-1'>
                    <p className='text-sm text-foreground font-semibold group-hover:text-primary transition-colors'>{name}</p>
                    <p className='text-xs text-muted-foreground'>{email}</p>
                </div>
                <button
                    onClick={handleOpenSidebar}
                    className='p-1.5 rounded-full transition-all hover:bg-muted active:scale-90 text-muted-foreground'>
                    <MoreHorizontal size={14} />
                </button>
            </div>
        </>
    )
}

export default PrintList
