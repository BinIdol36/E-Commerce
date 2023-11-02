import { createSlice } from "@reduxjs/toolkit"
import * as actions from "./asyncActions"

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
    isLoading: false,
    mes: "",
    currentCart: [],
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.token = action.payload.token
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.token = null
      state.current = null
    },
    clearMessage: (state) => {
      state.mes = ""
    },
    updateCart: (state, action) => {
      const { pid, color, quantity } = action.payload
      const updatingCart = JSON.parse(JSON.stringify(state.currentCart))

      state.currentCart = updatingCart.map((el) => {
        if (el.color === color && el.product?._id === pid) {
          return { ...el, quantity }
        } else return el
      })
    },
  },
  // Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(actions.getCurrent.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true
    })

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false
      state.current = action.payload
      state.isLoggedIn = true
      state.currentCart = action.payload.cart
    })

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(actions.getCurrent.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false
      state.current = null
      state.isLoggedIn = false
      state.token = null
      state.mes = "Login session has expired. Please log in again!"
    })
  },
})

export const { login, logout, clearMessage, updateCart } = userSlice.actions

export default userSlice.reducer // reducer là export cả reducers vs extraReducers
