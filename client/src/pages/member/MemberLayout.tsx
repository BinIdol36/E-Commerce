import path from "@/utils/path"
import React from "react"
import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const MemberLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user)

  if (!isLoggedIn || !current)
    return <Navigate to={`/${path.LOGIN}`} replace={true} />

  return (
    <div>
      MemberLayout
      <Outlet />
    </div>
  )
}

export default MemberLayout
