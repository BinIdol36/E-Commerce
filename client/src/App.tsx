import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import {
  Login,
  Home,
  Public,
  FAQ,
  Services,
  DetailProduct,
  Blogs,
  Products,
  FinalRegister,
  ResetPassword,
} from "@/pages/public"
import path from "@/utils/path"
import { getCategories } from "@/store/app/asyncActions"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Modal } from "@/components"

function App() {
  const dispatch = useDispatch()
  const { isShowModal, modalChildren } = useSelector((state) => state.app)
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  return (
    <div className="font-main relative">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
          <Route
            path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE}
            element={<DetailProduct />}
          />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        </Route>
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  )
}

export default App
