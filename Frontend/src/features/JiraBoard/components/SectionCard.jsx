import { useState } from "react"
import TaskCard from "./TaskCard"
import { ChevronDown } from "lucide-react"

const SectionCard = ({ title, tasks = [] }) => {
    const [showCard, setShowCard] = useState(true)

    // Unified styling using the design system
    const sectionConfig = {
        "Todo": { dot: "bg-muted-foreground", accent: "border-muted" },
        "In Progress": { dot: "bg-blue-500", accent: "border-blue-500/20" },
        "Review": { dot: "bg-amber-500", accent: "border-amber-500/20" },
        "Done": { dot: "bg-emerald-500", accent: "border-emerald-500/20" }
    };

    const config = sectionConfig[title] || sectionConfig["Todo"];

    return (
        <div className={`border border-border bg-card rounded-2xl p-4 h-full min-h-[calc(100vh-250px)] flex flex-col shadow-sm`}>
            <div className="flex items-center justify-between mb-5 px-1">
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                    <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{title}</h3>
                </div>

                <div className="flex items-center gap-3">
                    <div className="px-2 py-0.5 rounded-lg bg-muted border border-border text-[10px] font-bold text-muted-foreground">
                        {tasks.length}
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowCard((prev) => !prev)}
                        className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-all active:scale-95"
                    >
                        <ChevronDown
                            size={14}
                            className={`transition-transform duration-300 ${showCard ? "" : "-rotate-180"}`}
                        />
                    </button>
                </div>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pr-1 scrollbar-hide">
                {showCard && tasks.map((task) => (
                    <TaskCard key={task.id} task={task} status={title} />
                ))}
            </div>
        </div>
    )
}

export default SectionCard