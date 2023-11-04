import { Button, Product } from "@/components"
import React from "react"
import { useSelector } from "react-redux"

const Wishlist = () => {
  const { current } = useSelector((state) => state.user)
  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-semibold py-4 border-b border-b-blue-200">
        Wishlist
      </header>
      <div className="py-4 w-full flex flex-wrap gap-4">
        {current?.wishList?.map((el) => (
          <div
            className="bg-white rounded-md w-[300px] drop-shadow flex flex-col py-3 gap-3"
            key={el._id}
          >
            <Product productData={el} classname="bg-white" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist
