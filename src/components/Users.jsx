import { useEffect, useState } from 'react'
import userService from '../services/userService'
import { Routes, Route, useMatch, useParams } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <>
      <h2>{user.name}</h2>
      <ul>
        {
          user.blogs.map(blog => (<li key={blog.id}>{blog.title}</li>))
        }
      </ul>
    </>
  )
}

const Users = () => {

  const [users, setUsers] = useState([])
  const [matchUser, setMatchUser] = useState(null)
  const match = useMatch('/users/:id')

  useEffect(() => {

    userService.getAllUsers()
      .then((result) => {
        setUsers(result)
        if (match) {
          setMatchUser(result.find(user => user.id === match.params.id))
          // console.log('matchUser: ', result.find(user => user.id === match.params.id))
        } else {
          setMatchUser(null)
        }
      })
  }, [])


  return (
    <Routes>
      <Route path='/:id' element={<User user={matchUser} />}/>
      <Route path='/' element={
        <>
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th> </th>
                <th>blogs created</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map(user => {
                  return (
                    <tr key={user.id}>
                      <td><a href={`/users/${user.id}`}>{user.name}</a></td>
                      <td>{user.blogs.length}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </>
      } />
    </Routes>
  )
}

export default Users