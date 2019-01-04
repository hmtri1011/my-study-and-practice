import React from 'react'
import LoginPage from './LoginPage'
import MainPage from './MainPage'
import { UserProvider, UserConsumer } from './UserContext'
import './index.css'

function Root() {
  return (
    <UserProvider>
      <UserConsumer>
        {({ user }) => {
          return user ? <MainPage /> : <LoginPage />
        }}
      </UserConsumer>
    </UserProvider>
  )
}

export default Root
