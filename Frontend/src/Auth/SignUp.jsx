import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        department: '',
        password: '',
        confirmPassword: '',
        role: ''
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    }

    const validateForm = () => {
        const newErrors = {}
        if (!formData.name.trim()) newErrors.name = 'Full name is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
        if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required'
        if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile number must be 10 digits'
        if (!formData.department.trim()) newErrors.department = 'Department name is required'
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
        if (!formData.role) newErrors.role = 'Role is required'
        else if (!['admin', 'sub-admin', 'user'].includes(formData.role)) newErrors.role = 'Invalid role selected'

        setErrors(newErrors)
        // console.log('Validation errors:', Object.keys(newErrors))
        return Object.keys(newErrors).length === 0
    }



    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setLoading(true)
        setApiError('')
        console.log('Form data to submit:', formData)

        try {
            const response = await axios.post('http://localhost:8000/api/auth/signup', formData)
            console.log('API response:', response.data)
            const data = response.data
            document.cookie = `token=${data.token}; path=/; secure; samesite=strict`
            // navigate('admin/dashboard') // relative path -> mean navigate to admin/dashboard from current path (signup)
            navigate('/signin') // absolute path -> mean navigate to admin/dashboard from root path

        } catch (error) {
            setApiError(error.message || 'Sign up failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow-md w-full max-w-2xl'>
                <h1 className='text-3xl font-bold pb-2 text-center text-gray-800'>Create Account</h1>
                <p className='text-gray-600 text-center mb-6'>Join us to get started</p>
                {apiError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{apiError}</div>}
                <div className='flex gap-3'>
                    <div className='flex-1'>
                        <label htmlFor="fullName" className='font-semibold mt-4 mb-2 block text-gray-800'>Full Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className='border mb-2 py-2 px-3 outline-none rounded suggestion w-full' />
                        {errors.name && <span className='text-red-500 text-sm mb-3 block'>{errors.name}</span>}
                    </div>
                    <div className='flex-1'>
                        <label htmlFor="email" className='font-semibold mt-4 mb-2 block text-gray-800'>Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className='border mb-2 py-2 px-3 outline-none rounded suggestion w-full' />
                        {errors.email && <span className='text-red-500 text-sm mb-3 block'>{errors.email}</span>}
                    </div>
                </div>

                <div className='flex gap-3'>
                    <div className='flex-1'>
                        <label htmlFor="mobile" className='font-semibold mt-4 mb-2 block text-gray-800'>Mobile Number:</label>
                        <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className='border mb-2 py-2 px-3 outline-none rounded  w-full' />
                        {errors.mobile && <span className='text-red-500 text-sm mb-3 block'>{errors.mobile}</span>}
                    </div>
                    <div className='flex-1'>
                        <label htmlFor="department" className='font-semibold mt-4 mb-2 block text-gray-800'>Department Name:</label>
                        <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} className='border mb-2 py-2 px-3 outline-none rounded suggestion w-full' />
                        {errors.department && <span className='text-red-500 text-sm mb-3 block'>{errors.department}</span>}
                    </div>
                </div>

                <div className='flex gap-3'>
                    <div className='flex-1'>
                        <label htmlFor="password" className='font-semibold mt-4 mb-2 block text-gray-800'>Password:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className='border mb-2 py-2 px-3 outline-none rounded suggestion w-full' />
                        {errors.password && <span className='text-red-500 text-sm mb-3 block'>{errors.password}</span>}
                    </div>
                    <div className='flex-1'>
                        <label htmlFor="confirmPassword" className='font-semibold mt-4 mb-2 block text-gray-800'>Confirm Password:</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className='border mb-2 py-2 px-3 outline-none rounded suggestion w-full' />
                        {errors.confirmPassword && <span className='text-red-500 text-sm mb-3 block'>{errors.confirmPassword}</span>}
                    </div>
                </div>

                <div className='flex gap-3'>
                    <div className='flex-1'>
                        <label htmlFor="password" className='font-semibold mt-4 mb-2 block text-gray-800'>Assign Role:</label>
                        <select id="role" name="role" value={formData.role} onChange={handleChange} className='border mb-2 py-2 px-3 outline-none rounded suggestion w-full'>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="sub-admin">Sub-Admin</option>
                            <option value="user">User</option>
                        </select>

                        {errors.role && <span className='text-red-500 text-sm mb-3 block'>{errors.role}</span>}
                    </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition">
                    {loading ? 'Creating account...' : 'Sign Up'}
                </button>

                <div className='text-center mt-6'>
                    <p className='text-gray-700'>Already have an account? <span onClick={() => navigate("/signin")} className='text-blue-600 cursor-pointer font-semibold hover:underline'>Sign In</span></p>
                </div>
            </form>
        </div>
    )
}

export default SignUp   