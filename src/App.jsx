import { useState, useEffect, useRef } from 'react'
import BlogList from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

// helper functions
import blogService from './services/blogs'
import loginService from './services/loginService'

// reducers & dispatch
import { useDispatch, useSelector } from 'react-redux'
import { newNoti } from './reducers/notificationReducer'
import { loadBlogs } from './reducers/blogReducer'
import { setUser, login } from './reducers/userReducer'


const App = () => {
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')

  const blogFormRef = useRef()
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


  // const handleAddBlog = async (event) => {
  //   event.preventDefault()

  //   try {
  //     await blogService.create({
  //       title,
  //       author,
  //       url,
  //     })
  //     dispatch(loadBlogs())

  //     blogFormRef.current.toggleVisibility()

  //     setTitle('')
  //     setAuthor('')
  //     setUrl('')
  //     dispatch(newNoti(`new blog ${title} by ${author} added`, 'success'))
  //   } catch (error) {
  //     dispatch(newNoti('error occurred: ' + error.message, 'error'))
  //   }
  // }

  const handleLogout = () => {
    // window.localStorage.removeItem('loggedUser')
    dispatch(setUser({ user: null }))
    dispatch(newNoti(`${user.name} logged out successfully`, 'success'))
  }

  return (
    <div>
      <Notification />
      {
        user ?
          <>
            <div>
              <p>
                {user.name} logged-in
                <button onClick={handleLogout}>log out</button>
              </p>
            </div>
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
              <BlogForm />
            </Togglable>
            <BlogList user = { user } />
          </>
          :
          <LoginForm />
      }
    </div>
  )
}

export default App