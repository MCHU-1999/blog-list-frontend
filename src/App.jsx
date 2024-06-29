import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import BlogView from './components/BlogView'
import NavBar from './components/NavBar'

// helper functions
import blogService from './services/blogService'
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
  useNavigate,
} from 'react-router-dom'


const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(loadBlogs())

    console.log('load user')
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <NavBar user={user}/>
      <Notification />
      {
        user ?
          <div style={{ margin: 12 }}>
            <Routes>
              <Route path='/blogs/*' element={<BlogView user={user} />} />
              <Route path='/users/*' element={<Users />} />
            </Routes>
          </div>
          :
          <LoginForm />
      }
    </div>
  )
}

export default App