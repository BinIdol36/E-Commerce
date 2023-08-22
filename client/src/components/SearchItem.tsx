import React, { memo, useState, useEffect } from "react"
import icons from "../utils/icons"
import { colors } from "../utils/contants"
import { createSearchParams, useNavigate, useParams } from "react-router-dom"

const { AiOutlineDown } = icons

const SearchItem = ({
  name,
  activeClick,
  changeActiveFilter,
  type = "checkbox",
}) => {
  const [selected, setSelected] = useState([])
  const navigate = useNavigate()
  const { category } = useParams()

  const handleSelect = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value)
    if (alreadyEl)
      setSelected((prev) => prev.filter((el) => el !== e.target.value))
    else setSelected((prev) => [...prev, e.target.value])
    // changeActiveFilter(null)
  }

  useEffect(() => {
    navigate({
      pathname: `/${category}`,
      search: createSearchParams({ color: selected }).toString(),
    })
  }, [selected])

  return (
    <div
      onClick={() => changeActiveFilter(name)}
      className="p-3 cursor-pointer gap-6 text-xs text-gray-500 
      relative border border-gray-800 flex justify-between items-center"
    >
      <span className="capitalize">{name}</span>
      <AiOutlineDown />
      {activeClick === name && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute cursor-default z-10 top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white min-w-[150px]"
        >
          {type === "checkbox" && (
            <div>
              <div className="p-4 items-center flex justify-between gap-8 border-b">
                <span className="whitespace-nowrap">{`${selected.length} selected`}</span>
                <span
                  onClick={(e) => setSelected([])}
                  className="underline cursor-pointer hover:text-main"
                >
                  Reset
                </span>
              </div>
              <div className="flex flex-col gap-3 mt-4">
                {colors?.map((el, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      onChange={handleSelect}
                      value={el}
                      id={el}
                      checked={selected.some(
                        (selectedItem) => selectedItem === el,
                      )}
                    />
                    <label
                      className="capitalize text-gray-700 cursor-pointer"
                      htmlFor={el}
                    >
                      {el}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default memo(SearchItem)
