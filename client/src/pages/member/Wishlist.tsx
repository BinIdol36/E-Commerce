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
      <div className="p-4 w-full grid grid-cols-5 gap-4">
        {current?.wishList?.map((el) => (
          <div
            className="bg-white  rounded-md drop-shadow flex flex-col gap-3"
            key={el._id}
          >
            <Product productData={el} classname="bg-white" />
            <div className="px-3">
              <Button>Add to Cart</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist
