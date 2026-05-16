import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useProjects } from '@features/dashboard/hook/useProjects'
import { setAllUsers, updateProfile } from './currentUserSlice'
import { setData } from "./projectDataSlice"
import { useGetAllUsers } from '@features/dashboard/hook/useGetAllUsers'

const AppInitializer = ({ children }) => {
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.currentUser);
    const isAdmin = profile?.role === 'admin' || profile?.role === 'sub-admin';

    const { allProjects } = useProjects(isAdmin)
    const { users } = useGetAllUsers(isAdmin)



    useEffect(() => {

        if (users?.length) {
            dispatch(setAllUsers(users));
        }
        if (allProjects?.length) {
            dispatch(setData(allProjects));
        }
    }, [users, allProjects, dispatch]);

    return children
}

export default AppInitializer
