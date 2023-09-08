import React, { memo, Fragment, useState } from "react"
import logo from "@/assets/logo.png"
import avatar from "@/assets/avater_default.png"
import { memberSidebar } from "@/utils/contants"
import { NavLink, Link } from "react-router-dom"
import clsx from "clsx"
import icons from "@/utils/icons"
import { useSelector } from "react-redux"
const { AiOutlineCaretDown, AiOutlineCaretRight } = icons

const activedStyle = "px-4 py-2 flex items-center gap-2 bg-blue-500"
const notActivedStyle = "px-4 py-2 flex items-center gap-2 hover:bg-blue-100"

const MemberSidebar = () => {
  const [actived, setActived] = useState([])
  const { current } = useSelector((state) => state.user)

  const handleShowTabs = (tabID) => {
    if (actived.some((el) => el === tabID))
      setActived((prev) => prev.filter((el) => el !== tabID))
    else setActived((prev) => [...prev, tabID])
  }

  return (
    <div className=" bg-white h-full py-4 w-[250px] flex-none">
      <div className="w-full flex flex-col items-center justify-center py-4">
        <img
          src={current?.avatar || avatar}
          alt="logo"
          className="w-16 h-16 object-cover"
        />
        <small>{`${current?.lastName} ${current?.firstName}`}</small>
      </div>
      <div>
        {memberSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                className={({ isActive }) =>
                  clsx(isActive && activedStyle, !isActive && notActivedStyle)
                }
                to={el.path}
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}
            {el.type === "PARENT" && (
              <div className="flex flex-col">
                <div
                  onClick={() => handleShowTabs(el.id)}
                  className="flex items-center justify-between gap-2 px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </div>
                  {actived.some((id) => id === el.id) ? (
                    <AiOutlineCaretRight />
                  ) : (
                    <AiOutlineCaretDown />
                  )}
                </div>
                {actived.some((id) => id === el.id) && (
                  <div className="flex flex-col">
                    {el.submenu?.map((item) => (
                      <NavLink
                        key={item.text}
                        to={item.path}
                        onClick={(e) => e.stopPropagation()}
                        className={({ isActive }) =>
                          clsx(
                            isActive && activedStyle,
                            !isActive && notActivedStyle,
                            "pl-10",
                          )
                        }
                      >
                        <span>{item.text}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default memo(MemberSidebar)
