import TaskCard from "./TaskCard"

const SectionCard = ({ title, tasks = [] }) => {
    return (
        <div className="border border-border rounded-lg p-4 h-full min-h-[calc(100vh-200px)]">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{title}</h3>
            </div>

            <div className="space-y-2">
                {
                    tasks.map((task) => (
                        <TaskCard key={task} task={task} />
                    ))
                }
            </div>
        </div>
    )
}

export default SectionCard