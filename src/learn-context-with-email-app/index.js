import React from 'react'
import LoginPage from './LoginPage'
import MainPage from './MainPage'
import { UserProvider, UserConsumer } from './UserContext'
import { EmailProvider } from './EmailContext'
import { NotificationProvider } from './NotificationContext'
import './index.css'

function Root() {
  return (
    <NotificationProvider>
      <UserProvider>
        <EmailProvider>
          <UserConsumer>
            {({ user }) => {
              return user ? <MainPage /> : <LoginPage />
            }}
          </UserConsumer>
        </EmailProvider>
      </UserProvider>
    </NotificationProvider>
  )
}

export default Root
