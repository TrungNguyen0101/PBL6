/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'
import { createContext, useState } from 'react'

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState()
  const [accessToken, setAccessToken] = useState()

  const contextValue = useMemo(() => {
    return { user, setUser, accessToken, setAccessToken }
  }, [user, setUser, accessToken, setAccessToken])

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
