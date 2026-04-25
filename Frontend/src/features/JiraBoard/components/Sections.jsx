import SectionCard from "./SectionCard"

const Sections = () => {
    const sections = [
        { title: "Todo", tasks: [1, 2, 3, 4, 6] },
        { title: "In Progress", tasks: [1, 2, 3] },
        { title: "Review", tasks: [1, 2] },
        { title: "Done", tasks: [1, 2, 3, 4] }
    ]

    return (
        <div className="grid grid-cols-4 gap-4">
            {sections.map((section, index) => (
                <SectionCard key={index} title={section.title} tasks={section.tasks} />
            ))}
        </div>
    )
}

export default Sections