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
})