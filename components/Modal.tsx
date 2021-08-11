import React from 'react'

export interface Modal {
  show: boolean
  title: string
  footer?: React.ReactNode
  close: () => any
}

const Modal: React.FC<Modal> = ({ show, title, close, footer, children }) => {
  return show ?
      <div className="fixed z-10 top-0 left-0 right-0 bottom-0 h-full max-h-full bg-opacity-10 bg-black">
        <div className="w-1/2 mt-20 bg-white mx-auto rounded-md p-2 shadow-md" style={{ minWidth: '300px' }}>
          <div className="flex justify-between">
            <h4 className="text-lg font-semibold">{ title }</h4>
            <button className="p-2" onClick={close}>X</button>
          </div>
          { children }
          { footer }
        </div>
      </div>
      :
      <div>
      </div>
}

export default Modal
