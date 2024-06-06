import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url,
  handleSubmit
}) => {
  return (
    <>
      <h3>Create New</h3>
      <form
        title='new-blog'
        style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '240px' }}
        onSubmit={ handleSubmit }
      >
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '20px', gap: '4px', alignItems: 'center' }}>
          <p style={{ color:'GrayText', fontSize: 12, minWidth: '60px' }}>
            Title:
          </p>
          <input
            style={{ width: '100%' }}
            onChange={ handleTitleChange }
            value={ title }
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '20px', gap: '4px', alignItems: 'center' }}>
          <p style={{ color:'GrayText', fontSize: 12, minWidth: '60px' }}>
            Author:
          </p>
          <input
            style={{ width: '100%' }}
            onChange={ handleAuthorChange }
            value={ author }
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '20px', gap: '4px', alignItems: 'center' }}>
          <p style={{ color:'GrayText', fontSize: 12, minWidth: '60px' }}>
            Url:
          </p>
          <input
            style={{ width: '100%' }}
            onChange={ handleUrlChange }
            value={ url }
          />
        </div>
        <button type='submit' style={{ alignSelf: 'flex-end' }}>create</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}


export default BlogForm