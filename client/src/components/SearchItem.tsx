import React, { memo, useState, useEffect } from "react"
import icons from "@/utils/icons"
import { colors } from "@/utils/contants"
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom"
import { apiGetProducts } from "@/apis"
import { formatMoney } from "@/utils/helper"
import useDebounce from "@/hooks/useDebounce"

const { AiOutlineDown } = icons

const SearchItem = ({
  name,
  activeClick,
  changeActiveFilter,
  type = "checkbox",
}) => {
  const [selected, setSelected] = useState([])
  const [bestPrice, setBestPrice] = useState(null)
  const [price, setPrice] = useState({ from: "", to: "" })
  const navigate = useNavigate()
  const { category } = useParams()
  const [params] = useSearchParams()

  const handleSelect = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value)
    if (alreadyEl)
      setSelected((prev) => prev.filter((el) => el !== e.target.value))
    else setSelected((prev) => [...prev, e.target.value])
    changeActiveFilter(null)
  }

  const fetchBestPriceProduct = async () => {
    const response = await apiGetProducts({ sort: "-price", limit: 1 })
    if (response.success) setBestPrice(response?.products[0].price)
  }

  useEffect(() => {
    let param = []
    for (let i of params.entries()) param.push(i)

    const queries = {}
    for (let i of param) queries[i[0]] = i[1]

    if (selected.length > 0) {
      queries.color = selected.join(",")
      queries.page = 1
    } else delete queries.color

    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    })
  }, [selected])

  useEffect(() => {
    if (type === "input") fetchBestPriceProduct()
  }, [type])

  useEffect(() => {
    if (price.from && price.to && price.from > price.to)
      alert("From price cannot greater than To price")
  }, [price])

  const debouncePriceFrom = useDebounce(price.from, 500)
  const debouncePriceTo = useDebounce(price.to, 500)

  useEffect(() => {
    let param = []
    for (let i of params.entries()) param.push(i)

    const queries = {}
    for (let i of param) queries[i[0]] = i[1]

    if (Number(price.from) > 0) queries.from = price.from
    else delete queries.from
    if (Number(price.to) > 0) queries.to = price.to
    else delete queries.to

    queries.page = 1

    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    })
  }, [debouncePriceFrom, debouncePriceTo])

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
                  onClick={(e) => {
                    setSelected([])
                    changeActiveFilter(null)
                  }}
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
          {type === "input" && (
            <div>
              <div className="p-4 items-center flex justify-between gap-8 border-b">
                <span className="whitespace-nowrap">{`The highest price is ${formatMoney(
                  bestPrice,
                )} VND`}</span>
                <span
                  onClick={(e) => {
                    setPrice({ from: "", to: "" })
                    changeActiveFilter(null)
                  }}
                  className="underline cursor-pointer hover:text-main"
                >
                  Reset
                </span>
              </div>
              <div className="flex items-center p-2 gap-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="from">From</label>
                  <input
                    value={price.from}
                    className="form-input"
                    type="number"
                    id="from"
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, from: e.target.value }))
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="to">To</label>
                  <input
                    value={price.to}
                    className="form-input"
                    type="number"
                    id="to"
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, to: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default memo(SearchItem)
