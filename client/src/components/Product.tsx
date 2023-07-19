import React from "react"
import { formatMoney } from "../utils/helper"
import label from "../assets/label.png"
import labelBlue from "../assets/label-blue.png"

const Product = ({ productData, isNew }) => {
  return (
    <div className="w-full text-base px-[10px]">
      <div className="w-full border p-[15px] flex flex-col items-center">
        <div className="w-full relative">
          <img
            src={
              productData?.thumb ||
              "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
            }
            alt=""
            className="w-[243px] h-[243px] object-cover"
          />
          <img
            src={isNew ? label : labelBlue}
            alt=""
            className={`absolute top-[-40px] ${
              isNew ? "w-[100px] left-[-50px]" : "w-[150px] left-[-74px]"
            }  h-[100px] object-contain`}
          />
          <span className="font-bold top-[-6px] left-[-22px] text-white absolute">
            {isNew ? "New" : "Trending"}
          </span>
        </div>
        <div className="flex mt-[15px] items-start w-full gap-1 flex-col">
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VND`}</span>
        </div>
      </div>
    </div>
  )
}

export default Product
