import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { newNoti } from '../reducers/notificationReducer'
import { loadBlogs, newBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const handleAddBlog = async (event) => {
    event.preventDefault()

    try {
      dispatch(newBlog({
        title,
        author,
        url,
      }))
      // dispatch(loadBlogs())
      // blogFormRef.current.toggleVisibility()

      setTitle('')
      setAuthor('')
      setUrl('')
      dispatch(newNoti(`new blog ${title} by ${author} added`, 'success'))
    } catch (error) {
      dispatch(newNoti('error occurred: ' + error.message, 'error'))
    }
  }

  return (
    <>
      <h3>Create New</h3>
      <form
        title='new-blog'
        style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '240px' }}
        onSubmit={ handleAddBlog }
      >
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '20px', gap: '4px', alignItems: 'center' }}>
          <p style={{ color:'GrayText', fontSize: 12, minWidth: '60px' }}>
            Title:
          </p>
          <input
            style={{ width: '100%' }}
            onChange={ ({ target }) => {setTitle(target.value)} }
            value={ title }
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '20px', gap: '4px', alignItems: 'center' }}>
          <p style={{ color:'GrayText', fontSize: 12, minWidth: '60px' }}>
            Author:
          </p>
          <input
            style={{ width: '100%' }}
            onChange={ ({ target }) => {setAuthor(target.value)} }
            value={ author }
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '20px', gap: '4px', alignItems: 'center' }}>
          <p style={{ color:'GrayText', fontSize: 12, minWidth: '60px' }}>
            Url:
          </p>
          <input
            style={{ width: '100%' }}
            onChange={ ({ target }) => {setUrl(target.value)} }
            value={ url }
          />
        </div>
        <button type='submit' style={{ alignSelf: 'flex-end' }}>create</button>
      </form>
    </>
  )
}

// BlogForm.propTypes = {
//   handleTitleChange: PropTypes.func.isRequired,
//   handleAuthorChange: PropTypes.func.isRequired,
//   handleUrlChange: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired,
//   author: PropTypes.string.isRequired,
//   url: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
// }


export default BlogForm