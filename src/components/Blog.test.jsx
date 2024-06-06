import { render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import BlogList from './Blog'

test('renders content', () => {
  const mockFunction = vi.fn()
  const blogs = [{
    id: '6660863f1dd983f7a597a7ac',
    title: 'this is a example blog',
    author: 'MCHU',
    url: 'https://localhost:2203/helloworld',
    likes: 10,
    user: '6659afaf406680e57e9db139'
  }]

  const { container } = render(<BlogList blogs={blogs} handleLike={mockFunction} handleDelete={mockFunction} />)

  const element = container.querySelector('.blogList')
  // element.debug()
  console.log(element)
  expect(element).toBeDefined()
})
