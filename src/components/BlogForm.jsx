import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newNoti } from '../reducers/notificationReducer'
import { loadBlogs, newBlog } from '../reducers/blogReducer'
// import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@radix-ui/themes'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const handleAddBlog = async (event) => {
    event.preventDefault()

    try {
      dispatch(newBlog({
        title,
        author,
        url,
      }))

      setTitle('')
      setAuthor('')
      setUrl('')
      dispatch(newNoti(`new blog ${title} by ${author} added`, 'success'))
      // navigate('/blogs')
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
        <TextField.Root placeholder="Title" onChange={ ({ target }) => {setTitle(target.value)} } value={ title } />
        <TextField.Root placeholder="Author" onChange={ ({ target }) => {setAuthor(target.value)} } value={ author } />
        <TextField.Root placeholder="URL" onChange={ ({ target }) => {setUrl(target.value)} } value={ url } />
        <Button type='submit' style={{ alignSelf: 'flex-end' }}>create</Button>
      </form>
    </>
  )
}


export default BlogForm