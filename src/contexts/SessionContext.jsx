import { createContext, useEffect, useState } from 'react'

export const SessionContext = createContext()

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isVerifying, setIsVerifying] = useState(true)

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
      localStorage.setItem('authToken', token)
    } else {
      setIsAuthenticated(false)
    }
  }, [token])

  const verifyToken = async currentToken => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      })
      if (response.status === 200) {
        setToken(currentToken)
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem('authToken')
      }
      setIsVerifying(false)
    } catch (error) {
      console.log(error)
      localStorage.removeItem('authToken')
      setIsVerifying(false)
    }
  }

  useEffect(() => {
    const localToken = localStorage.getItem('authToken')
    if (localToken) {
      verifyToken(localToken)
    } else {
      setIsVerifying(false)
    }
  }, [])

  const logout = () => {
    setToken()
    localStorage.removeItem('authToken')
  }

  const fetchWithToken = async (endpoint, method = 'GET', payload) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (response.ok) {
        return response.json()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SessionContext.Provider
      value={{ setToken, setIsAuthenticated, isAuthenticated, logout, isVerifying, fetchWithToken }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export default SessionContextProvider
