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
    await page.getByTestId('username').fill('superadmin')
    await page.getByTestId('password').fill('sudo')
    await page.getByRole('button', { name: 'Login' }).click() 
    await expect(page.getByText(/super admin/)).toBeVisible()
  })
})