import { apiGetProducts } from "@/apis"
import { InputForm, Pagination } from "@/components"
import useDebounce from "@/hooks/useDebounce"
import moment from "moment"
import React, { useEffect, useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom"
import { UpdateProduct } from "."

const ManageProducts = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const {
    register,
    formState: { errors },
    watch,
  } = useForm()
  const [products, setProducts] = useState(null)
  const [counts, setCounts] = useState(0)
  const [editProduct, setEditProduct] = useState(null)
  const [update, setUpdate] = useState(false)

  const render = useCallback(() => {
    setUpdate(!update)
  }, [])

  const fetchProducts = async (params) => {
    const response = await apiGetProducts({
      ...params,
      limit: +import.meta.env.VITE_REACT_APP_LIMIT,
    })
    if (response.success) {
      setProducts(response.products)
      setCounts(response.counts)
    }
  }

  const queryDebounce = useDebounce(watch("q"), 800)

  useEffect(() => {
    if (queryDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queryDebounce }).toString(),
      })
    } else
      navigate({
        pathname: location.pathname,
      })
  }, [queryDebounce])

  useEffect(() => {
    const searchParams = Object.fromEntries([...params])

    fetchProducts(searchParams)
  }, [params, update])

  return (
    <div className="w-full flex flex-col gap-4 relative">
      {editProduct && (
        <div className="absolute inset-0 min-h-screen bg-gray-100 z-50">
          <UpdateProduct editProduct={editProduct} render={render} />
        </div>
      )}
      <div className="h-[69px] w-full"></div>
      <div
        className="p-4 border-b w-full flex bg-gray-100
      justify-between items-center fixed top-0"
      >
        <h1 className="text-3xl font-bold tracking-tight">Manage products</h1>
      </div>
      <div className="w-full flex justify-end items-center px-4">
        <form className="w-[45%]">
          <InputForm
            id={"q"}
            register={register}
            errors={errors}
            fullWidth
            placeholder={"Search product by title, description,..."}
          />
        </form>
      </div>
      <table className="table-auto">
        <thead>
          <tr className="border bg-sky-900 text-white border-white ">
            <th className="text-center py-2">Order</th>
            <th className="text-center py-2">Thumb</th>
            <th className="text-center py-2">Title</th>
            <th className="text-center py-2">Brand</th>
            <th className="text-center py-2">Category</th>
            <th className="text-center py-2">Price</th>
            <th className="text-center py-2">Quantity</th>
            <th className="text-center py-2">Sold</th>
            <th className="text-center py-2">Color</th>
            <th className="text-center py-2">Ratings</th>
            <th className="text-center py-2">UpdatedAt</th>
            <th className="text-center py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((el, index) => (
            <tr className="border-b" key={el._id}>
              <td className="text-center py-2">
                {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                  +import.meta.env.VITE_REACT_APP_LIMIT +
                  index +
                  1}
              </td>
              <td className="text-center py-2">
                <img
                  src={el.thumb}
                  alt="thumb"
                  className="w-12 h-12 object-cover"
                />
              </td>
              <td className="text-center py-2">{el.title}</td>
              <td className="text-center py-2">{el.brand}</td>
              <td className="text-center py-2">{el.category}</td>
              <td className="text-center py-2">{el.price}</td>
              <td className="text-center py-2">{el.quantity}</td>
              <td className="text-center py-2">{el.sold}</td>
              <td className="text-center py-2">{el.color}</td>
              <td className="text-center py-2">{el.totalRating}</td>
              <td className="text-center py-2">
                {moment(el.updatedAt).format("DD/MM/YYYY")}
              </td>
              <td className="text-center py-2">
                <span
                  onClick={() => setEditProduct(el)}
                  className="text-blue-500 hover:underline cursor-pointer px-1"
                >
                  Edit
                </span>
                <span className="text-blue-500 hover:underline cursor-pointer px-1">
                  Remove
                </span>
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

export default ManageProducts
