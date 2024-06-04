import './index.css'

import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/loginService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [noti, setNoti] = useState({ message: null, type: null })

  const popToast = (message, type) => {
    setNoti({ message, type })
    setTimeout(() => {
      setNoti({ message: null, type: null })
    }, 5000)
  }

  const LoginForm = ({ setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const handleLogin = async (event) => {
      event.preventDefault()
      
      try {
        const user = await loginService.login({ username, password })
        console.log('user: ', user)
        setUser(user)
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        setUsername('')
        setPassword('')
        // popToast('logged in')
      } catch (error) {
        // throw Error('Wrong credentials')
        popToast('wrong username or password', 'error')
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
            <p style={{ color:'GrayText', fontSize: 12, minWidth: '60px'}}>
              Username
            </p>
            <input
              style={{ width: '100%' }}
              onChange={({ target }) => setUsername(target.value)}
              value={ username }
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '20px', gap: '4px', alignItems: 'center' }}>
            <p style={{ color:'GrayText', fontSize: 12, minWidth: '60px' }}>
              Password
            </p>
            <input
              style={{ width: '100%' }}
              onChange={({ target }) => setPassword(target.value)}
              value={ password }
            />
          </div>
          <button type='submit' style={{ alignSelf: 'flex-end' }}>Login</button>
        </form>
      </>
    )
  }

  const NewBlogForm = ({ setBlogs }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
  
    const loadBlogs = async () => {
      console.log('load blogs')
      setBlogs(await blogService.getAll()) 
    }
  
    const handleCreate = async (event) => {
      event.preventDefault()
  
      try {
        await blogService.create({
          title,
          author,
          url,
        })
        await loadBlogs()
  
        setTitle('')
        setAuthor('')
        setUrl('')
        popToast(`new blog ${title} by ${author} added`, 'success')
      } catch (error) {
        popToast(`error occurred`, 'error')
      }
    }
  
    return (
      <>
        <h3>Create New</h3>
        <form
          title='new-blog'
          style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '240px' }}
          onSubmit={handleCreate}
        >
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '20px', gap: '4px', alignItems: 'center' }}>
            <p style={{ color:'GrayText', fontSize: 12, minWidth: '60px'}}>
              Title:
            </p>
            <input
              style={{ width: '100%' }}
              onChange={({ target }) => setTitle(target.value)}
              value={ title }
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '20px', gap: '4px', alignItems: 'center' }}>
            <p style={{ color:'GrayText', fontSize: 12, minWidth: '60px' }}>
              Author:
            </p>
            <input
              style={{ width: '100%' }}
              onChange={({ target }) => setAuthor(target.value)}
              value={ author }
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '20px', gap: '4px', alignItems: 'center' }}>
            <p style={{ color:'GrayText', fontSize: 12, minWidth: '60px' }}>
              Url:
            </p>
            <input
              style={{ width: '100%' }}
              onChange={({ target }) => setUrl(target.value)}
              value={ url }
            />
          </div>
          <button type='submit' style={{ alignSelf: 'flex-end' }}>create</button>
        </form>
      </>
    )
  }



  const loadBlogs = async () => {
    console.log('load blogs')
    setBlogs(await blogService.getAll()) 
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    popToast(`${user.name} logged out successfully`, 'success')
  }

  useEffect(() => {
    loadBlogs()

    console.log('load user')
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


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
            <NewBlogForm setBlogs={setBlogs}/>
            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </>
        :
          <LoginForm setUser={setUser}/>
      }
    </div>
  )
}

export default App