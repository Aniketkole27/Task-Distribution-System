import React, { useState } from 'react'
import Greeting from '@shared/components/Greeting'
import ProfileSection from './components/ProfileSection'
import NotificationSection from './components/NotificationSection'
import SecuritySection from './components/SecuritySection'
import { User, Bell, Shield, Settings as SettingsIcon, ChevronRight } from 'lucide-react'
import { useSelector } from 'react-redux'

function Setting() {
  const [activeTab, setActiveTab] = useState('profile');
  const user = useSelector(state => state.currentUser.user);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User, desc: 'Identity & avatar' },
    { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Alerts & preferences' },
    { id: 'security', label: 'Security', icon: Shield, desc: 'Password & safety' },
  ];

  return (
    <div className='bg-card text-foreground rounded-lg pb-3 shadow h-full flex flex-col overflow-hidden'>
      <Greeting />
      
      <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x border-t border-border mt-2 overflow-hidden">
        {/* Settings Sidebar */}
        <aside className="w-full md:w-64 bg-muted/10 p-4 space-y-2 shrink-0 overflow-y-auto">
          <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Account Settings</p>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group ${
                activeTab === tab.id 
                ? 'bg-card shadow-sm border border-border text-foreground' 
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-3">
                <tab.icon size={18} className={activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'} />
                <div className="text-left">
                  <p className="text-sm font-bold">{tab.label}</p>
                  <p className="text-[10px] opacity-70 leading-none mt-0.5">{tab.desc}</p>
                </div>
              </div>
              <ChevronRight size={14} className={`transition-transform ${activeTab === tab.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
            </button>
          ))}

          <div className="pt-8 px-3">
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-3">
                    <SettingsIcon size={16} />
                </div>
                <h5 className="text-xs font-bold text-foreground">Advanced Mode</h5>
                <p className="text-[10px] text-muted-foreground mt-1">Unlock deeper configuration and system logs.</p>
                <button className="mt-3 text-[10px] font-bold text-primary hover:underline">Learn more</button>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-card p-6 md:p-10 overflow-y-auto custom-scrollbar">
          {activeTab === 'profile' && <ProfileSection user={user} />}
          {activeTab === 'notifications' && <NotificationSection />}
          {activeTab === 'security' && <SecuritySection />}
        </main>
      </div>
    </div>
  )
}

export default Setting
