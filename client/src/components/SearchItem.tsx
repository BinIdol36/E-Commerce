import React, { memo } from "react"
import icons from "../utils/icons"
const { AiOutlineDown } = icons

const SearchItem = ({ name, activeClick, changeActiveFilter }) => {
  return (
    <div
      onClick={() => changeActiveFilter(name)}
      className="p-3 gap-6 text-xs text-gray-500 relative border border-gray-800 flex justify-between items-center"
    >
      <span className="capitalize">{name}</span>
      <AiOutlineDown />
      {activeClick === name && (
        <div className="absolute top-full left-0 w-fit p-4 bg-red-500">
          content
        </div>
      )}
    </div>
  )
}

export default memo(SearchItem)
