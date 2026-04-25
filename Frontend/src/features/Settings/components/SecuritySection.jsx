import React from 'react';
import { Lock, Eye, Key, ShieldCheck } from 'lucide-react';

const SecuritySection = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h3 className="text-lg font-bold text-foreground">Security Settings</h3>
                <p className="text-sm text-muted-foreground mt-1">Protect your account and update your passwords.</p>
            </div>

            <div className="max-w-xl space-y-6">
                <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 flex gap-4">
                    <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl h-fit">
                        <Lock size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-amber-900">Strong Password Required</h4>
                        <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                            It's been a while since you last changed your password. We recommend updating it every 6 months for better security.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Current Password</label>
                        <div className="relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <input 
                                type="password" 
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2.5 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium" 
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">New Password</label>
                            <input 
                                type="password" 
                                placeholder="Min 8 characters"
                                className="w-full px-4 py-2.5 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Confirm New Password</label>
                            <input 
                                type="password" 
                                placeholder="Repeat password"
                                className="w-full px-4 py-2.5 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium" 
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                        <ShieldCheck size={14} /> Password Strength: Strong
                    </div>
                    <button className="px-8 py-3 bg-foreground text-background rounded-xl font-bold text-xs shadow-lg active:scale-95 transition-all">
                        Update Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SecuritySection;
