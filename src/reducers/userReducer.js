import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser (state, action) {
      return action.payload.user
    }
  }
})

export const login = (user) => {
  return (dispatch) => {
    dispatch(setUser({ user }))
  }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer