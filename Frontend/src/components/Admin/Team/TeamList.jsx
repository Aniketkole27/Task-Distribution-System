import { useState } from 'react'
import DisplayMembers from './DisplayMembers'

const TeamList = () => {
    return (
        <div className='px-4 mt-4 pb-4 mx-4 border border-stone-200 rounded'>
            <DisplayMembers role="admin" />
            <DisplayMembers role="sub-admin" />
            <DisplayMembers role="user" />
        </div>
    )
}

export default TeamList

