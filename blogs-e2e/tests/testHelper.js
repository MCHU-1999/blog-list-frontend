const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click() 
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new blog' }).click()

  const textboxes = await page.getByRole('textbox').all()
  await textboxes[0].fill(title)
  await textboxes[1].fill(author)
  await textboxes[2].fill(url)

  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(/new blog (.+) added/).waitFor({ state: 'visible' })
}

const createBlogAndLike = async (page, title, author, url, likes) => {
  await createBlog(page, title, author, url)

  const newBlogElement =  await page.getByText(`${title}, ${author}`).locator('../..')
  await newBlogElement.getByRole('button', { name: 'view' }).click()
  for (let i=0; i<likes; i++ ){
    await newBlogElement.getByRole('button', { name: 'like' }).click()
    await newBlogElement.getByText(`likes: ${i+1}`).waitFor({ state: 'visible' })
  }
}


module.exports = { loginWith, createBlog, createBlogAndLike }