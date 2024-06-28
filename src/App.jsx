import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Users from './components/Users'

// helper functions
import blogService from './services/blogs'
import loginService from './services/loginService'

// reducers & dispatch
import { useDispatch, useSelector } from 'react-redux'
import { newNoti } from './reducers/notificationReducer'
import { setUser, login } from './reducers/userReducer'
import { loadBlogs } from './reducers/blogReducer'

// router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from 'react-router-dom'


const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  console.log(user)

  useEffect(() => {
    dispatch(loadBlogs())

    console.log('load user')
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      console.log('logged-in!')
      const user = JSON.parse(loggedUser)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser({ user: null }))
    dispatch(newNoti(`${user.name} logged out successfully`, 'success'))
  }


  return (
    <div>
      <Notification />
      {
        user ?
          <div>
            <p>
              {user.name} logged-in
              <button onClick={handleLogout}>log out</button>
            </p>
            <Routes>
              <Route path='/users/*' element={<Users />} />
              {/* <Route path='/users/:id' element={<User />} /> */}
              <Route path='/' element={
                <>
                  <Togglable buttonLabel='create new blog'>
                    <BlogForm />
                  </Togglable>
                  <BlogList user = { user } />
                </>
              } />
            </Routes>
          </div>
          :
          <LoginForm />
      }
    </div>
  )
}

export default App