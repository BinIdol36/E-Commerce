import React, { memo } from "react"
import Slider from "react-slick"
import { Product } from "./"

const settings = {
  dots: false, // index
  infinite: true, // lướt tới thằng cuối tự lướt lại
  speed: 500, // tốc độ lướt
  slidesToShow: 3, // số lượng item show mỗi lần lướt
  slidesToScroll: 1, // khi click thì sẽ lướt theo số lượng
}

const CustomSlider = ({ products, activeTab, normal }) => {
  return (
    <>
      {products && (
        <Slider className="custom-slider" {...settings}>
          {products?.map((el, index) => (
            <Product
              key={index}
              pid={el._id}
              productData={el}
              isNew={activeTab === 1 ? false : true}
              normal={normal}
            />
          ))}
        </Slider>
      )}
    </>
  )
}

export default memo(CustomSlider)
