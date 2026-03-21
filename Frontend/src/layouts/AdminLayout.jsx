import React, { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from '@features/Sidebar/Sidebar'
import Dashboard from "@features/Dashboard/Dashboard"
import Projects from '@features/Projects/Projects'
import Team from '@features/Team/Team'
import Todos from '@features/Todos/Todos'
import { Calendar, Settings } from 'lucide-react'
import AcademicCalender from '@features/AcademicCalender/AcademicCalender'
import ProjectDetails from '../features/Projects/ProjectDetails';

const AdminLayout = () => {
  return (
    <main className='grid gap-4 p-4 grid-cols-[200px_1fr]' >
      <Sidebar />

      <Routes>
        {/* <Route path="/" element={<Navigate to="dashboard" />} /> */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
        <Route path="team" element={<Team />} />
        <Route path="todos" element={<Todos />} />
        <Route path="academic-calendar" element={<AcademicCalender />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </main >
  )
}

export default AdminLayout
