import React, { useReducer, useCallback } from 'react'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import initialItems from './infiniteMock.json'

const Item = ({ image, num, style, loading }) => (
  <div style={style} className='list-group-item'>
    <div className='avatar'>{!loading && <img alt='avatar' src={image} />}</div>

    <div className='details'>
      <div className='number'>
        <div className='info'>
          <p className='number'>{loading ? 'Loading....' : `#${num + 1}`}</p>
        </div>
      </div>
    </div>
  </div>
)

const RowComponent = ({ image, num, style, loading }) => {
  return <Item image={image} num={num} style={style} loading={loading} />
}

const ListComponent = ({ items, moreItemsLoading, loadMore }) => {
  const isItemLoaded = useCallback(
    index => {
      return index < items.length - 1
    },
    [items.length]
  )

  const Row = ({ index, style }) => {
    return (
      <RowComponent
        image={items[index]}
        num={index}
        style={style}
        loading={!isItemLoaded(index)}
      />
    )
  }

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={items.length}
      loadMoreItems={loadMore}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          height={500}
          width={500}
          itemCount={items.length}
          itemSize={160}
          className='list-container'
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {Row}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  )
}

const initialState = {
  items: initialItems,
  moreItemsLoading: false
}

const itemReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_MORE_ITEM': {
      return {
        ...state,
        moreItemsLoading: true
      }
    }
    case 'LOAD_MORE_ITEM_SUCCESS': {
      return {
        items: [...state.items, ...action.moreItems],
        moreItemsLoading: false
      }
    }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(itemReducer, initialState)
  const { items, moreItemsLoading } = state

  const loadMore = () => {
    console.log('load more items')
    dispatch({
      type: 'LOAD_MORE_ITEM'
    })
    fetch('https://dog.ceo/api/breeds/image/random/10')
      .then(res => res.json())
      .then(({ message: newItems }) =>
        dispatch({
          type: 'LOAD_MORE_ITEM_SUCCESS',
          moreItems: newItems
        })
      )
  }

  return (
    <>
      <ListComponent
        items={items}
        moreItemsLoading={moreItemsLoading}
        loadMore={loadMore}
      />
      <div className='title'>
        <h1>InfiniteLoader | react-window</h1>
      </div>
    </>
  )
}

export default App
