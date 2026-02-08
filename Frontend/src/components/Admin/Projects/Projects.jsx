import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Greeting from '../Dashboard/Greeting'
import ProjectData from './ProjectData'
import FilterSection from './FilterSection'
import TotalProjects from './TotalProjects'
import CreateProject from './CreateProject'


const Projects = () => {
  const subCurrent = useSelector((state) => state.currentTab.subValue)
  const [open, setOpen] = useState(false)

  const projectList = [
    {
      id: "proj-001",
      name: "Task Distribution System",
      description: "A web-based system to assign, track, and manage tasks across teams with role-based access control.",
      startDate: "10-2-2026",
      dueDate: "2026-01-20",
      status: "in-progress",
      priority: "high",

      teamMembers: [
        { id: "user-001", name: "Aniket Kole", role: "user", mobile: "8766726367", joinDate: "2025-12-12" },
        { id: "user-002", name: "Iron Man", role: "user", mobile: "8766734536", joinDate: "2024-12-12" },
        { id: "user-003", name: "Picky Blander", role: "user", mobile: "8766712367", joinDate: "2025-12-12" }
      ],

      tasks: [
        { id: "task-001", title: "Design UI", priority: "high", description: "Create dashboard layout", assignedTo: "Aniket Kole", assignedBy: "admin", status: "completed" },
        { id: "task-002", title: "Setup Backend", priority: "medium", description: "Configure Express server", assignedTo: "Iron Man", assignedBy: "admin", status: "in-review" }
      ]
    },

    {
      id: "proj-002",
      name: "E-Commerce Platform",
      description: "Full-stack e-commerce platform including product management, cart system, and payment integration.",
      startDate: "10-2-2026",
      dueDate: "2026-03-15",
      status: "completed",
      priority: "high",

      teamMembers: [
        { id: "user-004", name: "Bruce Wayne", role: "manager", mobile: "9876543210", joinDate: "2024-06-10" },
        { id: "user-005", name: "Peter Parker", role: "developer", mobile: "9876541230", joinDate: "2025-01-05" }
      ],

      tasks: [
        { id: "task-003", title: "Product API", priority: "high", description: "Build product CRUD APIs", assignedTo: "Peter Parker", assignedBy: "Bruce Wayne", status: "completed" }
      ]
    },

    {
      id: "proj-003",
      name: "CRM System",
      description: "Customer Relationship Management system for tracking leads, sales pipelines, and performance analytics.",
      startDate: "10-2-2026",
      dueDate: "2026-05-10",
      status: "failed",
      priority: "medium",

      teamMembers: [
        { id: "user-006", name: "Clark Kent", role: "developer", mobile: "9123456780", joinDate: "2024-09-15" },
        { id: "user-007", name: "Diana Prince", role: "analyst", mobile: "9234567810", joinDate: "2025-02-20" }
      ],

      tasks: [
        { id: "task-004", title: "Lead Module", priority: "medium", description: "Develop lead tracking", assignedTo: "Clark Kent", assignedBy: "Diana Prince", status: "failed" }
      ]
    },

    {
      id: "proj-004",
      name: "Inventory Management System",
      description: "Inventory and stock tracking system with warehouse and supplier management features.",
      startDate: "2026-04-01",
      dueDate: "2026-04-01",
      status: "in-progress",
      priority: "medium",

      teamMembers: [
        { id: "user-008", name: "Tony Stark", role: "architect", mobile: "9988776655", joinDate: "2024-08-18" },
        { id: "user-009", name: "Steve Rogers", role: "developer", mobile: "8877665544", joinDate: "2025-03-10" }
      ],

      tasks: [
        { id: "task-005", title: "Database Schema", priority: "high", description: "Design inventory schema", assignedTo: "Tony Stark", assignedBy: "admin", status: "in-review" }
      ]
    },

    {
      id: "proj-005",
      name: "Mobile Banking App",
      description: "Secure mobile banking application supporting authentication, transactions, and account management.",
      startDate: "2026-06-30",
      dueDate: "2026-06-30",
      status: "completed",
      priority: "high",

      teamMembers: [
        { id: "user-010", name: "Natasha Romanoff", role: "developer", mobile: "9090909090", joinDate: "2024-11-11" },
        { id: "user-011", name: "Wanda Maximoff", role: "tester", mobile: "8080808080", joinDate: "2025-01-25" }
      ],

      tasks: [
        { id: "task-006", title: "Authentication Module", priority: "high", description: "Implement JWT login", assignedTo: "Natasha Romanoff", assignedBy: "admin", status: "completed" }
      ]
    }
  ];

  return (
    <div className='bg-white text-black rounded-lg pb-3 shadow h-full'>
      <Greeting />
      <ProjectData />
      <FilterSection setOpen={setOpen} />
      <TotalProjects projectList={projectList} />
      {
        open ? <CreateProject open={open} setOpen={setOpen} /> : null
      }
    </div>
  )

  // switch (subCurrent) {
  //   case "projects": {
  //   }
  //     break;

  //   case 'createProject': {
  //     return (
  //       <div className='bg-white text-black rounded-lg pb-3 shadow h-full'>
  //         <Greeting />
  //         <ProjectData />
  //         <FilterSection />
  //         <TotalProjects /> 
  //       </div>
  //     )
  //   }

  //   default:
  //     break;
  // }
}

export default Projects
