import { apiGetOrders, apiGetUserOrders } from "@/apis"
import { CustomSelect, InputForm, Pagination } from "@/components"
import withBaseComponent from "@/hocs/withBaseComponent"
import { statusOrders } from "@/utils/contants"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { createSearchParams, useSearchParams } from "react-router-dom"

const History = ({ navigate, location }) => {
  const [params] = useSearchParams()
  const [orders, setOrders] = useState(null)
  const [counts, setCounts] = useState(0)
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm()

  const q = watch("q")
  const status = watch("status")

  const fetchOrders = async (params) => {
    const response = await apiGetUserOrders({
      ...params,
      limit: +import.meta.env.VITE_REACT_APP_LIMIT,
    })
    if (response.success) {
      setOrders(response.orders)
      setCounts(response.counts)
    }
  }

  useEffect(() => {
    const searchParams = Object.fromEntries([...params])
    fetchOrders(searchParams)
  }, [params])

  const handleSearchSatus = ({ value }) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ status: value }).toString(),
    })
  }

  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-semibold py-4 border-b border-b-blue-200">
        History
      </header>
      <div className="w-full flex justify-end items-center">
        <form className="w-[45%] grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <InputForm
              id={"q"}
              register={register}
              errors={errors}
              fullWidth
              placeholder={"Search order by status,..."}
            />
          </div>
          <div className="col-span-1 flex items-center">
            <CustomSelect
              options={statusOrders}
              value={status}
              onChange={(val) => handleSearchSatus(val)}
              wrapClassname="w-full"
            />
          </div>
        </form>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr className="border bg-sky-900 text-white border-white ">
            <th className="text-center py-2">#</th>
            <th className="text-center py-2">Products</th>
            <th className="text-center py-2">Total</th>
            <th className="text-center py-2">Status</th>
            <th className="text-center py-2">Created At</th>
            <th className="text-center py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((el, index) => (
            <tr className="border-b" key={el._id}>
              <td className="text-center py-2">
                {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                  +import.meta.env.VITE_REACT_APP_LIMIT +
                  index +
                  1}
              </td>
              <td className="text-justify py-2">
                <span className="flex flex-col">
                  {el.products?.map((item) => (
                    <span key={item._id}>
                      {`• ${item.title} - ${item.color}`}
                    </span>
                  ))}
                </span>
              </td>
              <td className="text-center py-2">{el.total + "💲"}</td>
              <td className="text-center py-2">{el.status}</td>
              <td className="text-center py-2">
                {moment(el.createdAt).format("DD/MM/YYYY")}
              </td>
              <td className="text-center py-2">
                {/* <span
                  onClick={() => setEditProduct(el)}
                  className="text-blue-500 inline-block hover:text-orange-500 cursor-pointer px-1"
                >
                  <BiEdit size={20} />
                </span>
                <span
                  onClick={() => handleDeleteProduct(el._id)}
                  className="text-blue-500 inline-block hover:text-orange-500 cursor-pointer px-1"
                >
                  <BiTrash size={20} />
                </span>
                <span
                  onClick={() => setCustomizeVarriant(el)}
                  className="text-blue-500 inline-block hover:text-orange-500 cursor-pointer px-1"
                >
                  <BiCustomize size={20} />
                </span> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w0full flex justify-end my-8 px-4">
        <Pagination totalCount={counts} />
      </div>
    </div>
  )
}

export default withBaseComponent(History)
