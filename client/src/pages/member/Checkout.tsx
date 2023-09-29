import React from "react"
import payment from "@/assets/payment.svg"
import { useSelector } from "react-redux"
import { formatMoney } from "@/utils/helper"
import { InputForm, Paypal } from "@/components"
import { useForm } from "react-hook-form"

const Checkout = () => {
  const { currentCart } = useSelector((state) => state.user)
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm()

  return (
    <div className="p-8 w-full gap-6 grid grid-cols-10 h-full max-h-screen overflow-y-auto">
      <div className="w-full flex justify-center items-center col-span-4">
        <img src={payment} alt="payment" className="h-[70%] object-contain" />
      </div>
      <div className="flex flex-col w-full justify-center col-span-6 gap-6">
        <h2 className="text-3xl mb-6 font-bold">Checkout your order</h2>
        <div className="flex w-full gap-6">
          <table className="table-auto flex-1">
            <thead>
              <tr className="border bg-gray-200 p-2">
                <th className="text-start p-2">Products</th>
                <th className="text-center p-2">Quantity</th>
                <th className="text-end p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {currentCart?.map((el) => (
                <tr key={el._id} className="border">
                  <td className="text-start p-2">{el.title}</td>
                  <td className="text-center p-2">{el.quantity}</td>
                  <td className="text-end p-2">
                    {formatMoney(el.price * el.quantity) + " VND"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex-1 flex flex-col justify-between gap-[45px]">
            <div className="flex flex-col gap-6 text-sm">
              <span className="flex items-center gap-8 text-sm">
                <span className="font-medium">Subtotal:</span>
                <span className="text-main font-bold">{`${formatMoney(
                  currentCart?.reduce(
                    (sum, el) => +el?.price * el.quantity + sum,
                    0,
                  ),
                )} VND`}</span>
              </span>
              <InputForm
                label={"Your address"}
                register={register}
                errors={errors}
                id={"address"}
                validate={{
                  required: "Need fill this field",
                }}
                placeholder={"Please type your address for ship"}
                style={"text-sm"}
              />
            </div>
            <div className="w-full mx-auto">
              <Paypal
                amount={Math.round(
                  +currentCart?.reduce(
                    (sum, el) => +el?.price * el.quantity + sum,
                    0,
                  ) / 23500,
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
