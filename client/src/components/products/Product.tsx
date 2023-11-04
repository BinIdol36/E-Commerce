import React, { useState, memo } from "react"
import { formatMoney, renderStarFromNumber } from "@/utils/helper"
import trending from "@/assets/trending.png"
import label from "@/assets/new.png"
import { SelectOption } from ".."
import icons from "@/utils/icons"
import withBaseComponent from "@/hocs/withBaseComponent"
import { showModal } from "@/store/app/appSlice"
import { DetailProduct } from "@/pages/public"
import { apiUpdateCart, apiUpdateWishlist } from "@/apis"
import { toast } from "react-toastify"
import { getCurrent } from "@/store/user/asyncActions"
import { useSelector } from "react-redux"
import Swal from "sweetalert2"
import path from "@/utils/path"
import { createSearchParams } from "react-router-dom"
import clsx from "clsx"

const {
  AiFillEye,
  BsFillSuitHeartFill,
  BsFillCartCheckFill,
  BsFillCartPlusFill,
} = icons

const Product = ({
  productData,
  isNew,
  normal,
  navigate,
  dispatch,
  location,
  classname,
}) => {
  const [isShowOption, setIsShowOption] = useState(false)
  const { current } = useSelector((state) => state.user)

  const handleClickOptions = async (e, flag) => {
    e.stopPropagation()
    if (flag === "CART") {
      if (!current)
        return Swal.fire({
          title: "Almost...",
          text: "Please login first!",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Go login page",
          cancelButtonText: "Not now",
        }).then((rs) => {
          if (rs.isConfirmed)
            navigate({
              pathname: `/${path.LOGIN}`,
              search: createSearchParams({
                redirect: location.pathname,
              }).toString(),
            })
        })

      const response = await apiUpdateCart({
        pid: productData?._id,
        color: productData?.color,
        quantity: 1,
        price: productData?.price,
        thumbnail: productData?.thumb,
        title: productData?.title,
      })

      if (response.success) {
        toast.success(response.mes)
        dispatch(getCurrent())
      } else toast.error(response.mes)
    }

    if (flag === "WISHLIST") {
      const response = await apiUpdateWishlist(productData._id)
      if (response.success) {
        dispatch(getCurrent())
        toast.success(response.mes)
      } else toast.error(response.mes)
    }
    if (flag === "QUICK_VIEW") {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <DetailProduct
              isQuickView
              data={{ pid: productData?._id, category: productData?.category }}
            />
          ),
        }),
      )
    }
  }

  return (
    <div className={clsx("w-full text-base px-[10px]", classname)}>
      <div
        className="w-full border p-[15px] flex flex-col items-center cursor-pointer"
        onClick={(e) =>
          navigate(
            `/${productData?.category?.toLowerCase()}/${productData?._id}/${
              productData?.title
            }`,
          )
        }
        onMouseEnter={(e) => {
          e.stopPropagation()
          setIsShowOption(true)
        }}
        onMouseLeave={(e) => {
          e.stopPropagation()
          setIsShowOption(false)
        }}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className="absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top">
              <span
                title="quick view"
                onClick={(e) => handleClickOptions(e, "QUICK_VIEW")}
              >
                <SelectOption icon={<AiFillEye />} />
              </span>
              {current?.cart?.some(
                (el) => el.product._id === productData._id,
              ) ? (
                <span title="Added to Cart">
                  <SelectOption
                    icon={<BsFillCartCheckFill color={"green"} />}
                  />
                </span>
              ) : (
                <span
                  onClick={(e) => handleClickOptions(e, "CART")}
                  title="Add to Cart"
                >
                  <SelectOption icon={<BsFillCartPlusFill />} />
                </span>
              )}
              <span
                title="Add to wishlist"
                onClick={(e) => handleClickOptions(e, "WISHLIST")}
              >
                <SelectOption
                  icon={
                    <BsFillSuitHeartFill
                      color={
                        current?.wishList?.some(
                          (i) => i._id === productData._id,
                        )
                          ? "pink"
                          : "black"
                      }
                    />
                  }
                />
              </span>
            </div>
          )}
          <img
            src={
              productData?.thumb ||
              "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
            }
            alt=""
            className="w-[274px] h-[274px] object-cover"
          />
          {!normal && (
            <img
              src={isNew ? label : trending}
              alt=""
              className="absolute w-[100px] h-[35px] top-0 right-0 object-cover"
            />
          )}
        </div>
        <div className="flex mt-[15px] items-start w-full gap-1 flex-col">
          <span className="flex h-4">
            {renderStarFromNumber(productData?.totalRating)?.map(
              (el, index) => (
                <span key={index}>{el}</span>
              ),
            )}
          </span>
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VND`}</span>
        </div>
      </div>
    </div>
  )
}

export default withBaseComponent(memo(Product))
