// import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {

  return (
    <>
      <h3>Login</h3>
      <form
        title='Login'
        style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '240px' }}
        onSubmit={handleSubmit}
      >
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '20px', gap: '4px', alignItems: 'center' }}>
          <p style={{ color:'GrayText', fontSize: 12, minWidth: '60px' }}>
            Username
          </p>
          <input
            style={{ width: '100%' }}
            onChange={ handleUsernameChange }
            value={ username }
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '20px', gap: '4px', alignItems: 'center' }}>
          <p style={{ color:'GrayText', fontSize: 12, minWidth: '60px' }}>
            Password
          </p>
          <input
            style={{ width: '100%' }}
            onChange={ handlePasswordChange }
            value={ password }
          />
        </div>
        <button type='submit' style={{ alignSelf: 'flex-end' }}>Login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm