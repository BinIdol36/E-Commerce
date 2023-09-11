import React, { useState } from "react"
import { SelectQuantity } from ".."
import { formatMoney } from "@/utils/helper"

const OrderItem = ({ el }) => {
  const [quantity, setQuantity] = useState(1)

  const handleQuantity = (number) => {
    if (+number > 1) setQuantity(number)
  }

  const handleChangleQuantity = (flag) => {
    if (flag === "minus" && quantity === 1) return
    if (flag === "minus") setQuantity((prev) => +prev - 1)
    if (flag === "plus") setQuantity((prev) => +prev + 1)
  }

  useEffect

  return (
    <div className="w-full mx-auto font-bold py-3 grid grid-cols-10 border">
      <span className="col-span-6 w-full text-center flex items-center justify-center">
        <div className="flex gap-2">
          <img
            src={el?.thumbnail}
            alt="thumb"
            className="w-28 h-28 object-cover"
          />
          <div className="flex flex-col items-start justify-center gap-1">
            <span className="text-sm text-main">{el?.title}</span>
            <span className="text-[10px] font-main">{el?.color}</span>
          </div>
        </div>
      </span>
      <span className="col-span-1 w-full text-center">
        <div className="flex items-center h-full">
          <SelectQuantity
            quantity={quantity}
            handleQuantity={handleQuantity}
            handleChangleQuantity={handleChangleQuantity}
          />
        </div>
      </span>
      <span className="col-span-3 w-full text-center h-full flex items-center justify-center">
        <span className="text-lg">{`${formatMoney(el?.price)} VND`}</span>
      </span>
    </div>
  )
}

export default OrderItem
