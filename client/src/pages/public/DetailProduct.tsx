import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import { apiGetProduct, apiGetProducts } from "@/apis"
import {
  Breadcrumb,
  Button,
  SelectQuantity,
  ProdcutExtraInfoItem,
  ProductInformation,
  CustomSlider,
} from "@/components"
import Slider from "react-slick"
import ReactImageMagnify from "react-image-magnify"
import { formatMoney, formatPrice, renderStarFromNumber } from "@/utils/helper"
import { prodcutExtraInfomation } from "@/utils/contants"
import DOMPurify from "dompurify"
import clsx from "clsx"

const settings = {
  dots: false, // index
  infinite: true, // lướt tới thằng cuối tự lướt lại
  speed: 500, // tốc độ lướt
  slidesToShow: 3, // số lượng item show mỗi lần lướt
  slidesToScroll: 1, // khi click thì sẽ lướt theo số lượng
}

const DetailProduct = () => {
  const { pid, category } = useParams()
  const [product, setProduct] = useState(null)
  const [currentImage, setCurrentImage] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [update, setUpdate] = useState(false)
  const [varriants, setVarriants] = useState(null)
  const [currentProduct, setCurrentProduct] = useState({
    title: "",
    thumb: "",
    images: [],
    price: "",
    color: "",
  })

  const fetchProductData = async () => {
    const response = await apiGetProduct(pid)
    if (response.success) {
      setProduct(response.productData)
      setCurrentImage(response.productData?.thumb)
    }
  }

  useEffect(() => {
    if (varriants) {
      setCurrentProduct({
        title: product?.varriants?.find((el) => el.sku === varriants)?.title,
        price: product?.varriants?.find((el) => el.sku === varriants)?.price,
        images: product?.varriants?.find((el) => el.sku === varriants)?.images,
        thumb: product?.varriants?.find((el) => el.sku === varriants)?.thumb,
        color: product?.varriants?.find((el) => el.sku === varriants)?.color,
      })
    }
  }, [varriants])

  const fetchProducts = async () => {
    const response = await apiGetProducts({ category })
    if (response.success) setRelatedProducts(response.products)
  }

  useEffect(() => {
    if (pid) {
      fetchProductData()
      fetchProducts()
    }
    window.scrollTo(0, 0)
  }, [pid])

  useEffect(() => {
    if (pid) fetchProductData()
  }, [update])

  const rerender = useCallback(async () => {
    setUpdate(!update)
  }, [update])

  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) return
      else setQuantity(number)
    },
    [quantity],
  )

  const handleChangleQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return
      if (flag === "minus") setQuantity((prev) => +prev - 1)
      if (flag === "plus") setQuantity((prev) => +prev + 1)
    },
    [quantity],
  )

  const handleClickImage = (e, el) => {
    e.stopPropagation()
    setCurrentImage(el)
  }

  return (
    <div className="w-full">
      <div className="h-[81px] flex items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold">
            {currentProduct.title || product?.title}
          </h3>
          <Breadcrumb
            title={currentProduct.title || product?.title}
            category={category}
          />
        </div>
      </div>
      <div className="w-main m-auto mt-4 flex">
        <div className="flex flex-col gap-4 w-2/5">
          <div className="h-[458px] w-[458px] border flex items-center overflow-hidden">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "",
                  isFluidWidth: true,
                  src: currentProduct.thumb || currentImage,
                },
                largeImage: {
                  src: currentProduct.thumb || currentImage,
                  width: 1800,
                  height: 1500,
                },
              }}
            />
          </div>
          <div className="w-[458px]">
            <Slider className="image-slider flex gap-2" {...settings}>
              {currentProduct.images.length === 0 &&
                product?.images?.map((el, index) => (
                  <div key={index}>
                    <img
                      onClick={(e) => handleClickImage(e, el)}
                      src={el}
                      alt="sub-product"
                      className="h-[143px] w-[143px] object-cover border cursor-pointer"
                    />
                  </div>
                ))}
              {currentProduct.images.length > 0 &&
                currentProduct.images?.map((el, index) => (
                  <div key={index}>
                    <img
                      onClick={(e) => handleClickImage(e, el)}
                      src={el}
                      alt="sub-product"
                      className="h-[143px] w-[143px] object-cover border cursor-pointer"
                    />
                  </div>
                ))}
            </Slider>
          </div>
        </div>
        <div className="w-2/5 pr-[24px] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[30px] font-semibold">{`${formatMoney(
              formatPrice(currentProduct.price || product?.price),
            )} VNĐ`}</h2>
            <span className="text-sm text-main">{`In stock: ${product?.quantity}`}</span>
          </div>

          <div className="flex items-center gap-1">
            {renderStarFromNumber(product?.totalRating)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
            <span className="text-sm text-main italic">{`(sold: ${product?.sold} pieces)`}</span>
          </div>
          <ul className="list-square text-sm text-gray-500 pl-5">
            {product?.description?.length > 1 &&
              product?.description?.map((el, index) => (
                <li className="leading-6" key={index}>
                  {el}
                </li>
              ))}
            {product?.description?.length === 1 && (
              <div
                className="text-sm line-clamp-[10] mb-8"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product?.description[0]),
                }}
              ></div>
            )}
          </ul>
          <div className="my-4 flex gap-4">
            <span className="font-semibold">Color</span>
            <div className="flex flex-wrap gap-4 items-center w-full">
              <div
                onClick={() => setVarriants(null)}
                className={clsx(
                  "flex items-center gap-2 p-2 border cursor-pointer",
                  !varriants && "border-red-500",
                )}
              >
                <img
                  src={product?.thumb}
                  alt="thumb"
                  className="w-8 h-8 rounded-md object-cover"
                />
                <span className="flex flex-col">
                  <span>{product?.color}</span>
                  <span className="text-sm">{product?.price}</span>
                </span>
              </div>
              {product?.varriants?.map((el) => (
                <div
                  onClick={() => setVarriants(el.sku)}
                  className={clsx(
                    "flex items-center gap-2 p-2 border cursor-pointer",
                    varriants === el.sku && "border-red-500",
                  )}
                >
                  <img
                    src={el?.thumb}
                    alt="thumb"
                    className="w-8 h-8 rounded-md object-cover"
                  />
                  <span className="flex flex-col">
                    <span>{el?.color}</span>
                    <span className="text-sm">{el?.price}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity</span>
              <SelectQuantity
                quantity={quantity}
                handleQuantity={handleQuantity}
                handleChangleQuantity={handleChangleQuantity}
              />
            </div>
            <Button fw>Add to Cart</Button>
          </div>
        </div>
        <div className="w-1/5">
          {prodcutExtraInfomation?.map((el) => (
            <ProdcutExtraInfoItem
              key={el.id}
              icon={el.icon}
              title={el.title}
              sub={el.sub}
            />
          ))}
        </div>
      </div>
      <div className="w-main m-auto mt-8">
        <ProductInformation
          totalRating={product?.totalRating}
          ratings={product?.rating}
          nameProduct={product?.title}
          pid={product?._id}
          rerender={rerender}
        />
      </div>
      <div className="w-main m-auto mt-8">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          OTHER CUSTOMER ALSO LIKED
        </h3>
        <div className="mt-4 mx-[-10px] my-8">
          <CustomSlider normal={true} products={relatedProducts} />
        </div>
      </div>
    </div>
  )
}

export default DetailProduct
