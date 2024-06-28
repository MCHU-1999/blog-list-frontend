import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs (state, action) {
      return action.payload
    },
    appendBlog (state, action) {
      state.push(action.payload)
    },
    updateBlog (state, action) {
      const id = action.payload.id
      const updated = action.payload.blog
      return state.map(blog => blog.id !== id ? blog : updated)
    },
    deleteBlog (state, action) {
      const id = action.payload.id
      return state.filter(blog => blog.id !== id)
    },
  }
})

export const loadBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const loadBlogById = (id) => {
  return async (dispatch) => {
    const blog = await blogService.getById(id)
    dispatch(updateBlog({ id, blog }))
  }
}

export const newBlog = (newObject) => {
  return async (dispatch) => {
    const newOne = await blogService.create(newObject)
    // console.log(newOne)
    dispatch(appendBlog(newOne))
  }
}

export const updateBlogById = (id, newObject) => {
  return async (dispatch) => {
    const blog = await blogService.update(id, newObject)
    // const blog = await blogService.getById(id)
    dispatch(updateBlog({ id, blog }))
  }
}

export const deleteBlogById = (id) => {
  return async (dispatch) => {
    await blogService.deleteById(id)
    dispatch(deleteBlog({ id }))
  }
}

export const { setBlogs, appendBlog, updateBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer