import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'

const LoginPage = () => {
  const navigate = useNavigate()

  const { setToken, setIsAuthenticated } = useContext(SessionContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    const credentials = { username, password }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
      if (response.status === 200) {
        const { token } = await response.json()
        setToken(token)
        setIsAuthenticated(true)
        navigate('/profile')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input required value={username} onChange={event => setUsername(event.target.value)} />
        </label>

        <label>
          Password
          <input
            type='password'
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </label>
        <button type='submit'>LogIn</button>
      </form>
    </>
  )
}

export default LoginPage
