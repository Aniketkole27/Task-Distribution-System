import React from 'react'
import { useDispatch } from 'react-redux'
import { handelButtonClick } from '../app/teamSlice'

const KebabMenu = ({ handleClick, id }) => {
  return (
    <div>
      <div className="absolute right-12 mt-2 w-50 rounded border border-stone-300 bg-stone-100 shadow-lg">
        <MenuItem label="Edit" />
        <MenuItem label="Details" />

        <Divider />
        <MenuItem
          handleClick={handleClick}
          id={id}
          label="Delete Member"
          danger
        />
      </div>
    </div>
  )
}

export default KebabMenu


function MenuItem({ label, danger }) {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(handelButtonClick(label))}
      className={`flex w-full items-center rounded justify-between font-medium px-4 py-2 text-sm  active:bg-stone-00
        ${danger
          ? "text-red-900 hover:bg-stone-300"
          : "text-stone-900 hover:bg-stone-300"
        }
      `}
    >
      <span>{label}</span>
    </button>
  );
}

function Divider() {
  return <div className="my-1 bg-stone-300" />;
}