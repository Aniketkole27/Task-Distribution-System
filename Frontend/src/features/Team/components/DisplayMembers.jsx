import { useDispatch } from 'react-redux'
import { setSelectedMemberId, setDetailsSidebarOpen } from '@app/teamSlice'

const PrintList = ({ name, email, id, active }) => {
    const dispatch = useDispatch();

    const handleOpenSidebar = (e) => {
        e.stopPropagation();
        dispatch(setSelectedMemberId(id));
        dispatch(setDetailsSidebarOpen(true));
    };

    return (
        <div
            className='group p-4 mb-3 border border-border rounded-xl flex items-center justify-between transition-all hover:shadow-md hover:border-primary/20 hover:bg-muted/30 cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300'
            onClick={handleOpenSidebar}
        >
            <div className='space-y-1'>
                <h3 className='text-sm font-semibold group-hover:text-primary transition-colors'>{name}</h3>
                <p className='text-[10px] text-muted-foreground font-medium tracking-tight'>{email}</p>
            </div>

            <div className='flex items-center gap-4'>
                <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${active ? 'text-green-600 bg-green-50 border-green-100' : 'text-stone-400 bg-stone-50 border-stone-100'}`}>
                    <div className={`w-1 h-1 rounded-full ${active ? 'bg-green-600' : 'bg-stone-400'}`} />
                    {active ? 'Active' : 'Offline'}
                </span>
            </div>
        </div>
    )
}

export default PrintList

