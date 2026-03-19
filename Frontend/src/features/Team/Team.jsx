import React, { useState } from 'react'
import Greeting from '@shared/components/Greeting'
import TopSection from './components/TopSection'
import TeamList from './components/TeamList'
import EditMember from './components/EditMember'

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
