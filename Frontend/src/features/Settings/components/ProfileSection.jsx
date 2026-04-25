import React from 'react';
import { User, Mail, Camera, Phone } from 'lucide-react';

const ProfileSection = ({ user = {} }) => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h3 className="text-lg font-bold text-foreground">Public Profile</h3>
                <p className="text-sm text-muted-foreground mt-1">Manage your identity and how others see you.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="relative group">
                    <div className="w-32 h-32 rounded-3xl bg-muted flex items-center justify-center text-muted-foreground border-2 border-dashed border-border group-hover:bg-primary/5 group-hover:border-primary/50 transition-all overflow-hidden shadow-inner">
                        <User size={48} className="group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 bg-foreground text-background rounded-xl shadow-lg hover:scale-110 transition-all">
                        <Camera size={16} />
                    </button>
                </div>

                <div className="flex-1 grid gap-6 w-full max-w-2xl">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                <input 
                                    type="text" 
                                    defaultValue={user.name || 'John Doe'} 
                                    className="w-full pl-10 pr-4 py-2.5 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium" 
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                <input 
                                    type="email" 
                                    defaultValue={user.email || 'john@example.com'} 
                                    className="w-full pl-10 pr-4 py-2.5 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium" 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Bio</label>
                        <textarea 
                            rows={4}
                            placeholder="Tell us about yourself..."
                            className="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium resize-none shadow-inner" 
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button className="px-8 py-3 bg-foreground text-background rounded-xl font-bold text-xs shadow-lg active:scale-95 transition-all">
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
