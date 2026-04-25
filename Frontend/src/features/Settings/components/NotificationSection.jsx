import React, { useState } from 'react';
import { Bell, Mail, Shield, Smartphone } from 'lucide-react';

const NotificationSection = () => {
    const [settings, setSettings] = useState({
        email_task: true,
        email_mention: true,
        push_message: false,
        push_update: true
    });

    const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

    const ToggleRow = ({ icon: Icon, title, desc, active, onToggle }) => (
        <div className="flex items-center justify-between p-4 rounded-2xl border border-transparent hover:border-border hover:bg-muted/30 transition-all group">
            <div className="flex gap-4 items-center">
                <div className={`p-2.5 rounded-xl ${active ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'} group-hover:scale-110 transition-transform`}>
                    <Icon size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-foreground">{title}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight mt-0.5">{desc}</p>
                </div>
            </div>
            <button 
                onClick={onToggle}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 overflow-hidden ${active ? 'bg-foreground' : 'bg-muted'}`}
            >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-sm ${active ? 'left-7' : 'left-1'}`} />
            </button>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h3 className="text-lg font-bold text-foreground">Notifications</h3>
                <p className="text-sm text-muted-foreground mt-1">Configure how and when you want to be notified.</p>
            </div>

            <div className="grid gap-4 max-w-2xl">
                <div className="space-y-3">
                    <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2">Email Notifications</h5>
                    <ToggleRow 
                        icon={Mail} 
                        title="New Tasks" 
                        desc="When someone assigns you a new task" 
                        active={settings.email_task}
                        onToggle={() => toggle('email_task')}
                    />
                    <ToggleRow 
                        icon={Shield} 
                        title="Security Alerts" 
                        desc="Critical account security notifications" 
                        active={true}
                        onToggle={() => {}} // Non-optional for security
                    />
                </div>

                <div className="space-y-3 pt-6 border-t border-border">
                    <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2">Push Notifications</h5>
                    <ToggleRow 
                        icon={Smartphone} 
                        title="Mobile Updates" 
                        desc="Updates and reminders on your mobile device" 
                        active={settings.push_update}
                        onToggle={() => toggle('push_update')}
                    />
                    <ToggleRow 
                        icon={Bell} 
                        title="Chat Messages" 
                        desc="Instantly stay updated with team chat" 
                        active={settings.push_message}
                        onToggle={() => toggle('push_message')}
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4 max-w-2xl">
                <button className="px-8 py-3 bg-foreground text-background rounded-xl font-bold text-xs shadow-lg active:scale-95 transition-all">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default NotificationSection;
