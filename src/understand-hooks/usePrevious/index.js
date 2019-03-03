import React, { useState, useEffect, useRef } from 'react'

function usePrevious(value) {
  const prevValue = useRef()

  useEffect(() => {
    prevValue.current = value
  })

  return prevValue.current
}

export default function Counter() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count</button>
      <h1>
        Counter: {count} Pre-count {prevCount}
      </h1>
    </div>
  )
}
