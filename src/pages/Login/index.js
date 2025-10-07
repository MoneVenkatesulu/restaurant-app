import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Cookie from 'js-cookie'

import './index.css'

const Login = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const jwtToken = Cookie.get('jwt_token')
    if (jwtToken !== undefined) {
      history.replace('/')
    }
  }, [history])

  const onSubmitForm = async event => {
    event.preventDefault()
    if (userName !== '' && password !== '') {
      const url = 'https://apis.ccbp.in/login'
      const body = JSON.stringify({username: userName, password})
      const options = {
        method: 'POST',
        body,
      }

      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        setUserName('')
        setPassword('')
        setShowErrorMsg(false)

        Cookie.set('jwt_token', data.jwt_token)
        history.replace('/')
      } else {
        setShowErrorMsg(true)
      }
    } else {
      setShowErrorMsg(true)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-text">Login</h1>

        <form className="login-form" onSubmit={onSubmitForm}>
          <div>
            <label htmlFor="username" className="login-labels">
              USER NAME
            </label>
            <br />
            <input
              id="username"
              type="text"
              placeholder="User Name"
              className="input-bars"
              value={userName}
              onChange={e => setUserName(e.target.value)}
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
            {showErrorMsg && (
              <p className="error-msg">
                *Please provide valid User Name and Password
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
