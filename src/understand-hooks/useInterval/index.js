import React, { useState, useEffect, useRef } from 'react'

/* Note: useRef can use as mutable variable, clean-up function is also run after every render */

function useInterval(callback, delay) {
  const callbackRef = useRef(null)
  //store latest callback
  useEffect(() => {
    callbackRef.current = callback
  })
  useEffect(() => {
    function execute() {
      callbackRef.current()
    }
    if (delay !== null) {
      const id = setInterval(execute, delay)
      return () => {
        console.log('With every render, clean up function is also called')
        clearInterval(id)
      }
    }
  }, [delay])
}

export default function Counter() {
  const [count, setCount] = useState(0)
  const [delay, setDelay] = useState(1000)
  const [running, setIsRunning] = useState(false)

  useInterval(() => {
    setCount(count + 1)
  }, delay)

  function handleDelayChange(e) {
    setDelay(Number(e.target.value))
  }

  return (
    <>
      <h1>{count}</h1>
      <input value={delay} onChange={handleDelayChange} />
      <button onClick={() => setCount(count + 1)}>Count</button>
    </>
  )
}
