import './index.css'

import { useState, useEffect, useRef } from 'react'
import BlogList from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/loginService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  // login
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // pop a toast
  const [noti, setNoti] = useState({ message: null, type: null })

  const blogFormRef = useRef()

  useEffect(() => {
    loadBlogs()

    console.log('load user')
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      console.log('logged-in!')
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loadBlogs = async () => {
    console.log('load blogs')
    setBlogs(await blogService.getAll())
  }

  const loadBlogById = async (id) => {
    console.log('load blog by id')
    const response = await blogService.getById(id)
    setBlogs(blogs.map(n => {
      if (n.id === id) {
        return response
      } else {
        return n
      }
    }))
  }

  const handleLike = async (blog) => {
    try {
      await blogService.update(blog.id, {
        user: blog.user.id,
        likes: blog.likes +1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      })
      await loadBlogById(blog.id)
    } catch (error) {
      popToast(error.message, 'error')
    }
  }

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await blogService.deleteById(blog.id)
        await loadBlogs()
      }
    } catch (error) {
      // console.log(error)
      popToast(error.message, 'error')
    }
  }

  const popToast = (message, type) => {
    setNoti({ message, type })
    setTimeout(() => {
      setNoti({ message: null, type: null })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      console.log('user: ', user)
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      // popToast('logged in')
    } catch (error) {
      popToast('wrong username or password', 'error')
    }
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()

    try {
      await blogService.create({
        title,
        author,
        url,
      })
      await loadBlogs()

      blogFormRef.current.toggleVisibility()

      setTitle('')
      setAuthor('')
      setUrl('')
      popToast(`new blog ${title} by ${author} added`, 'success')
    } catch (error) {
      popToast('error occurred: ' + error.message, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    popToast(`${user.name} logged out successfully`, 'success')
  }

  return (
    <div>
      <Notification message={noti.message} type={noti.type}/>
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
              <BlogForm handleSubmit={handleAddBlog}
                handleTitleChange={({ target }) => {setTitle(target.value)}}
                handleAuthorChange={({ target }) => {setAuthor(target.value)}}
                handleUrlChange={({ target }) => {setUrl(target.value)}}
                title={ title }
                author={ author }
                url={ url }
              />
            </Togglable>
            <BlogList
              blogs={ blogs.sort((a, b) => a.likes - b.likes) }
              handleLike={handleLike}
              handleDelete={handleDelete}
            />
          </>
          :
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
      }
    </div>
  )
}

export default App