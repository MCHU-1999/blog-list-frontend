// import { useState } from 'react'

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
          <p style={{ color:'GrayText', fontSize: 12, minWidth: '60px'}}>
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

export default LoginForm