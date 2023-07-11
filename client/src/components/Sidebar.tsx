import React, { useEffect, useState } from "react"
import { apiGetCategories } from "../apis/app"
import { NavLink } from "react-router-dom"

function Sidebar() {
  const [categories, setCategories] = useState(null)

  const fetchCategories = async () => {
    const response = await apiGetCategories()
    if (response.success) setCategories(response.prodCategories)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  console.log(categories)

  return <div>Sidebar</div>
}

export default Sidebar
