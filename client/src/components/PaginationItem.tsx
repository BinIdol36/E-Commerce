import clsx from "clsx"
import React from "react"

const PaginationItem = ({ children }) => {
  return (
    <div
      className={clsx(
        "w-10 h-10 flex cursor-pointer justify-center hover:rounded-full hover:bg-gray-300",
        !Number(children) && "items-end pb-2",
        Number(children) && "items-center",
      )}
    >
      {children}
    </div>
  )
}

export default PaginationItem
