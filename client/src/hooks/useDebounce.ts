import React, { useEffect, useState } from "react"

const useDebounce = (value, ms) => {
  const [debounceValue, setDebounceValue] = useState("")

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      setDebounceValue(value)
    }, ms)

    return () => {
      clearTimeout(setTimeoutId)
    }
  }, [value, ms])

  return debounceValue
}

export default useDebounce

// Muốn: khi mà nhập thay đổi giá thì gọi API
// Vấn đề: gọi API liên tục theo mỗi lượt nhập
// Resolve: chỉ call api khi mà người dùng nhập xong
// Thời gian onChange

// Tách price thành 2 biến
// 1. biến để phục vụ UI, gõ tới đâu lưu tới đó => UI render
// 2. biến thứ 2 dùng để quyết định call API => setTimeout => biến sẽ được gán sau một khoảng thời gian
