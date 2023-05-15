import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IUser } from '../../interfaces'

const INITIAL_STATE = {} as IUser

export const userSlice = createSlice({
	name: 'user',
	initialState: INITIAL_STATE,
	reducers: {
		setUser: (_state, action: PayloadAction<IUser>) => action.payload,
		clearUser: () => INITIAL_STATE,
	},
})

export const { setUser, clearUser } = userSlice.actions
// export default userSlice.reducer
