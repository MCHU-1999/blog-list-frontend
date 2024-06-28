import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    setNotifications (state, action) {
      return action.payload
    },
    appendNotification (state, action) {
      state.push(action.payload)
    },
    shiftNotification (state, action) {
      state.shift()
    }
  }
})

export const newNoti = (message, type) => {
  return async (dispatch) => {
    dispatch(appendNotification({ message, type }))
    setTimeout(() => {
      dispatch(shiftNotification())
    }, 5000)
  }
}


export const { appendNotification, setNotifications, shiftNotification } = notificationSlice.actions
export default notificationSlice.reducer