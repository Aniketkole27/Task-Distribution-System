import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

function EventModal({ isOpen, onClose, selectedDate, events = [], onSaveEvent }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('bg-blue-100 text-blue-800');

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onSaveEvent({
            id: Date.now().toString(),
            title,
            description,
            color,
        });

        setTitle('');
        setDescription('');
        // Optionally close modal after save: onClose();
    };

    const formattedDate = selectedDate ? selectedDate.toLocaleDateString('default', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : '';

    const colors = [
        { value: 'bg-blue-100 text-blue-800', label: 'Blue' },
        { value: 'bg-green-100 text-green-800', label: 'Green' },
        { value: 'bg-red-100 text-red-800', label: 'Red' },
        { value: 'bg-yellow-100 text-yellow-800', label: 'Yellow' },
        { value: 'bg-purple-100 text-purple-800', label: 'Purple' },
    ];


    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Events for {formattedDate}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4 bg-gray-50 max-h-48 overflow-y-auto">
                    {events.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center py-4">No events for this day.</p>
                    ) : (
                        <div className="space-y-2">
                            {events.map(event => (
                                <div key={event.id} className={`p-3 rounded-md ${event.color} border border-white/20`}>
                                    <h4 className="font-medium text-sm">{event.title}</h4>
                                    {event.description && <p className="text-xs mt-1 opacity-80">{event.description}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className=" p-4 border-t">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Event/Note</h4>
                    <div className="space-y-3">
                        <div>
                            <input
                                type="text"
                                placeholder="Event title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Description (optional)"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none h-20 custom-scrollbar"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
                            <div className="flex space-x-2">
                                {colors.map(c => (
                                    <button
                                        key={c.value}
                                        type="button"
                                        onClick={() => setColor(c.value)}
                                        className={`w-6 h-6 rounded-full border-2 ${color === c.value ? 'border-gray-900' : 'border-transparent'} ${c.value.split(' ')[0]}`}
                                        title={c.label}
                                    />
                                ))}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-medium transition-colors"
                        >
                            Save Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EventModal;
