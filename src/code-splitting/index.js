import React, { useState, lazy, Suspense } from 'react'
import styles from './avatar.module.scss'

const AvatarComponent = lazy(() =>
  import(/* webpackChunkName: "avatar" */ './AvatarComponent')
)
const InfoComponent = lazy(() =>
  import(/* webpackChunkName: "info" */ './InfoComponent')
)
const MoreInfoComponent = lazy(() =>
  import(/* webpackChunkName: "more-info" */ './MoreInfoComponent')
)

function App() {
  const [details, setDetail] = useState(false)
  const showDetails = () => {
    setDetail(true)
  }
  const renderLoader = () => <div className={styles.loader} />

  return (
    <div className={styles.App}>
      {!details && <button onClick={showDetails}>CLICK ME</button>}
      {details && (
        <Suspense fallback={renderLoader()}>
          <AvatarComponent />
          <InfoComponent />
          <MoreInfoComponent />
        </Suspense>
      )}
    </div>
  )
}

export default App
