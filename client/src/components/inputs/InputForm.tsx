import clsx from "clsx"
import React, { memo } from "react"
clsx

const InputForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  fullWidth,
  defaultValue,
}) => {
  return (
    <div className="flex flex-col h-[78px] gap-2">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx("form-input", fullWidth && "w-full")}
        defaultValue={defaultValue}
      />
      {errors[id] && (
        <small className="text-xs text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  )
}

export default memo(InputForm)
