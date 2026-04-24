import { Navigate, Outlet } from "react-router-dom"
import { useUserProfile } from "@features/dashboard/hook/useUserProfile"

import { useDispatch } from "react-redux"
import { updateProfile } from "../app/currentUserSlice"
import { useEffect } from "react"

const ProtectedRoute = ({ allowedRoles }) => {
    const { userProfile, loading } = useUserProfile()
    const dispatch = useDispatch()

    useEffect(() => {
        if (userProfile) {
            dispatch(updateProfile(userProfile))
        }
    }, [userProfile, dispatch])


    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!userProfile) {
        return <Navigate to="/signin" replace />
    }

    if (allowedRoles && !allowedRoles.includes(userProfile.role)) {
        return <Navigate to="/unauthorized" replace />
    }

    return <Outlet />
}

export default ProtectedRoute
