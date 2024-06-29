import { useState } from 'react'
import PropTypes from 'prop-types'
import { login } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import loginService from '../services/loginService'
import blogService from '../services/blogService'
import { newNoti } from '../reducers/notificationReducer'

const LoginForm = () => {

  const dispatch = useDispatch()

  // login
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      console.log('user: ', user)
      dispatch(login(user))
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(newNoti('wrong username or password', 'error'))
    }
  }

  return (
    <>
      <h3>Login</h3>
      <form
        title='Login'
        style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '240px' }}
        onSubmit={handleLogin}
      >
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '20px', gap: '4px', alignItems: 'center' }}>
          <p style={{ color:'GrayText', fontSize: 12, minWidth: '60px' }}>
            Username
          </p>
          <input
            data-testid='username'
            style={{ width: '100%' }}
            onChange={ ({ target }) => setUsername(target.value) }
            value={ username }
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '20px', gap: '4px', alignItems: 'center' }}>
          <p style={{ color:'GrayText', fontSize: 12, minWidth: '60px' }}>
            Password
          </p>
          <input
            data-testid='password'
            style={{ width: '100%' }}
            onChange={ ({ target }) => setPassword(target.value) }
            value={ password }
          />
        </div>
        <button type='submit' style={{ alignSelf: 'flex-end' }}>Login</button>
      </form>
    </>
  )
}

// LoginForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
// }

export default LoginForm