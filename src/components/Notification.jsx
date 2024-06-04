const Notification = ({ message, type }) => {

  let className = 'default'

  if (message === null) {
    return null
  } else if (type === 'success') {
    className='success'
  } else if (type === 'error') {
    className='error'
  } else {
    // pass
  }
  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification