import { createSlice } from '@reduxjs/toolkit'

const initState = {
  hr: {},
  token: '',
}

const userSlice = createSlice({
  name: 'hr',
  initialState: initState,
  reducers: {
    signIn: (state, action) => (state = action.payload),
    signOut: (state) => (state = initState),
    setUser: (state, action) => void (state.hr = action.payload),
  },
})

export default userSlice.reducer
export const { signIn, signOut, setUser } = userSlice.actions
