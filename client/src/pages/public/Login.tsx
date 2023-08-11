import React, { useState, useCallback } from "react"
import { InputField, Button } from "../../components"
import { apiRegister, apiLogin, apiForgotPassword } from "../../apis"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import path from "../../utils/path"
import { register } from "../../store/user/userSlice"
import { useDispatch } from "react-redux"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  })

  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [isRegister, setisRegister] = useState(false)
  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
    })
  }
  const [email, setEmail] = useState("")

  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email })
    console.log(response)
  }

  const handleSubmit = useCallback(async () => {
    const { firstName, lastName, phone, ...data } = payload
    if (isRegister) {
      const response = await apiRegister(payload)
      if (response.success) {
        Swal.fire("Congratulation", response.mes, "success").then(() => {
          setisRegister(false)
          resetPayload()
        })
      } else Swal.fire("Oops!", response.mes, "error")
    } else {
      const response = await apiLogin(data)
      if (response.success) {
        dispatch(
          register({
            isLoggedIn: true,
            token: response.accessToken,
            userData: response.userData,
          }),
        )
        navigate(`/${path.HOME}`)
      } else Swal.fire("Oops!", response.mes, "error")
    }
  }, [payload, isRegister])

  return (
    <div className="w-screen h-screen relative">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-white flex flex-col items-center py-8 z-50">
        <div className="flex flex-col gap-4">
          <label htmlFor="email">Enter your email:</label>
          <input
            type="text"
            id="email"
            className="w-[800px] pb-2 border-b outline-none placeholder:text-sm"
            placeholder="Ex: email@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex items-center justify-end w-full">
            <Button name="Submit" handleOnClick={handleForgotPassword} />
          </div>
        </div>
      </div>
      <img
        src="https://img.freepik.com/premium-photo/shopping-cart-card-icon-discounts_116441-26066.jpg"
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 bottom-0 left-0 right-1/2 flex items-center justify-center">
        <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]">
          <h1 className="text-[28px] font-semibold text-main mb-8">
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister && (
            <div className="flex items-center gap-2">
              <InputField
                value={payload.firstName}
                setValue={setPayload}
                nameKey="firstName"
              />
              <InputField
                value={payload.lastName}
                setValue={setPayload}
                nameKey="lastName"
              />
            </div>
          )}
          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
          />
          {isRegister && (
            <InputField
              value={payload.phone}
              setValue={setPayload}
              nameKey="phone"
            />
          )}
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
            type="password"
          />
          <Button
            name={isRegister ? "Register" : "Login"}
            handleOnClick={handleSubmit}
            fw
          />
          <div className="w-full flex items-center justify-between my-2 text-sm">
            {!isRegister && (
              <span className="text-blue-500 hover:underline cursor-pointer">
                Forgot your account?
              </span>
            )}
            {!isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setisRegister(true)}
              >
                Create account
              </span>
            )}
            {isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer w-full text-center"
                onClick={() => setisRegister(false)}
              >
                Go Login
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
