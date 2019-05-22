import React from 'react'
import { FixedSizeList, VariableSizeList } from 'react-window'

import RowComponent from './RowComponent'

import items from './mock.json'

const Row = ({ index, style }) => {
  return <RowComponent image={items[index]} num={index} style={style} />
}
const getItemSize = () => Math.floor(Math.random() * 230) + 130

// layout="horizontal" for virtual horizontal list
const ListComponent = () => (
  // <FixedSizeList
  //   height={500}
  //   width={500}
  //   itemSize={120}
  //   itemCount={items.length}
  //   className='list-container'
  // >
  //   {Row}
  // </FixedSizeList>
  <VariableSizeList
    height={500}
    width={500}
    itemSize={getItemSize}
    itemCount={items.length}
    className='list-container'
  >
    {Row}
  </VariableSizeList>
)

export default ListComponent
