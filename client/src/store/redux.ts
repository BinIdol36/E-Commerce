import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import appSlice from "./app/appSlice"
import productSlice from "./products/productSlice"

export const store = configureStore({
  reducer: {
    app: appSlice,
    products: productSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
