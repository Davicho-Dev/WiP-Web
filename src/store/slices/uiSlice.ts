import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type TAuthForm = 'login' | 'register' | 'forgot_password'

interface IUI {
	currentAuthForm: TAuthForm
}

const INITIAL_STATE: IUI = { currentAuthForm: 'login' }

export const uiSlice = createSlice({
	name: 'user',
	initialState: INITIAL_STATE,
	reducers: {
		setCurrentAuthForm: (state, action: PayloadAction<TAuthForm>) => {
			state.currentAuthForm = action.payload
		},
	},
})

export const { setCurrentAuthForm } = uiSlice.actions
