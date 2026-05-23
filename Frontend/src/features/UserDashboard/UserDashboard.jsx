import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Greeting from "../../shared/components/Greeting"
import StatsCards from "./components/StatsCards"
import TaskProgress from "./components/TaskProgress"
import RecentTasks from "./components/RecentTasks"
import { fetchTaskByUser } from "../../app/jiraSlice";

const UserDashboard = () => {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.currentUser.profile);
    const { tasks: allTasks = [], loading } = useSelector((state) => state.jira);

    useEffect(() => {
        if (userProfile?._id) {
            dispatch(fetchTaskByUser({ userId: userProfile._id }));
        }
    }, [dispatch, userProfile]);

    const totalTasks = allTasks.length;
    // Map backend statuses to dashboard metrics
    const completedTasks = allTasks.filter(t => t.status === "approved" || t.status === "done").length;
    const inProgressTasks = allTasks.filter(t => t.status === "in-progress" || t.status === "under-review").length;

    // Calculate overdue (due date before today)
    const today = new Date();
    // Reset time for accurate date comparison
    today.setHours(0, 0, 0, 0);

    const overdueTasks = allTasks.filter(t => {
        if (t.status === "approved" || t.status === "done") return false;
        if (!t.dueDate) return false;
        const dueDate = new Date(t.dueDate);
        return dueDate < today;
    }).length;

    const stats = {
        total: totalTasks,
        completed: completedTasks,
        inProgress: inProgressTasks,
        overdue: overdueTasks
    };

    const recentTasks = [...allTasks]
        .filter(t => t.dueDate)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 4);

    return (
        <div className="flex flex-col gap-6 bg-card text-foreground rounded-2xl pb-6 px-4 pt-4 h-full overflow-auto">
            <Greeting />

            <div className="w-full">
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