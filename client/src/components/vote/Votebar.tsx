import React, { useRef, useEffect, memo } from "react"
import icons from "@/utils/icons"
const { AiFillStar } = icons

const Votebar = ({ number, ratingCount, ratingTotal }) => {
  const percentRef = useRef()

  useEffect(() => {
    const percent = Math.round((ratingCount * 100) / ratingTotal) || 0
    percentRef.current.style.cssText = `right: ${100 - percent}%`
  }, [ratingCount, ratingTotal])

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <div className="flex w-[10%] items-center justify-center gap-1 text-sm">
        <span>{number}</span>
        <AiFillStar color="orange" />
      </div>
      <div className="w-[75%]">
        <div className="relative w-full h-[6px] bg-gray-200 rounded-l-full rounded-r-full">
          <div
            ref={percentRef}
            className="absolute inset-0 bg-red-500 rounded-l-full rounded-r-full"
          ></div>
        </div>
      </div>
      <div className="w-[15%] flex justify-end text-sm text-gray-400">{`${
        ratingCount || 0
      } reviewers`}</div>
    </div>
  )
}

export default memo(Votebar)
