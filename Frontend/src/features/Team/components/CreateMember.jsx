import React, { useState } from 'react'
import { X, User, Mail, Lock, Shield, UserPlus } from 'lucide-react'

const CreateMember = ({ setOpen }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user'
    })

    const roles = [
        { value: 'user', label: 'Team Member', icon: <User size={14} /> },
        { value: 'sub-admin', label: 'Management', icon: <Shield size={14} className="text-amber-500" /> },
        { value: 'admin', label: 'Administrator', icon: <Shield size={14} className="text-primary" /> },
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle member creation logic here
        console.log('Creating member:', formData)
        setOpen(false)
    }

    return (
        <div 
            className='fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200'
            onClick={() => setOpen(false)}
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className='bg-card w-full max-w-lg rounded-2xl shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300'
            >
                {/* Header */}
                <div className="relative px-6 py-8 border-b border-border bg-muted/30">
                    <button 
                        onClick={() => setOpen(false)}
                        className="absolute right-4 top-4 p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground"
                    >
                        <X size={18} />
                    </button>
                    
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 border border-primary/20">
                            <UserPlus className="text-primary" size={24} />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">Add Team Member</h2>
                        <p className="text-xs text-muted-foreground mt-1.5 max-w-[280px]">
                            Invoke a new member to join your workspace and start collaborating.
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-4">
                        <InputField 
                            label="Full Name"
                            icon={<User size={16} />}
                            placeholder="e.g. John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />

                        <InputField 
                            label="Email Address"
                            icon={<Mail size={16} />}
                            type="email"
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />

                        <InputField 
                            label="Initial Password"
                            icon={<Lock size={16} />}
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />

                        {/* Role Selection */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
                                Workspace Role
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {roles.map((role) => (
                                    <button
                                        key={role.value}
                                        type="button"
                                        onClick={() => setFormData({...formData, role: role.value})}
                                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                                            formData.role === role.value 
                                                ? 'bg-primary/5 border-primary ring-1 ring-primary text-primary font-bold' 
                                                : 'bg-muted/30 border-border hover:bg-muted/50 text-muted-foreground'
                                        }`}
                                    >
                                        {role.icon}
                                        <span className="text-[10px] leading-tight">{role.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-border font-bold text-sm hover:bg-muted transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Create Member
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const InputField = ({ label, icon, ...props }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
            {label}
        </label>
        <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                {icon}
            </div>
            <input 
                className="w-full bg-muted/30 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
                {...props}
            />
        </div>
    </div>
)

export default CreateMember
