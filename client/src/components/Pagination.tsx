import React from "react"
import usePagination from "../hooks/usePagination"
import { useParams } from "react-router-dom"
import { PaginationItem } from "."

const Pagination = ({ totalCount = 66 }) => {
  const pagination = usePagination(totalCount, 2)
  return (
    <div className="flex items-center">
      {pagination?.map((el) => (
        <PaginationItem key={el}>{el}</PaginationItem>
      ))}
    </div>
  )
}

export default Pagination
