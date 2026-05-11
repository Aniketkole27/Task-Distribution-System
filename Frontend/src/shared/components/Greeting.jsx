import React from 'react'
import ThemeToggle from './ToggleTheme'
import { useSelector } from 'react-redux'
import { Sun, Moon, Sunrise, ShieldCheck, UserCog, User, Briefcase } from 'lucide-react'

const Greeting = () => {
    const hours = new Date().getHours()
    const profile = useSelector(state => state.currentUser.profile);

    let greet = "Good Night";
    let GreetIcon = Moon;
    let greetIconColor = "text-indigo-400";

    if (hours >= 5 && hours < 12) {
        greet = "Good Morning";
        GreetIcon = Sunrise;
        greetIconColor = "text-orange-400";
    } else if (hours >= 12 && hours < 18) {
        greet = "Good Afternoon";
        GreetIcon = Sun;
        greetIconColor = "text-amber-400";
    }

    const date = new Date().toLocaleDateString('en-US', {
        weekday: "long",
        day: "numeric",
        month: "short"
    });

    const getRoleConfig = (role) => {
        const r = role?.toLowerCase();
        if (r === 'admin') return { Icon: ShieldCheck, color: "text-rose-500", label: "Administrator" };
        if (r === 'sub-admin') return { Icon: UserCog, color: "text-amber-500", label: "Sub-Administrator" };
        return { Icon: User, color: "text-blue-500", label: "Member" };
    };

    const roleConfig = getRoleConfig(profile?.role);

    return (
        <div className='w-full px-4 py-3 flex items-center border-b border-border/50 justify-between transition-all bg-background/50 backdrop-blur-sm'>
            <div className='flex items-center gap-4'>
                <div className='flex flex-col'>
                    <h1 className='text-sm font-bold tracking-tight text-foreground'>
                        {profile?.name ? (
                            `${greet}, ${profile.name.split(' ')[0]}`
                        ) : (
                            <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                        )}
                    </h1>
                    <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60'>
                        {date}
                    </p>
                </div>
            </div>

            <div className='flex items-center gap-6'>
                <div className='hidden sm:flex items-center gap-3'>
                    <div className='flex flex-col items-end'>
                        <span className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40'>Workspace</span>
                        <span className='text-xs font-bold text-foreground/80'>{roleConfig.label}</span>
                    </div>
                    <div className={`p-2 bg-muted/50 rounded-lg ${roleConfig.color}`}>
                        <roleConfig.Icon size={16} strokeWidth={2.5} />
                    </div>
                </div>

                <div className='h-8 w-px bg-border/60 hidden sm:block' />
                <ThemeToggle />
            </div>
        </div>
    )
}

export default Greeting
