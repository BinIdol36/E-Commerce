import React from "react"
import { formatMoney, renderStarFromNumber } from "@/utils/helper"

const ProductCard = ({ price, totalRating, title, image }) => {
  return (
    <div className="w-1/3 flex-auto px-[10px] mb-[20px]">
      <div className="border flex w-full">
        <img
          src={image}
          alt="products"
          className="w-[90px] h-[90px] object-contain p-4"
        />
        <div className="flex mt-[15px] items-start w-full gap-1 flex-col text-xs">
          <span className="line-clamp-1 capitalize text-sm">
            {title?.toLowerCase()}
          </span>
          <span className="flex h-4">
            {renderStarFromNumber(totalRating, 14)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </span>
          <span>{`${formatMoney(price)} VND`}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
