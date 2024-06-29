import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadBlogs, updateBlogById, deleteBlogById, addComment } from '../reducers/blogReducer'
import { newNoti } from '../reducers/notificationReducer'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'


const Blog = ({ user, blog }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  const handleLike = () => {
    try {
      dispatch(updateBlogById(blog.id, {
        ...blog,
        user: blog.user.id,
        likes: blog.likes +1,
      }))
      dispatch(newNoti(`you liked ${blog.title}`, 'default'))
    } catch (error) {
      dispatch(newNoti(error.message, 'error'))
    }
  }
  const handleDelete = async () => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        dispatch(deleteBlogById(blog.id))
        dispatch(newNoti(`blog removed: ${blog.title}`, 'success'))
        navigate('/blogs')
      }
    } catch (error) {
      dispatch(newNoti(error.message, 'error'))
    }
  }
  const handleComment = async (event) => {
    event.preventDefault()
    try {
      dispatch(addComment(blog.id, comment))
      dispatch(newNoti(`commented: ${comment} on ${blog.title}`, 'success'))
    } catch (error) {
      dispatch(newNoti(error.message, 'error'))
    }
  }

  if (!blog) {
    return null
  } else {
    return (
      <>
        <h2>{blog.title} by {blog.author}</h2>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes} likes <button onClick={() => handleLike()}>like</button>
          <br/>
          added by {blog.user.name}
        </p>
        <h3>comments</h3>
        <form onSubmit={handleComment}>
          <input value={comment} onChange={({ target }) => setComment(target.value)} placeholder='leave a comment here' name='comment'></input>
          <button type='submit'>add comment</button>
        </form>
        <ul>
          {
            blog.comments.map((comment, i) => <li key={i}>{comment}</li>)
          }
        </ul>
        {
          blog.user.id === user.id
            ? <button onClick={() => handleDelete()}>remove blog</button>
            : null
        }
      </>
    )
  }

}

const BlogView = ({ user }) => {

  const blogs = useSelector(state => state.blogs)
  const match = useMatch('/blogs/:id')
  const [matchBlog, setMatchBlog] = useState(null)

  useEffect(() => {
    if (match) {
      setMatchBlog(blogs.find(blog => blog.id === match.params.id))
      // console.log('matchBlog', blogs.find(blog => blog.id === match.params.id))
    } else {
      setMatchBlog(null)
    }
  }, [blogs])


  return (
    <Routes>
      <Route path='/' element={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Togglable buttonLabel='create new blog'>
            <BlogForm />
          </Togglable>
          { blogs.map(blog => <a href={`/blogs/${blog.id}`} key={blog.id}>{blog.title} by {blog.author}</a>) }
        </div>
      }/>
      <Route path='/:id' element={<Blog user={user} blog={matchBlog}/>} />
    </Routes>
  )
}

export default BlogView