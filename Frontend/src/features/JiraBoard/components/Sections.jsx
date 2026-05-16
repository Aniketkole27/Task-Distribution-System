import SectionCard from "./SectionCard"
import sectionsData from "../../../../public/data.json"
import { fetchTaskByUser } from "../../../app/jiraSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Sections = () => {
    // const sections = sectionsData;
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.currentUser);
    const { tasks } = useSelector((state) => state.jira);

    useEffect(() => {
        if (!profile?._id) return;

        const fetchData = () => {
            dispatch(fetchTaskByUser({ userId: profile._id }));
        };

        fetchData(); // Initial fetch
        const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds

        return () => clearInterval(interval);
    }, [dispatch, profile?._id])


    const sections = [{
        title: "Todo",
        tasks: tasks.filter(task => task.status === 'todo')
    }, {
        title: "In Progress",
        tasks: tasks.filter(task => task.status === 'in-progress' || task.status === 'rejected')
    }, {
        title: "Review",
        tasks: tasks.filter(task => task.status === 'submitted' || task.status === 'under-review')
    }, {
        title: "Done",
        tasks: tasks.filter(task => task.status === 'approved')
    }]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
            {sections.map((section) => (
                <SectionCard key={section.title} title={section.title} tasks={section.tasks} />
            ))}
        </div>
    )
}

export default Sections