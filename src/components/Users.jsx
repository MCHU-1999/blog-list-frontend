import { useEffect, useState } from 'react'
import userService from '../services/userService'
import { Routes, Route, useMatch } from 'react-router-dom'
import { Link, Table } from '@radix-ui/themes'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <>
      <h2>{user.name}</h2>
      <ul>
        { user.blogs.map(blog => (<li key={blog.id}>{blog.title}</li>)) }
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
          <Table.Root size='2' style={{ width: '400px' }}>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>blogs created</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                users.map(user => {
                  return (
                    <Table.Row key={user.id}>
                      <Table.Cell><Link href={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
                      <Table.Cell>{user.blogs.length}</Table.Cell>
                    </Table.Row>
                  )
                })
              }
            </Table.Body>
          </Table.Root>
        </>
      } />
    </Routes>
  )
}

export default Users