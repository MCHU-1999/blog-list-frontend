import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { newNoti } from '../reducers/notificationReducer'

const NavBar = ({ user }) => {
  const style = {
    display: 'flex',
    margin: '12px 0px',
    padding: '8px',
    gap: '16px',
    backgroundColor: '#dddddd',
    borderRadius: 8
  }

  const btnStyle = {
    padding: '0px'
  }

  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser({ user: null }))
    dispatch(newNoti(`${user.name} logged out successfully`, 'success'))
  }

  return (
    <div style={style} >
      <a style={btnStyle} href="/blogs">blogs</a>
      <a style={btnStyle} href="/users">users</a>
      {
        user ?
          <p style={{ margin: 0, alignContent: 'center' }}>
            {user.name} logged-in <button onClick={handleLogout}>log out</button>
          </p>
          :
          null
      }
    </div>
  )
}


export default NavBar