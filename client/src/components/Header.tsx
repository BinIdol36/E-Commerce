import React, { Fragment } from "react"
import logo from "@/assets/logo.png"
import icons from "@/utils/icons"
import { Link } from "react-router-dom"
import path from "@/utils/path"
import { useSelector } from "react-redux"

const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons

function Header() {
  const { current } = useSelector((state) => state.user)

  return (
    <div className="w-main flex justify-between h-[110px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="" className="w-[234px] object-contain" />
      </Link>
      <div className="flex text-[13px]">
        <div className="flex flex-col px-6 border-r items-center">
          <span className="flex gap-4 items-center">
            <RiPhoneFill color="red" />
            <span className="font-semibold">(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col px-6 border-r items-center">
          <span className="flex gap-4 items-center">
            <MdEmail color="red" />
            <span className="font-semibold">SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        <div className="flex items-center justify-center px-6 border-r gap-2 cursor-pointer">
          <BsHandbagFill color="red" />
          <span>0 item(s)</span>
        </div>
        {current && (
          <Fragment>
            <Link
              to={
                +current?.role === 1945
                  ? `/${path.ADMIN}/${path.DASHBOARD}`
                  : `/${path.MEMBER}/${path.PERSONAL}`
              }
              className="flex items-center justify-center px-6 gap-2 cursor-pointer"
            >
              <FaUserCircle size={24} color="red" />
              <span>Profile</span>
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default Header
