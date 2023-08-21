import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiGetProduct } from "../../apis"
import { Breadcrumb } from "../../components"
import Slider from "react-slick"
import ReactImageMagnify from "react-image-magnify"

const settings = {
  dots: false, // index
  infinite: true, // lướt tới thằng cuối tự lướt lại
  speed: 500, // tốc độ lướt
  slidesToShow: 3, // số lượng item show mỗi lần lướt
  slidesToScroll: 1, // khi click thì sẽ lướt theo số lượng
}

const DetailProduct = () => {
  const { pid, title, category } = useParams()
  const [product, setProduct] = useState(null)
  const fetchProductData = async () => {
    const response = await apiGetProduct(pid)
    if (response.success) setProduct(response.productData)
  }

  useEffect(() => {
    if (pid) fetchProductData()
  }, [pid])

  return (
    <div className="w-full">
      <div className="h-[81px] flex items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3>{title}</h3>
          <Breadcrumb title={title} category={category} />
        </div>
      </div>
      <div className="w-main m-auto mt-4 flex">
        <div className="flex flex-col gap-4 w-2/5">
          <div className="h-[458px] w-[458px] border">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: product?.thumb,
                },
                largeImage: {
                  src: product?.thumb,
                  width: 1800,
                  height: 1500,
                },
              }}
            />
          </div>
          <div className="w-[458px]">
            <Slider className="image-slider flex gap-2" {...settings}>
              {product?.images?.map((el, index) => (
                <div key={index}>
                  <img
                    src={el}
                    alt="sub-product"
                    className="h-[143px] w-[143px] object-cover border"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-2/5">price</div>
        <div className="w-1/5">infor</div>
      </div>
      <div className="h-[500px] w-full"></div>
    </div>
  )
}

export default DetailProduct
