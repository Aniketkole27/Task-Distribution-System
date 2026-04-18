import Sidebar from '@features/Sidebar/Sidebar'
import Dashboard from "@features/Dashboard/Dashboard"
import Projects from '@features/Projects/Projects'
import Team from '@features/Team/Team'
import Todos from '@features/Todos/Todos'
import Settings from '@features/Settings/Settings'
import { Calendar } from 'lucide-react'
import AcademicCalender from '@features/AcademicCalender/AcademicCalender'
import ProjectDetails from '../features/Projects/ProjectDetails';
import { updateProfile, setAllUsers } from '../app/currentUserSlice';
import { useUserProfile } from '@features/Dashboard/hook/useUserProfile';
import { useProjects } from "../features/Dashboard/hook/useProjects"
import { setData } from '../app/projectDataSlice'
import { useProjectTask } from '../features/Projects/hook/useProjectTask';
import { useGetAllUsers } from '../features/Dashboard/hook/useGetAllUsers';


import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from "react-router-dom";

export {
    Sidebar,
    Dashboard,
    Projects,
    Team,
    Todos,
    Settings,
    Calendar,
    AcademicCalender,
    ProjectDetails,
    useUserProfile,
    updateProfile,
    useDispatch,
    Routes,
    Route,
    Navigate,
    useProjects,
    setData,
    useProjectTask,
    setAllUsers,
    useGetAllUsers
}