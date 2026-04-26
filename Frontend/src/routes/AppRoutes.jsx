import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Projects, ProjectDetails, Team, Todos, AcademicCalender, Settings } from "../layouts/index";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import JiraDashboard from "../features/JiraBoard/JiraDashboard";
import UserDashboard from "../features/UserDashboard/UserDashboard";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="projects/:id" element={<ProjectDetails />} />
                    <Route path="team" element={<Team />} />
                    <Route path="todos" element={<Todos />} />
                    <Route path="academic-calendar" element={<AcademicCalender />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Route>

            {/* Sub-Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['sub-admin']} />}>
                <Route path="/manager" element={<AdminLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="projects/:id" element={<ProjectDetails />} />
                    <Route path="team" element={<Team />} />
                    <Route path="todos" element={<Todos />} />
                    <Route path="academic-calendar" element={<AcademicCalender />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Route>

            {/* User Routes */}
            <Route element={<ProtectedRoute allowedRoles={['user']} />}>
                <Route path="/user" element={<AdminLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<UserDashboard />} />
                    <Route path="jiraboard" element={<JiraDashboard />} />
                    <Route path="projects/:id" element={<ProjectDetails />} />
                    <Route path="todos" element={<Todos />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Route>

            {/* Base Redirects */}
            <Route path="/" element={<Navigate to="/signin" replace />} />

            {/* Error Routes */}
            <Route path="/unauthorized" element={<div className="flex items-center justify-center h-screen text-2xl font-bold">Unauthorized Access</div>} />
            <Route path="*" element={<div className="flex items-center justify-center h-screen text-2xl font-bold">404 Not Found</div>} />

        </Routes>
    )
}

export default AppRoutes
