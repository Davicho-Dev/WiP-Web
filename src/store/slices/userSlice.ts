import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IUser {
	name: string
}

const INITIAL_STATE = {} as IUser

export const userSlice = createSlice({
	name: 'user',
	initialState: INITIAL_STATE,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state = action.payload
		},
	},
})

export const { setUser } = userSlice.actions
