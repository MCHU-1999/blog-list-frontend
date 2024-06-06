import { render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import BlogList from './Blog'
import BlogForm from './BlogForm'


const blogs = [{
  id: '6660863f1dd983f7a597a7ac',
  title: 'this is a example blog',
  author: 'MCHU',
  url: 'https://localhost:2203/helloworld',
  likes: 10,
  user: '6659afaf406680e57e9db139'
}]

test('render the title and author, but does not render its URL or likes', () => {
  const mockFunction = vi.fn()

  const { container } = render(<BlogList blogs={blogs} handleLike={mockFunction} handleDelete={mockFunction} />)
  // screen.debug()

  const element = container.querySelector('.blogList')
  expect(element).toBeDefined()

  const title = screen.queryByText('this is a example blog')
  const url = screen.queryByText('https://localhost:2203/helloworld')
  const likes = screen.queryByText('10')
  expect(title).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('URL and number of likes are shown when the button clicked', async () => {
  const mockFunction = vi.fn()

  const { container } = render(<BlogList blogs={blogs} handleLike={mockFunction} handleDelete={mockFunction} />)
  // screen.debug()

  const viewButton = screen.getByText('view')
  await userEvent.click(viewButton)

  const url = screen.queryByText('https://localhost:2203/helloworld')
  const likes = screen.queryByText('10')
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('click the like button twice', async () => {
  const handleLike = vi.fn()
  const handleDelete = vi.fn()

  const { container } = render(<BlogList blogs={blogs} handleLike={handleLike} handleDelete={handleDelete} />)
  // screen.debug()

  const viewButton = screen.getByText('view')
  await userEvent.click(viewButton)

  const likeButton = screen.getByText('like')
  await userEvent.click(likeButton)
  expect(handleLike.mock.calls.length).toBe(1)
  await userEvent.click(likeButton)
  expect(handleLike.mock.calls.length).toBe(2)
})

test('create new blog', async () => {
  const handleSubmit = vi.fn(e => e.preventDefault())
  const dumbHandle = vi.fn()

  const { container } = render(
    <BlogForm
      handleSubmit={handleSubmit}
      handleTitleChange={dumbHandle}
      handleAuthorChange={dumbHandle}
      handleUrlChange={dumbHandle}
      title={blogs[0].title}
      author={blogs[0].author}
      url={blogs[0].url}
    />
  )
  // screen.debug()

  const createButton = screen.getByText('create')
  await userEvent.click(createButton)
  // console.log(handleSubmit.mock.calls)
  expect(handleSubmit.mock.calls.length).toBe(1)
})
