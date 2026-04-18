import { Command } from 'cmdk'
import { Delete, Eye, Folder, FolderCheck, FolderClockIcon, LucideDelete, PlusIcon, ThermometerSnowflake, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
const CommandMenu = ({ open, setOpen }) => {

    const [value, setValue] = useState("")
    // let style = "flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-muted rounded items-center gap-2"

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
    }, [])

    return (
        <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Global Command Menu"
            className='fixed inset-0 bg-stone-950/50'
            onClick={() => setOpen(false)}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className='bg-background rounded-lg shadow-xl border-border border overflow-hidden w-full max-w-lg mx-auto mt-12'
            >
                <Command.Input
                    value={value}
                    onValueChange={setValue}
                    placeholder='Search to find.'
                    className='relative border-b border-border px-5 py-2 text-lg w-full placeholder:text-muted-foreground focus:outline-none'
                />
                <Command.List className='p-5'>
                    <Command.Empty>
                        No results found for {" "}
                        <span className='text-violet-500'> {value}</span>
                    </Command.Empty>

                    <Command.Group
                        heading="Team"
                        className="text-sm mb-3 text-muted-foreground"
                    >
                        <Command.Item className={`flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-muted rounded items-center gap-2`}>
                            <PlusIcon size="14" />
                            Invite Member
                        </Command.Item>
                        <Command.Item className='flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-muted rounded items-center gap-2'>
                            <Eye size="14" />
                            See Members
                        </Command.Item>
                        {/* <Command.Separator /> */}
                        <Command.Item className='flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-muted rounded items-center gap-2'>
                            <Trash2 size="14" />
                            Delete Member
                        </Command.Item>
                    </Command.Group>

                    <Command.Group
                        heading="Project"
                        className="text-sm mb-3 text-muted-foreground"
                    >
                        <Command.Item className={`flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-muted rounded items-center gap-2`}>
                            <FolderCheck size="14" />
                            New Project
                        </Command.Item>
                        <Command.Item className='flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-muted rounded items-center gap-2'>
                            <FolderClockIcon size="14" />
                            Project Progress
                        </Command.Item>
                        {/* <Command.Separator /> */}
                        <Command.Item className='flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-muted rounded items-center gap-2'>

                            Assign Task
                        </Command.Item>
                    </Command.Group>

                    {/* <Command.Item>Apple</Command.Item> */}
                </Command.List>
            </div>
        </Command.Dialog>
    )
}

export default CommandMenu