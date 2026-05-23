import SectionCard from "./SectionCard"
// import sectionsData from "../../../../public/data.json"
import { fetchTaskByUser } from "../../../app/jiraSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Sections = () => {
    // const sections = sectionsData;
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.currentUser);
    const { tasks, filters } = useSelector((state) => state.jira);

    useEffect(() => {
        if (!profile?._id) return;

        let timeoutId;
        let isMounted = true;

        const fetchData = async () => {
            if (!isMounted) return;

            try {
                dispatch(fetchTaskByUser({ userId: profile._id }));
            } finally {
                if (isMounted) {
                    // Fetch every 5 seconds, waiting for previous request to finish
                    timeoutId = setTimeout(fetchData, 5000);
                }
            }
        };

        fetchData(); // Initial fetch

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [dispatch, profile?._id])

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = !filters.search ||
            task.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
            task.description?.toLowerCase().includes(filters.search.toLowerCase());
        const matchesProject = !filters.project || task.project?.name === filters.project;
        const assigneeName = task.assignedBy?.name || (typeof task.assignedBy === 'string' ? task.assignedBy : null);
        const matchesAssignee = !filters.assignedBy || assigneeName === filters.assignedBy;
        const matchesPriority = !filters.priority || task.priority === filters.priority;
        return matchesSearch && matchesProject && matchesAssignee && matchesPriority;
    });

    const sections = [{
        title: "Todo",
        tasks: filteredTasks.filter(task => task.status === 'todo')
    }, {
        title: "In Progress",
        tasks: filteredTasks.filter(task => task.status === 'in-progress' || task.status === 'rejected')
    }, {
        title: "Review",
        tasks: filteredTasks.filter(task => task.status === 'submitted' || task.status === 'under-review')
    }, {
        title: "Done",
        tasks: filteredTasks.filter(task => task.status === 'approved')
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