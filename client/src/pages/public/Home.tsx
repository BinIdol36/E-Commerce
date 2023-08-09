import React from "react"
import {
  Banner,
  Sidebar,
  BestSeller,
  DealDaily,
  FeatureProducts,
  CustomSlider,
} from "../../components"
import { useSelector } from "react-redux"

const settings = {
  dots: false, // index
  infinite: true, // lướt tới thằng cuối tự lướt lại
  speed: 500, // tốc độ lướt
  slidesToShow: 3, // số lượng item show mỗi lần lướt
  slidesToScroll: 1, // khi click thì sẽ lướt theo số lượng
}

function Home() {
  const { newProducts } = useSelector((state) => state.products)
  const { categories } = useSelector((state) => state.app)

  console.log(categories)

  return (
    <div>
      <div className="w-main flex">
        <div className="flex flex-col gap-5 w-[25%] flex-auto">
          <Sidebar />
          {/* <DealDaily /> */}
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="my-8">
        <FeatureProducts />
      </div>
      <div className="my-8 w-full">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          NEW ARRIVALS
        </h3>
        <div className="mt-4 mx-[-10px]">
          <CustomSlider products={newProducts} />
        </div>
      </div>
      <div className="my-8 w-full">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          HOT COLLECTIONS
        </h3>
      </div>
      <div className="w-full h-[500px]"></div>
    </div>
  )
}

export default Home
