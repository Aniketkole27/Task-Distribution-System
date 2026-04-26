import Greeting from "../../shared/components/Greeting"
import StatsCards from "./components/StatsCards"
import TaskProgress from "./components/TaskProgress"
import RecentTasks from "./components/RecentTasks"
import dashboardData from "../../../public/data.json"

const UserDashboard = () => {
    // Flatten all tasks and inject their status based on the section title
    const allTasks = dashboardData.reduce((acc, section) => {
        const tasksWithStatus = section.tasks.map(task => ({
            ...task,
            status: section.title
        }));
        return [...acc, ...tasksWithStatus];
    }, []);

    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(t => t.status === "Done").length;
    const inProgressTasks = allTasks.filter(t => t.status === "In Progress").length;

    // Calculate overdue (due date before today)
    const today = new Date();
    // Reset time for accurate date comparison
    today.setHours(0, 0, 0, 0);

    const overdueTasks = allTasks.filter(t => {
        if (t.status === "Done") return false;
        const dueDate = new Date(t.dueDate);
        return dueDate < today;
    }).length;

    const stats = {
        total: totalTasks,
        completed: completedTasks,
        inProgress: inProgressTasks,
        overdue: overdueTasks
    };

    // Sort by due date for recent tasks demo
    const recentTasks = [...allTasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).slice(0, 4);

    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
            <Greeting />

            <div className="w-full -mt-5">
                <StatsCards statsData={stats} />
            </div>

            <div className="flex flex-col lg:flex-row gap-6 w-full">
                <TaskProgress total={totalTasks} completed={completedTasks} />
                <RecentTasks tasks={recentTasks} />
            </div>
        </div>
    )
}

export default UserDashboard