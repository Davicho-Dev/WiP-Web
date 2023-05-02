import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type TAuthForm = 'login' | 'register' | 'forgot_password' | string

interface IUI {
	currentAuthForm: TAuthForm
	showAuthFormFooter: boolean
}

const INITIAL_STATE: IUI = {
	currentAuthForm: 'login',
	showAuthFormFooter: true,
}

export const uiSlice = createSlice({
	name: 'user',
	initialState: INITIAL_STATE,
	reducers: {
		setCurrentAuthForm: (state, action: PayloadAction<TAuthForm>) => {
			state.currentAuthForm = action.payload
		},
		setShowAuthFormFooter: (state, action: PayloadAction<boolean>) => {
			state.showAuthFormFooter = action.payload
		},
	},
})

export const { setCurrentAuthForm, setShowAuthFormFooter } = uiSlice.actions
