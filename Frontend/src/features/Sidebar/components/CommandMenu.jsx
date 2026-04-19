import { Command } from 'cmdk'
import {
    LayoutDashboard,
    Folder,
    Users,
    ListCheck,
    Calendar,
    Settings,
    Plus,
    FolderPlus,
    UserPlus,
    Search,
    Command as CommandIcon,
    X
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CommandMenu = ({ open, setOpen }) => {
    const [value, setValue] = useState("")
    const navigate = useNavigate()

    // Toggle the menu when ⌘K is pressed
    useEffect(() => {
        const down = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [setOpen])

    const runCommand = (command) => {
        setOpen(false)
        command()
    }

    return (
        <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Global Command Menu"
            className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        >
            <div className="w-full max-w-2xl bg-card/95 backdrop-blur-xl rounded-2xl border border-border shadow-2xl overflow-hidden ring-1 ring-black/5 animate-in zoom-in-95 duration-200">
                <div className="flex items-center border-b border-border px-4">
                    <Search className="mr-3 h-5 w-5 text-muted-foreground shrink-0" />
                    <Command.Input
                        value={value}
                        onValueChange={setValue}
                        placeholder="Type a command or search..."
                        className="flex h-14 w-full bg-transparent py-4 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <div className="flex items-center gap-1.5 ml-auto pl-4">
                        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
                            ESC
                        </kbd>
                    </div>
                </div>

                <Command.List className="max-h-[450px] overflow-y-auto p-2 scrollbar-hide">
                    <Command.Empty className="py-12 text-center text-sm">
                        <div className="flex flex-col items-center gap-2">
                            <div className="p-3 rounded-full bg-muted/50">
                                <Search className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground">No results found for {value ? <span className="text-primary font-medium">"{value}"</span> : 'this search'}.</p>
                        </div>
                    </Command.Empty>

                    <Command.Group heading={<span className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Navigation</span>}>
                        <Item
                            onSelect={() => runCommand(() => navigate('/admin/dashboard'))}
                            icon={<LayoutDashboard className="h-4 w-4" />}
                            label="Dashboard"
                            shortcut="G D"
                        />
                        <Item
                            onSelect={() => runCommand(() => navigate('/admin/projects'))}
                            icon={<Folder className="h-4 w-4" />}
                            label="Projects"
                            shortcut="G P"
                        />
                        <Item
                            onSelect={() => runCommand(() => navigate('/admin/team'))}
                            icon={<Users className="h-4 w-4" />}
                            label="Team"
                            shortcut="G T"
                        />
                        <Item
                            onSelect={() => runCommand(() => navigate('/admin/todos'))}
                            icon={<ListCheck className="h-4 w-4" />}
                            label="Todo's"
                            shortcut="G L"
                        />
                        <Item
                            onSelect={() => runCommand(() => navigate('/admin/academic-calendar'))}
                            icon={<Calendar className="h-4 w-4" />}
                            label="Academic Calendar"
                            shortcut="G C"
                        />
                    </Command.Group>

                    <div className="h-px bg-border my-2 mx-2 opacity-50" />

                    <Command.Group heading={<span className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Actions</span>}>
                        <Item
                            onSelect={() => runCommand(() => console.log('New Project'))}
                            icon={<FolderPlus className="h-4 w-4 text-blue-500" />}
                            label="New Project"
                            className="hover:bg-blue-50/50"
                        />
                        <Item
                            onSelect={() => runCommand(() => console.log('Add Todo'))}
                            icon={<Plus className="h-4 w-4 text-green-500" />}
                            label="Add Task"
                            className="hover:bg-green-50/50"
                        />
                        <Item
                            onSelect={() => runCommand(() => console.log('Invite'))}
                            icon={<UserPlus className="h-4 w-4 text-purple-500" />}
                            label="Invite Member"
                            className="hover:bg-purple-50/50"
                        />
                    </Command.Group>

                    <div className="h-px bg-border my-2 mx-2 opacity-50" />

                    <Command.Group heading={<span className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">System</span>}>
                        <Item
                            onSelect={() => runCommand(() => navigate('/admin/settings'))}
                            icon={<Settings className="h-4 w-4" />}
                            label="Settings"
                            shortcut="⌘ ,"
                        />
                        <Item
                            onSelect={() => runCommand(() => {
                                localStorage.removeItem('token')
                                navigate('/signin')
                            })}
                            icon={<X className="h-4 w-4 text-red-500" />}
                            label="Logout"
                            className="text-red-500 hover:bg-red-50/50"
                        />
                    </Command.Group>
                </Command.List>

                <div className="flex items-center justify-between border-t border-border px-4 py-2.5 bg-muted/20">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                            <kbd className="rounded-[4px] border border-border bg-card px-1.5 py-0.5 shadow-sm">↑↓</kbd>
                            <span>Navigate</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                            <kbd className="rounded-[4px] border border-border bg-card px-1.5 py-0.5 shadow-sm">↵</kbd>
                            <span>Open</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                        <CommandIcon className="h-3 w-3" />
                        <span>Command Menu</span>
                    </div>
                </div>
            </div>
        </Command.Dialog>
    )
}

const Item = ({ icon, label, shortcut, onSelect, className = "" }) => (
    <Command.Item
        onSelect={onSelect}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 
        aria-selected:bg-muted aria-selected:shadow-sm hover:bg-muted group select-none ${className}`}
    >
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-card border border-border shadow-xs group-aria-selected:border-primary/20 transition-all">
            {icon}
        </div>
        <span className="text-sm font-medium flex-1 text-foreground group-aria-selected:font-semibold transition-all">{label}</span>
        {shortcut && (
            <div className="flex items-center gap-1 opacity-60 group-aria-selected:opacity-100 transition-opacity">
                {shortcut.split(' ').map((key, i) => (
                    <kbd key={i} className="pointer-events-none h-5 min-w-5 flex items-center justify-center rounded-[4px] border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground transition-all">
                        {key}
                    </kbd>
                ))}
            </div>
        )}
    </Command.Item>
)

export default CommandMenu