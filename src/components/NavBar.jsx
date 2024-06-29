import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { newNoti } from '../reducers/notificationReducer'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button, Link, TabNav, Text } from '@radix-ui/themes'

const NavBar = ({ user }) => {
  const location = useLocation()
  // console.log(location.pathname)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser({ user: null }))
    dispatch(newNoti(`${user.name} logged out successfully`, 'success'))
  }

  return (
    <TabNav.Root style={{ padding: '8px 12px' }}>
      <TabNav.Link href='/blogs' active={location.pathname === '/blogs'}>blogs</TabNav.Link>
      <TabNav.Link href='/users' active={location.pathname === '/users'}>users</TabNav.Link>
      {
        user ?
          <div style={{ width: '100%', textAlign: 'end' }}>
            <Text align='center'>{user.name} logged-in </Text>
            <Button onClick={handleLogout}>log out</Button>
          </div>
          :
          null
      }
    </TabNav.Root>
  )
}


export default NavBar