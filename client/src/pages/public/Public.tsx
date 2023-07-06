import React from "react"
// Outlet: đại diện cho phần con của Public trên đường dẫn URL
import { Outlet } from "react-router-dom"
import { Header, Navigation } from "../../components"

function Public() {
  return (
    <div className="w-full flex items-center">
      <Header />
      <Navigation />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default Public
