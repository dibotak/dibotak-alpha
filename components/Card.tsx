import React from 'react'
import Image from 'next/image'

interface Card {
  title: string
  subtitle: string
  imgUrl: string
  action: () => any
}
const Card: React.FC<Card> = ({ title, subtitle, imgUrl, action }) => {
	return (
    <div className="border border-blue-500 p-2">
      <div className="p-2 flex justify-center">
        <Image src={imgUrl} alt="" layout="fill" />
      </div>
      <h5 className="text-lg font-semibold">{ title }</h5>
      <h6>{ subtitle }</h6>
      <div className="flex justify-end">
        <button onClick={action}
          className="bg-blue-600 hover:bg-blue-800 rounded-md px-2 py-1 text-white"
        >Pinjam</button>
      </div>
    </div>
  )
}

export default Card
