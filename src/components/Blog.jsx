import { useState, forwardRef, useImperativeHandle } from 'react'
import blogService from '../services/blogs'

const Blog = ({ user, blog, handleLike, handleDelete, verbose }) => {

  if (verbose) {
    return (
      <p style={{ margin: 0, padding: 12 }}>
        url: {blog.url}
        <br/>
        likes: {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
        <br/>
        {blog.user.name}
        <br/>
        {
          blog.user.id === user.id ?
            <button onClick={() => handleDelete(blog)}>remove blog</button>
            :
            null
        }
      </p>
    )
  } else {
    return (
      <div>
        {blog.title}, {blog.author}
      </div>
    )
  }
}

const BlogToggle = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '12px', backgroundColor: '#EEEEEE', borderRadius: '12px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
        <Blog blog={props.blog} verbose={false}/>
        <button style={hideWhenVisible} onClick={toggleVisibility}>{props.buttonLabel}</button>
        <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
    </div>
  )
})
BlogToggle.displayName = 'BlogToggle'

const BlogList = ({ user, blogs, handleLike, handleDelete }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} className='blogList'>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <BlogToggle key={blog.id} blog={blog} buttonLabel='view'>
          <Blog user={user} blog={blog} handleLike={handleLike} handleDelete={handleDelete} verbose={true} className='blogDetail'/>
        </BlogToggle>
      )}
    </div>
  )
}

export default BlogList