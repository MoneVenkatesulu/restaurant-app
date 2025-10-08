import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Cookie from 'js-cookie'

import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory()

  useEffect(() => {
    const jwtToken = Cookie.get('jwt_token')
    if (jwtToken !== undefined) {
      history.replace('/')
    }
  }, [history])

  const onSubmitForm = async event => {
    event.preventDefault()

    const url = 'https://apis.ccbp.in/login'
    const body = JSON.stringify({username, password})
    const options = {
      method: 'POST',
      body,
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error_msg)
      }
      setUsername('')
      setPassword('')
      setShowErrorMsg(false)

      Cookie.set('jwt_token', data.jwt_token, {expires: 1})
      history.replace('/')
    } catch (error) {
      setShowErrorMsg(true)
      setErrorMsg(error.message)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-text">Login</h1>

        <form className="login-form" onSubmit={onSubmitForm}>
          <div>
            <label htmlFor="username" className="login-labels">
              USERNAME
            </label>
            <br />
            <input
              id="username"
              type="text"
              placeholder="User Name"
              className="input-bars"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="login-labels">
              PASSWORD
            </label>
            <br />
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="input-bars"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="submit-btn-container">
            <input type="submit" value="Login" className="submit-btn" />
            {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
