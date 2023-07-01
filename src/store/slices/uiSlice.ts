import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type TAuthForm = 'login' | 'register' | 'forgot_password' | string

interface IUI {
	currentAuthForm: TAuthForm
	showAuthFormFooter: boolean
	showSidebar: boolean
	hasAccess: boolean
}

const INITIAL_STATE: IUI = {
	currentAuthForm: 'login',
	showAuthFormFooter: true,
	showSidebar: false,
	hasAccess: false,
}

export const uiSlice = createSlice({
	name: 'ui',
	initialState: INITIAL_STATE,
	reducers: {
		setCurrentAuthForm: (_state, action: PayloadAction<TAuthForm>) => {
			_state.currentAuthForm = action.payload
		},
		setShowAuthFormFooter: (_state, action: PayloadAction<boolean>) => {
			_state.showAuthFormFooter = action.payload
		},
		setShowSidebar: (_state, action: PayloadAction<boolean>) => {
			_state.showSidebar = action.payload
		},
		setHasAccess: (_state, action: PayloadAction<boolean>) => {
			_state.hasAccess = action.payload
		},
	},
})

export const {
	setCurrentAuthForm,
	setShowAuthFormFooter,
	setShowSidebar,
	setHasAccess,
} = uiSlice.actions
