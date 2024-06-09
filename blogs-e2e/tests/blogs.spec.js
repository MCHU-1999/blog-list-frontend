const { test, expect, beforeEach, describe } = require('@playwright/test')

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
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('superadmin')
      await page.getByTestId('password').fill('sudo')
      await page.getByRole('button', { name: 'Login' }).click() 

      await expect(page.getByText(/super admin/)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('superadmin')
      await page.getByTestId('password').fill('WRONG-PASSWORD')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText(/wrong username or password/)).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('superadmin')
      await page.getByTestId('password').fill('sudo')
      await page.getByRole('button', { name: 'Login' }).click() 
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      const textboxes = await page.getByRole('textbox').all()
      console.log(textboxes)
      await textboxes[0].fill('A Whole New Blog')
      await textboxes[1].fill('admin')
      await textboxes[2].fill('http://localhost:3003/example/blogs/1')

      await page.getByRole('button', { name: 'create' }).click()
      
      await expect(page.getByText('A Whole New Blog, admin')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      const textboxes = await page.getByRole('textbox').all()
      console.log(textboxes)
      await textboxes[0].fill('A Whole New Blog')
      await textboxes[1].fill('admin')
      await textboxes[2].fill('http://localhost:3003/example/blogs/1')
      await page.getByRole('button', { name: 'create' }).click()

      const thisBlogElement =  await page.getByText('A Whole New Blog, admin').locator('..')
      await thisBlogElement.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes: 1')).toBeVisible()
    })
  })
})