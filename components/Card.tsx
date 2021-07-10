interface Card {
  title: string
  author: string
}
export default function Card({ title, author }: Card) {
	return (
    <div className="border border-blue-500 p-2 w-1/4">
      <div className="bg-gray-300" style={{ height: '50px' }}></div>
      <p>{ title }</p>
      <p>{ author }</p>
    </div>
  )
}
