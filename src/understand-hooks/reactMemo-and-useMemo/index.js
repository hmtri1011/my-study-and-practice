import React, { useState, useEffect, useMemo, useRef } from 'react'
//lesson
//Pure component use shallow compare => not deep compare
//react memo same as pure component not deep compare
//react memo for re-renden condition treat for all props
//useMemo use for not create function (if params function not changed) when component is re-render

//useMemo has a different use case than React.memo.
//It's not about preventing an entire component from re-rendering
//it's about simply memoizing some data. Very unrelated in usage. The only similarity is that
//React.memo() and useMemo() both involve "if you see the same inputs as last time, don't do any extra work
//return what you had before" but React.memo is for wrapping up entire components,
//and useMemo() is for whatever you want to return from the callback.

// class Sum extends React.Component {
//   shouldComponentUpdate(nextProps) {
//     const oldProps = this.props
//     return (
//       oldProps.a !== nextProps.a ||
//       oldProps.b !== nextProps.b ||
//       JSON.stringify(oldProps.style) !== JSON.stringify(nextProps.style)
//     )
//   }

//   render() {
//     const { a, b, style = {} } = this.props
//     return <div style={style}>Sum: {a + b}</div>
//   }
// }
function setStyle(on) {
  console.log('ahihi setstyle ran')
  if (on) {
    return {
      color: 'green'
    }
  }
  return {
    color: 'red'
  }
}

function sumExpensively(a, b) {
  console.log('ahihi sumExpensively ran')
  return a + b
}

function doExpensiveProduct(a, b) {
  console.log('ahihi product ran')
  return a * b
}

function useMemoWithCustomCondition(fn, memoFn) {
  const shouldUpdateCondition = memoFn()
  const idRef = useRef(0)
  if (shouldUpdateCondition) {
    idRef.current = idRef.current + 1
  }
  return useMemo(fn, [idRef.current])
}

const Sum = ({ a, b, on }) => {
  const style = useMemo(() => setStyle(on), [on])
  const expensiveSum = useMemo(() => sumExpensively(a, b), [a, b])
  // const conditionRerun = useMemo(() => expensiveSum % 5 === 0, [expensiveSum])
  // const expensiveProductWhenSumDivisibleFive = useMemo(() => doExpensiveProduct(a, b), [
  //   conditionRerun
  // ])
  //above not works because first conditionRerun = true then expensiveSum change it became false
  // => it changed => product ran

  //working solution
  //#1
  const expensiveProductWhenSumDivisibleFive = useMemoWithCustomCondition(
    () => doExpensiveProduct(a, b),
    () => expensiveSum % 5 === 0
  )

  //#2
  // const expensiveSumDivisibleFive = useMemoWithCustomCondition(
  //   () => sumExpensively(a, b),
  //   () => (a + b) % 5 === 0
  // )
  // const expensiveProductWhenSumDivisibleFive = useMemo(
  //   () => doExpensiveProduct(a, b),
  //   [expensiveSumDivisibleFive]
  // )

  useEffect(() => {
    console.log('ahihi updated')
  })

  return (
    <div style={style}>
      <div>Sum: {expensiveSum}</div>
      <div>Product: {expensiveProductWhenSumDivisibleFive}</div>
    </div>
  )
}

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(true)
  return () => setValue(!value)
}

function App() {
  const [count, setCount] = useState(0)
  const [on, setToggle] = useState(true)
  const forceUpdate = useForceUpdate()

  return (
    <div>
      <h3>React Memo vs useMemo vs shouldComponentUpdate</h3>
      <div>Count: {count}</div>
      <div>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <hr />
      <div>On: {on.toString()}</div>
      <div>
        <button onClick={() => setToggle(!on)}>Toogle</button>
      </div>
      <hr />
      <Sum
        a={count}
        b={count * 2}
        on={on}
        // style={{
        //   color: on ? 'green' : 'red'
        // }}
      />
      <button onClick={forceUpdate}>Force Update</button>
    </div>
  )
}

export default App
