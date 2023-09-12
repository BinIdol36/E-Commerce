import { Breadcrumb, Button, OrderItem } from "@/components"
import withBaseComponent from "@/hocs/withBaseComponent"
import { formatMoney } from "@/utils/helper"
import { useSelector } from "react-redux"

const DetailCart = ({ location }) => {
  const { currentCart } = useSelector((state) => state.user)

  return (
    <div className="w-full">
      <div className="h-[81px] flex items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase">My Cart</h3>
          <Breadcrumb category={location.path} />
        </div>
      </div>
      <div className="flex flex-col border my-8 w-main mx-auto">
        <div className="w-full mx-auto font-bold py-3 grid grid-cols-10 bg-gray-200">
          <span className="col-span-6 w-full text-center">Products</span>
          <span className="col-span-1 w-full text-center">Quantity</span>
          <span className="col-span-3 w-full text-center">Price</span>
        </div>
        {currentCart?.map((el) => (
          <OrderItem key={el._id} el={el} defaultQuantity={el.quantity} />
        ))}
      </div>
      <div className="w-main mx-auto flex flex-col mb-12 justify-center items-end gap-3">
        <span className="flex items-center gap-8 text-sm">
          <span>Subtotal:</span>
          <span className="text-main font-bold">{`${formatMoney(
            currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0),
          )} VND`}</span>
        </span>
        <span className="text-xs italic">
          Shipping, taxes, and discounts calculated at checkout.
        </span>
        <Button>Checkout</Button>
      </div>
    </div>
  )
}

export default withBaseComponent(DetailCart)
