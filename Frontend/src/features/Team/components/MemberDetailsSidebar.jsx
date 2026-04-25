import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Mail, Shield, Calendar, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { setDetailsSidebarOpen } from '@app/teamSlice';

const MemberDetailsSidebar = () => {
    const dispatch = useDispatch();
    const { isDetailsSidebarOpen, selectedMemberId } = useSelector(state => state.team);
    const allMembers = useSelector(state => state.currentUser.allUsers);

    const member = allMembers.find(m => m._id === selectedMemberId);

    if (!member) return null;

    const onClose = () => dispatch(setDetailsSidebarOpen(false));

    return (
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-background/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isDetailsSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${isDetailsSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='flex flex-col h-full'>
                    {/* Header */}
                    <div className='flex items-center justify-between p-6 border-b border-border'>
                        <h2 className='text-xl font-bold text-foreground'>Member Details</h2>
                        <button 
                            onClick={onClose}
                            className='p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground'
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className='flex-1 overflow-y-auto p-6 space-y-8'>
                        {/* Profile Section */}
                        <div className='flex flex-col items-center text-center space-y-4'>
                            <div className='relative'>
                                <img 
                                    src="/react.svg" 
                                    alt={member.name} 
                                    className='size-24 rounded-2xl bg-primary/10 p-4 border border-primary/20 shadow-inner'
                                />
                                <div className={`absolute -bottom-1 -right-1 size-6 rounded-full border-4 border-card flex items-center justify-center ${member.isActive ? 'bg-emerald-500' : 'bg-stone-400'}`}>
                                    {member.isActive ? <CheckCircle2 size={12} className='text-white' /> : <AlertCircle size={12} className='text-white' />}
                                </div>
                            </div>
                            <div>
                                <h3 className='text-2xl font-bold text-foreground'>{member.name}</h3>
                                <p className='text-muted-foreground font-medium uppercase tracking-wider text-xs mt-1'>{member.role}</p>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className='grid gap-6'>
                            <DetailItem 
                                icon={<Mail size={18} />} 
                                label="Email Address" 
                                value={member.email} 
                            />
                            <DetailItem 
                                icon={<Shield size={18} />} 
                                label="Access Level" 
                                value={member.role} 
                                badge
                            />
                            <DetailItem 
                                icon={<Calendar size={18} />} 
                                label="Joined Date" 
                                value="April 12, 2024" // Placeholder if not in data
                            />
                            <DetailItem 
                                icon={<User size={18} />} 
                                label="Verification Status" 
                                value={member.isActive ? "Verified" : "Pending"} 
                                status={member.isActive}
                            />
                        </div>

                        {/* Recent Activity Placeholder */}
                        <div className='pt-6 border-t border-border'>
                            <h4 className='text-sm font-bold text-foreground mb-4 uppercase tracking-tight'>Recent Projects</h4>
                            <div className='space-y-3'>
                                <div className='p-3 bg-muted/30 rounded-lg border border-border/50'>
                                    <p className='text-sm font-semibold'>Task Management System</p>
                                    <p className='text-xs text-muted-foreground'>Joined 2 days ago</p>
                                </div>
                                <div className='p-3 bg-muted/30 rounded-lg border border-border/50'>
                                    <p className='text-sm font-semibold'>Admin Dashboard Refactor</p>
                                    <p className='text-xs text-muted-foreground'>Joined 1 week ago</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className='p-6 border-t border-border bg-muted/20 flex gap-3'>
                        <button className='flex-1 py-2.5 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20'>
                            Edit Profile
                        </button>
                        <button className='flex-1 py-2.5 bg-muted text-foreground font-bold rounded-lg hover:bg-border transition-colors border border-border'>
                            Message
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MemberDetailsSidebar;

const DetailItem = ({ icon, label, value, badge, status }) => (
    <div className='flex items-start gap-4 group'>
        <div className='p-2.5 bg-muted rounded-xl text-muted-foreground group-hover:text-primary transition-colors'>
            {icon}
        </div>
        <div className='flex-1'>
            <p className='text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>{label}</p>
            {badge ? (
                <span className='inline-block mt-1 px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20'>
                    {value}
                </span>
            ) : status !== undefined ? (
                <p className={`text-sm font-semibold mt-0.5 ${status ? 'text-emerald-600' : 'text-stone-500'}`}>
                    {value}
                </p>
            ) : (
                <p className='text-sm font-semibold text-foreground mt-0.5'>{value}</p>
            )}
        </div>
    </div>
);
