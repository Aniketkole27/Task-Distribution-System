import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import {
  Sidebar, Dashboard, Projects, Team, Todos, Settings, AcademicCalender, ProjectDetails,
  useUserProfile, updateProfile, useDispatch
} from './index'

const AdminLayout = () => {
  const dispatch = useDispatch();
  const { userProfile } = useUserProfile()

  useEffect(() => {
    if (userProfile) {
      dispatch(updateProfile(userProfile))
    }
  }, [userProfile, dispatch])


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
