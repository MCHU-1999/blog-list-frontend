import { useState, forwardRef, useImperativeHandle } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleLike, handleDelete, verbose }) => {

  if (verbose) {
    return (
      <p style={{ margin: 0, padding: 12 }}>
        {blog.url}
        <br/>
        {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
        <br/>
        {blog.user.name}
        <br/>
        <button onClick={() => handleDelete(blog)}>remove blog</button>
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

const BlogList = ({ blogs, handleLike, handleDelete }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <BlogToggle key={blog.id} blog={blog} buttonLabel='view'>
          <Blog blog={blog} handleLike={handleLike} handleDelete={handleDelete} verbose={true}/>
        </BlogToggle>
      )}
    </div>
  )
}

export default BlogList