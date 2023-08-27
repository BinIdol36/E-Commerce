import React from "react"
import usePagination from "@/hooks/usePagination"
import { useSearchParams } from "react-router-dom"
import { PaginationItem } from "."

const Pagination = ({ totalCount, productNumber }) => {
  const pagination = usePagination(totalCount, 2)
  const [params] = useSearchParams()

  const range = () => {
    const curentPage = +params.get("page")
    const pageSize = +import.meta.env.VITE_REACT_APP_PRODUCT_LIMIT || 10
    const start = (curentPage - 1) * pageSize + 1
    const end = Math.min(curentPage * pageSize, totalCount)

    return `${start} - ${end}`
  }

  // 3 => 21 - 30

  return (
    <div className="flex w-main justify-between items-center">
      {!+params.get("page") && (
        <span className="text-sm italic">{`Show products 1 - ${
          +import.meta.env.VITE_REACT_APP_PRODUCT_LIMIT || 10
        } of ${totalCount}`}</span>
      )}
      {params.get("page") && (
        <span className="text-sm italic">{`Show products ${range()} of ${totalCount}`}</span>
      )}
      <div className="flex items-center">
        {pagination?.map((el) => (
          <PaginationItem key={el}>{el}</PaginationItem>
        ))}
      </div>
    </div>
  )
}

export default Pagination
