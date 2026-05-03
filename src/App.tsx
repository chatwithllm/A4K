import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">KidsSpark</h1>
        <p className="text-lg text-gray-600 mb-6">
          A kids educational PWA with two modes and trilingual support.
        </p>
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
