import React, { useEffect, useState } from "react"
import { apiGetProducts } from "../apis/product"
import { Product } from "./"
import Slider from "react-slick"

const tabs = [
  { id: 1, name: "best seller" },
  { id: 2, name: "news arrivals" },
  { id: 3, name: "tablet" },
]

const settings = {
  dots: false, // index
  infinite: true, // lướt tới thằng cuối tự lướt lại
  speed: 500, // tốc độ lướt
  slidesToShow: 3, // số lượng item show mỗi lần lướt
  slidesToScroll: 1, // khi click thì sẽ lướt theo số lượng
}

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState(null)
  const [newProducts, setNewProducts] = useState(null)
  const [activeTab, setActiveTab] = useState(1)

  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProducts({ sort: "-sold" }),
      apiGetProducts({ sort: "-createdAt" }),
    ])

    if (response[0]?.success) setBestSellers(response[0].products)
    if (response[1]?.success) setNewProducts(response[1].products)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div>
      <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-main">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold capitalize border-r cursor-pointer text-gray-400 ${
              activeTab === el.id ? "text-gray-900" : ""
            }`}
            onClick={() => setActiveTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <Slider {...settings}>
          {bestSellers?.map((el) => (
            <Product key={el.id} productData={el} />
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default BestSeller
