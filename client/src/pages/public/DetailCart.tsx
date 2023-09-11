import { Breadcrumb, Button, SelectQuantity } from "@/components"
import withBaseComponent from "@/hocs/withBaseComponent"
import { formatMoney } from "@/utils/helper"
import React, { useState } from "react"
import { useSelector } from "react-redux"

const DetailCart = ({ location }) => {
  const { current } = useSelector((state) => state.user)
  const [quantity, setQuantity] = useState(1)

  const handleQuantity = (number) => {
    if (+number > 1) setQuantity(number)
  }

  const handleChangleQuantity = (flag) => {
    if (flag === "minus" && quantity === 1) return
    if (flag === "minus") setQuantity((prev) => +prev - 1)
    if (flag === "plus") setQuantity((prev) => +prev + 1)
  }

  return (
    <div className="w-full">
      <div className="h-[81px] flex items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase">My Cart</h3>
          <Breadcrumb category={location.path} />
        </div>
      </div>
      <div className="flex flex-col border my-8 w-main mx-auto">
        <div className="w-full mx-auto font-bold py-3 grid grid-cols-10 bg-gray-200">
          <span className="col-span-6 w-full text-center">Products</span>
          <span className="col-span-1 w-full text-center">Quantity</span>
          <span className="col-span-3 w-full text-center">Price</span>
        </div>
        {current?.cart?.map((el) => (
          <div
            key={el._id}
            className="w-full mx-auto font-bold py-3 grid grid-cols-10 border"
          >
            <span className="col-span-6 w-full text-center flex items-center justify-center">
              <div className="flex gap-2">
                <img
                  src={el?.product?.thumb}
                  alt="thumb"
                  className="w-28 h-28 object-cover"
                />
                <div className="flex flex-col items-start justify-center gap-1">
                  <span className="text-sm text-main">
                    {el?.product?.title}
                  </span>
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
              <span className="text-lg">{`${formatMoney(
                el.product?.price,
              )} VND`}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="w-main mx-auto flex flex-col mb-12 justify-center items-end gap-3">
        <span className="flex items-center gap-8 text-sm">
          <span>Subtotal:</span>
          <span className="text-main font-bold">{`${formatMoney(
            current?.cart?.reduce((sum, el) => +el.product?.price + sum, 0),
          )} VND`}</span>
        </span>
        <span className="text-xs italic">
          Shipping, taxes, and discounts calculated at checkout.
        </span>
        <Button>Checkout</Button>
      </div>
    </div>
  )
}

export default withBaseComponent(DetailCart)
