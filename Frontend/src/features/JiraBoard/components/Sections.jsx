import SectionCard from "./SectionCard"
import sectionsData from "../../../../public/data.json"

const Sections = () => {
    const sections = sectionsData;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
                <SectionCard key={index} title={section.title} tasks={section.tasks} />
            ))}
        </div>
    )
}

export default Sections