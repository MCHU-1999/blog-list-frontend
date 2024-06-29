import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null


const setToken = newToken => {
  // console.log('new token set: ', newToken)
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${ baseUrl }/${id}`)
  return response.data
}

const create = async (newObject) => {
  const config = { headers: { Authorization: token } }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = { headers: { Authorization: token } }

  const response = await axios.put(`${ baseUrl }/${id}`, newObject, config)
  return response.data
}

const deleteById = async (id) => {
  const config = { headers: { Authorization: token } }

  const response = await axios.delete(`${ baseUrl }/${id}`, config)
  return response.data
}

const addComment = async (id, comment) => {
  const config = { headers: { Authorization: token } }

  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config)
  console.log(response)
  return response.data
}

export default { setToken, getAll, getById, create, update, deleteById, addComment }