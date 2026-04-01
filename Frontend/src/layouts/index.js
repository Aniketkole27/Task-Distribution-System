import Sidebar from '@features/Sidebar/Sidebar'
import Dashboard from "@features/Dashboard/Dashboard"
import Projects from '@features/Projects/Projects'
import Team from '@features/Team/Team'
import Todos from '@features/Todos/Todos'
import { Calendar, Settings } from 'lucide-react'
import AcademicCalender from '@features/AcademicCalender/AcademicCalender'
import ProjectDetails from '../features/Projects/ProjectDetails';
import { updateProfile } from '../app/currentUserSlice';
import { useUserProfile } from '@features/Dashboard/hook/useUserProfile';

import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from "react-router-dom";

export {
    Sidebar,
    Dashboard,
    Projects,
    Team,
    Todos,
    Calendar,
    Settings,
    AcademicCalender,
    ProjectDetails,
    useUserProfile,
    updateProfile,
    useDispatch,
    Routes,
    Route,
    Navigate,
}