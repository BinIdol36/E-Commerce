import withBaseComponent from "@/hocs/withBaseComponent"
import { showCart } from "@/store/app/appSlice"
import { formatMoney } from "@/utils/helper"
import icons from "@/utils/icons"
import React, { memo } from "react"
import { useSelector } from "react-redux"
const { AiFillCloseCircle } = icons

const Cart = ({ dispatch }) => {
  const { current } = useSelector((state) => state.user)

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[400px] h-screen bg-black grid grid-rows-10 text-white p-6"
    >
      <header
        className="border-b border-gray-500 flex row-span-1 h-full
      justify-between items-center font-bold text-2xl"
      >
        <span>Your Cart</span>
        <span
          onClick={() => dispatch(showCart())}
          className="cursor-pointer p-2"
        >
          <AiFillCloseCircle size={24} />
        </span>
      </header>
      <section className="row-span-6 flex flex-col gap-3 h-full max-h-full overflow-y-auto py-3">
        {!current?.cart && (
          <span className="text-xs italic">Your cart is empty.</span>
        )}
        {current?.cart &&
          current?.cart?.map((el) => (
            <div key={el._id} className="flex gap-2">
              <img
                src={el?.product?.thumb}
                alt="thumb"
                className="w-16 h-16 object-cover"
              />
              <div className="flex flex-col gap-1">
                <span className="text-main">{el?.product?.title}</span>
                <span className="text-xs">{el?.color}</span>
                <span className="text-base">
                  {`${formatMoney(el?.product?.price)} VND`}
                </span>
              </div>
            </div>
          ))}
      </section>
      <div className="row-span-3 h-full">checkout</div>
    </div>
  )
}

export default withBaseComponent(memo(Cart))
