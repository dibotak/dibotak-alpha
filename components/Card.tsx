import React from 'react'
interface Card {
  title: string
  subtitle: string
  action: () => any
}
const Card: React.FC<Card> = ({ title, subtitle, action }) => {
	return (
    <div className="border border-blue-500 p-2">
      <div className="bg-gray-300" style={{ height: '50px' }}></div>
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
