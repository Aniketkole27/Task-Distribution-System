import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

export default function SignIn() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState('')

    const validateForm = () => {
        const newErrors = {}
        if (!formData.email) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
        if (!formData.password) newErrors.password = 'Password is required'
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
        return newErrors
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = validateForm()

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setLoading(true)
        setApiError('')

        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', formData)
            console.log('API response:', response.data)
            document.cookie = `token=${response.data.token}; path=/; secure; samesite=strict`
            navigate('/admin/dashboard')
        } catch (error) {
            setApiError(error.response?.data?.message || 'Sign in failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} autoComplete="on" className="bg-background p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>

                {apiError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{apiError}</div>}

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border border-zinc-600 rounded-lg focus:outline-none ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.email && <span className="text-red-500 text-sm mt-1 block">{errors.email}</span>}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border border-zinc-600 rounded-lg focus:outline-none ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.password && <span className="text-red-500 text-sm mt-1 block">{errors.password}</span>}
                </div>

                <button type="submit" disabled={loading} className=" relative w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition">
                    {loading ? 'Signing in...' : 'Sign In'}
                    {
                        loading &&
                        <span className="absolute inset-0 flex left-30 items-center justify-center">
                            <span className="w-5 h-5 border-2 border-white  border-t-transparent rounded-full animate-spin"></span>
                        </span>
                    }
                </button>

                <div className="text-center mt-1 flex items-center justify-center">
                    <p className="text-gray-700 mt-4">Don't have an account? <span onClick={() => navigate('/signup')} className="text-blue-600 hover:underline cursor-pointer">Sign Up</span></p>
                </div>
            </form>
        </div>
    )
}
