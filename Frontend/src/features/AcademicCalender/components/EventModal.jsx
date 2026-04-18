import React, { useEffect, useState } from 'react';
import { X, Calendar, Flag, Plus, List, Trash2, AlertTriangle } from 'lucide-react';

function EventModal({ isOpen, onClose, selectedDate, events = [], onSaveEvent, onDeleteEvent }) {
    const [activeTab, setActiveTab] = useState('list'); // 'list' or 'add'
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [color, setColor] = useState('bg-amber-500');
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    useEffect(() => {
        if (isOpen) {
            setActiveTab(events.length > 0 ? 'list' : 'add');
            document.body.style.overflow = 'hidden';
            setDeleteConfirmId(null);
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen, events.length]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onSaveEvent({
            id: Date.now().toString(),
            title,
            description,
            priority,
            color,
        });

        setTitle('');
        setDescription('');
        setActiveTab('list');
    };

    const handleDeleteClick = (id) => {
        setDeleteConfirmId(id);
    };

    const confirmDelete = () => {
        if (deleteConfirmId) {
            onDeleteEvent(deleteConfirmId);
            setDeleteConfirmId(null);
        }
    };

    const formattedDate = selectedDate ? selectedDate.toLocaleDateString('default', {
        weekday: 'short',
        month: 'long',
        day: 'numeric'
    }) : '';

    const priorities = [
        { name: 'low', label: 'Low', color: 'bg-emerald-500' },
        { name: 'medium', label: 'Medium', color: 'bg-amber-500' },
        { name: 'high', label: 'High', color: 'bg-red-500' },
    ];

    return (
        <div 
            onClick={onClose}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-950/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-border transform animate-in zoom-in-95 duration-200">
                
                {/* Deletion Confirmation Overlay - Covers entire modal */}
                {deleteConfirmId && (
                    <div className="absolute inset-0 z-[110] bg-card/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-14 h-14 bg-red-100 rounded-3xl flex items-center justify-center text-red-600 mb-4 shadow-inner">
                            <AlertTriangle size={28} />
                        </div>
                        <h4 className="text-lg font-bold text-foreground">Delete this note?</h4>
                        <p className="text-sm text-muted-foreground mt-2 max-w-[240px]">This action is permanent and cannot be reversed.</p>
                        <div className="flex gap-3 mt-8 w-full max-w-[280px]">
                            <button 
                                onClick={() => setDeleteConfirmId(null)}
                                className="flex-1 py-3 rounded-xl text-xs font-bold bg-muted text-foreground hover:bg-border transition-all active:scale-95"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmDelete}
                                className="flex-1 py-3 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition-all shadow-lg shadow-red-500/30 active:scale-95"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="relative p-6 bg-muted/30 border-b border-border">

                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Schedule for</p>
                            <h3 className="text-xl font-bold text-foreground">{formattedDate}</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-card rounded-xl transition-all text-muted-foreground hover:text-foreground"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 p-1 bg-muted rounded-xl mt-6">
                        <button 
                            onClick={() => setActiveTab('list')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'list' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <List size={14} /> My Notes
                        </button>
                        <button 
                            onClick={() => setActiveTab('add')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'add' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <Plus size={14} /> Add Note
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    {activeTab === 'list' ? (
                        <div className="p-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                            {events.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center text-muted-foreground/30 mb-4">
                                        <Calendar size={24} />
                                    </div>
                                    <p className="text-sm font-bold text-foreground">No notes for this day</p>
                                    <p className="text-xs text-muted-foreground mt-1">Keep track of important schedules.</p>
                                    <button 
                                        onClick={() => setActiveTab('add')}
                                        className="mt-4 text-xs font-bold text-primary hover:underline"
                                    >
                                        Add your first note
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {events.map(event => (
                                        <div key={event.id} className="group relative flex gap-4 p-4 rounded-xl bg-muted/30 border border-transparent hover:border-border hover:bg-muted/50 transition-all cursor-default overflow-hidden">
                                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${event.color || 'bg-amber-500'}`} />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-bold text-sm text-foreground">{event.title}</h4>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${event.priority === 'high' ? 'bg-red-100 text-red-600' : event.priority === 'low' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                                            {event.priority || 'Medium'}
                                                        </div>
                                                        <button 
                                                            onClick={() => handleDeleteClick(event.id)}
                                                            className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                                {event.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{event.description}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Exam Submission Deadline"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium"
                                    required
                                    autoFocus
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1 flex items-center gap-1.5"><Flag size={10} /> Priority</label>
                                <div className="flex gap-2 p-1 bg-muted rounded-xl border border-border">
                                    {priorities.map((p) => (
                                        <button
                                            key={p.name}
                                            type="button"
                                            onClick={() => { setPriority(p.name); setColor(p.color); }}
                                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${priority === p.name ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                                        >
                                            {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Additional Notes</label>
                                <textarea
                                    placeholder="Add any specific details here..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl focus:border-primary outline-none transition-all text-sm font-medium resize-none h-24 custom-scrollbar"
                                />
                            </div>

                            <div className="pt-2 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('list')}
                                    className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-muted-foreground hover:bg-muted transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-[2] py-3 px-4 bg-stone-900 text-white rounded-xl font-bold text-xs shadow-lg active:scale-95 transition-all"
                                >
                                    Save Note
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EventModal;
