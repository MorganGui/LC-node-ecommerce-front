import { useState } from 'react'

export default () => {
  const [count, setCount] = useState(0)

  return (
    <div className="card">
      <button onClick={() => setCount((count) => count + 1)} className="glowing">
        count is {count}
      </button>
    </div>
  )
}
