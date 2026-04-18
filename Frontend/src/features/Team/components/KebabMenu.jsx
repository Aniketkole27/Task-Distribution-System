import React from 'react'
import { Edit, Trash2, MoreVertical, Eye } from 'lucide-react'

const KebabMenu = ({ handleClick, id }) => {
  return (
    <div className='relative'>
      <div className="absolute right-0 top-2 w-48 rounded-xl border border-border bg-card shadow-xl z-50 py-1.5 transition-all animate-in fade-in zoom-in duration-100">
        <MenuItem 
          handleClick={handleClick} 
          id={id} 
          label="Edit" 
          icon={<Edit size={14} />} 
        />
        <MenuItem 
          handleClick={handleClick} 
          id={id} 
          label="Details" 
          icon={<Eye size={14} />} 
        />

        <Divider />
        
        <MenuItem
          handleClick={handleClick}
          id={id}
          label="Delete Member"
          icon={<Trash2 size={14} />}
          danger
        />
      </div>
    </div>
  )
}

export default KebabMenu


function MenuItem({ label, icon, danger, handleClick, id }) {
  return (
    <button
      onClick={(e) => {
          e.stopPropagation();
          handleClick(label, id);
      }}
      className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium transition-colors
        ${danger
          ? "text-red-600 hover:bg-red-50"
          : "text-foreground hover:bg-muted"
        }
      `}
    >
      <span className={danger ? "text-red-500" : "text-muted-foreground"}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}

function Divider() {
  return <div className="my-1.5 h-px bg-border/50 mx-2" />;
}