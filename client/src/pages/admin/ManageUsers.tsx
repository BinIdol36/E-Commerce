import { apiGetUsers, apiUpdateUser, apiDeleteUser } from "@/apis"
import { InputField, InputForm, Pagination, Select, Button } from "@/components"
import useDebounce from "@/hooks/useDebounce"
import { roles } from "@/utils/contants"
import moment from "moment"
import React, { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

const ManageUsers = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    phone: "",
    status: "",
  })
  const [users, setUsers] = useState(null)
  const [queries, setQueries] = useState({
    q: "",
  })
  const [update, setUpdate] = useState(false)
  const [editElm, setEditElm] = useState(null)
  const [params] = useSearchParams()

  const fetchUsers = async (params) => {
    const response = await apiGetUsers({
      ...params,
      limit: import.meta.env.VITE_REACT_APP_LIMIT,
    })
    if (response.success) setUsers(response)
  }

  const render = useCallback(() => {
    setUpdate(!update)
  }, [update])

  const queriesDebounce = useDebounce(queries.q, 800)

  useEffect(() => {
    const queries = Object.fromEntries([...params])

    if (queriesDebounce) queries.q = queriesDebounce

    fetchUsers(queries)
  }, [queriesDebounce, params, update])

  const handleUpdate = async (data) => {
    const response = await apiUpdateUser(data, editElm._id)
    if (response.success) {
      setEditElm(null)
      render()
      toast.success(response.mes)
    } else toast.error(response.mes)
  }

  const handleDeleteUser = (uid) => {
    Swal.fire({
      title: "Are you sure....",
      text: "Are you reaady remove this user?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(uid)
        if (response.success) {
          render()
          toast.success(response.mes)
        } else toast.error(response.mes)
      }
    })
  }

  return (
    <div className="w-full">
      <h1
        className="h-[75px] flex justify-between 
      items-center text-3xl font-bold px-4 border-b"
      >
        <span>Manage users</span>
      </h1>
      <div className="w-full p-4">
        <div className="flex justify-end py-4">
          <InputField
            nameKey={"q"}
            value={queries.q}
            setValue={setQueries}
            style={"w-[500px]"}
            placeholder={"Search name or mail user..."}
            isHideLabel
          />
        </div>
        <form onSubmit={handleSubmit(handleUpdate)}>
          {editElm && <Button type="submit">Update</Button>}
          <table className="table-auto mb-6 text-left w-full">
            <thead className="font-bold bg-gray-700 text-[13px] text-white">
              <tr className="border border-gray-500">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Email address</th>
                <th className="px-4 py-2">FirstName</th>
                <th className="px-4 py-2">LastName</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Create At</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.users?.map((el, index) => (
                <tr key={el._id} className="border border-gray-500">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    {editElm?._id === el._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        id={"email"}
                        validate={{
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        }}
                        defaultValue={editElm?.email}
                      />
                    ) : (
                      <span>{el.email}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editElm?._id === el._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        id={"firstName"}
                        validate={{ required: "Require fill." }}
                        defaultValue={editElm?.firstName}
                      />
                    ) : (
                      <span>{el.firstName}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editElm?._id === el._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        id={"lastName"}
                        validate={{ required: "Require fill." }}
                        defaultValue={editElm?.lastName}
                      />
                    ) : (
                      <span>{el.lastName}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editElm?._id === el._id ? (
                      <Select />
                    ) : (
                      <span>
                        {roles.find((role) => +role.code === +el.role)?.value}
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editElm?._id === el._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        id={"phone"}
                        validate={{
                          required: "Require fill.",
                          pattern: {
                            value: /^[62|0]+\d{9}/gi,
                            message: "Invalid phone number",
                          },
                        }}
                        defaultValue={editElm?.phone}
                      />
                    ) : (
                      <span>{el.phone}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editElm?._id === el._id ? (
                      <Select />
                    ) : (
                      <span>{el.isBlocked ? "Block" : "Active"}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {moment(el.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="py-2 px-4">
                    {editElm?._id === el._id ? (
                      <span
                        onClick={() => setEditElm(null)}
                        className="px-2 text-orange-600 hover:underline cursor-pointer"
                      >
                        Back
                      </span>
                    ) : (
                      <span
                        onClick={() => setEditElm(el)}
                        className="px-2 text-orange-600 hover:underline cursor-pointer"
                      >
                        Edit
                      </span>
                    )}
                    <span
                      onClick={() => handleDeleteUser(el._id)}
                      className="px-2 text-orange-600 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>

        <div className="w-full flex justify-end">
          <Pagination totalCount={users?.counts} />
        </div>
      </div>
    </div>
  )
}

export default ManageUsers
