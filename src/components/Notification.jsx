import { useSelector } from 'react-redux'

const Message = ({ message, type }) => {
  let className = 'default'
  if (message === null) {
    return null
  } else if (type === 'success') {
    className='success'
  } else if (type === 'error') {
    className='error'
  }
  return <div className={className}>{message}</div>
}

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    height: '50px',
    maxHeight: '50px',
    overflow: 'scroll',
  }

  return (
    <div style={style}>
      {notification.map((notification, i) => <Message key={i} message={notification.message} type={notification.type} />)}
    </div>
  )
}

export default Notification