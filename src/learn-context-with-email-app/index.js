import React from 'react'
import LoginPage from './LoginPage'
import MainPage from './MainPage'
import { UserProvider, UserConsumer } from './UserContext'
import { EmailProvider } from './EmailContext'
import './index.css'

function Root() {
  return (
    <UserProvider>
      <EmailProvider>
        <UserConsumer>
          {({ user }) => {
            return user ? <MainPage /> : <LoginPage />
          }}
        </UserConsumer>
      </EmailProvider>
    </UserProvider>
  )
}

export default Root
