import React, { InputHTMLAttributes, ReactEventHandler } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const DInput: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div className="flex flex-col pb-2">
      <label htmlFor={id}>{ label }</label>
      <input
        {...props}
        id={id}
        type="text"
        className="border border-black rounded focus:outline-none focus:border-2 focus:border-blue-500 p-1"
      />
    </div>
  )
}

export default DInput
