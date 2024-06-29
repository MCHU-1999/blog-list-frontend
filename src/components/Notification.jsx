import { useSelector } from 'react-redux'
import { Callout } from '@radix-ui/themes'

const Message = ({ message, type }) => {
  let color = 'blue'
  if (message === null) {
    return null
  } else if (type === 'success') {
    color='green'
  } else if (type === 'error') {
    color='red'
  }
  return (
    <Callout.Root color={color}>
      <Callout.Text>
        {message}
      </Callout.Text>
    </Callout.Root>
  )
}

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  const style = {
    display: 'flex',
    margin: 12,
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    height: '50px',
    maxHeight: '50px',
    overflow: 'scroll',
    borderRadius: 12,
    gap: 8
  }

  return (
    <div style={style}>
      {notification.map((notification, i) => <Message key={i} message={notification.message} type={notification.type} />)}
    </div>
  )
}

export default Notification