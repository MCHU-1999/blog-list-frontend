const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, createBlogAndLike } = require('./testHelper')
const assert = require('assert')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/test/reset')
    await request.post('/api/users', {
      data: {
        name: 'super admin',
        username: 'superadmin',
        password: 'sudo'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'ordinary user',
        username: 'user',
        password: 'string'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'superadmin', 'sudo')
      await expect(page.getByText(/super admin/)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'superadmin', 'WRONG-PW')
      await expect(page.getByText(/wrong username or password/)).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'superadmin', 'sudo')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'A Whole New Blog', 'admin', 'http://localhost:3003/example/blogs/1')
      await expect(page.getByText('A Whole New Blog, admin')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'A Whole New Blog', 'admin', 'http://localhost:3003/example/blogs/1')

      const newBlogElement =  await page.getByText('A Whole New Blog, admin').locator('..')
      await newBlogElement.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes: 1')).toBeVisible()
    })

    test('a blog can be deleted', async ({ page }) => {
      page.on('dialog', async (dialog) => {
        assert(dialog.type() === 'confirm')
        await dialog.accept()
      })

      await createBlog(page, 'A Whole New Blog', 'admin', 'http://localhost:3003/example/blogs/1')
      await page.getByText('new blog A Whole New Blog by admin added').waitFor({ state: 'hidden' })

      const newBlogElement =  await page.getByText('A Whole New Blog, admin').locator('..')
      await newBlogElement.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'remove blog' }).click()
      
      await expect(page.getByText('blog removed: A Whole New Blog')).toBeVisible()
    })

    test('a blog cannot be deleted by non-author', async ({ page }) => {
      await createBlog(page, 'A Whole New Blog', 'admin', 'http://localhost:3003/example/blogs/1')
      await page.getByRole('button', { name: 'log out' }).click()
      await loginWith(page, 'user', 'string')

      const newBlogElement =  await page.getByText('A Whole New Blog, admin').locator('..')
      await newBlogElement.getByRole('button', { name: 'view' }).click()
      
      await expect(page.getByRole('button', { name: 'remove blog' })).toBeHidden()
    })

    describe('when there are multiple blogs',() => {
      beforeEach(async ({ page }) => {
        await createBlogAndLike(page, 'blog no.1', 'bla', 'http://001', 1)
        await createBlogAndLike(page, 'blog no.2', 'blabla', 'http://002', 2)
        await createBlogAndLike(page, 'blog no.3', 'blablabla', 'http://003', 3)
        await createBlogAndLike(page, 'blog no.4', 'blablablabla', 'http://004', 4)
        await page.goto('/')
      })

      test.only('blogs are arranged in the order according to its likes', async ({ page }) => {
        const viewBtns = await page.getByRole('button', { name: 'view' }).all()
        viewBtns.forEach(async (element) => {
          await element.click()
        })
        const elements = await page.getByText(/likes: (\d+)/).allTextContents()
        let c = 4
        elements.forEach(async (element) => {
          const match = element.match(/likes: (\d+)/)
          expect(match[1]).toBe(`${c}`)
          c-=1
        })
        // page.screenshot()
      })
    })
  })
})