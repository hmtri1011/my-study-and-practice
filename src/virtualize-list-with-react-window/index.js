import React from 'react'
import ListComponent from './ListComponent'
import './virtualList.css'
import InfiniteLoader from './InfiniteLoader'

function App() {
  // return (
  //   <>
  //     <ListComponent />
  //     <div className='title'>
  //       <h1>FixedSizeList | react-window</h1>
  //     </div>
  //   </>
  // )
  return <InfiniteLoader />
}

export default App
