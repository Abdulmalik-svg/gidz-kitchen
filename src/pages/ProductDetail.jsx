import { useParams } from "react-router-dom"

export default function ProductDetail() {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">
          Product Detail Page
        </h1>
        <p className="text-gray-700">
          Showing details for product with ID: <span className="font-semibold">{id}</span>
        </p>
      </div>
    </div>
  )
}
