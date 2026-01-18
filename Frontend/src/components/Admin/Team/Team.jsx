import React, { useState } from 'react'
import Greeting from '../Dashboard/Greeting'
import TopSection from './TopSection'
import TeamList from './TeamList'
import EditMember from './EditMember'

function Team() {
  const [open, setOpen] = useState(false)
  return (
    <div className='bg-white text-black rounded-lg pb-3 shadow h-full'>
      <Greeting />
      <TopSection setOpen={setOpen} />
      {
        open ? <EditMember setOpen={setOpen} /> : null
      }
      <TeamList />
    </div>
  )
}

export default Team
