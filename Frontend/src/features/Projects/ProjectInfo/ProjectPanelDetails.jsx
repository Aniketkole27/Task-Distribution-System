import React from 'react'

const ProjectPanelDetails = ({isOpen, setIsOpen}) => {

    return (
        <div className="relative bg-gray-100">

            {/* Button */}
            {/* <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Open Panel
            </button> */}

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 s z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Side Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-4">
                    <h2 className="text-xl font-bold">Side Panel</h2>
                    <p className="mt-2">Your content here...</p>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="mt-4 px-3 py-1 bg-red-500 text-white rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProjectPanelDetails
