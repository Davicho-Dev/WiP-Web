import { configureStore } from '@reduxjs/toolkit'

import { uiSlice, userSlice } from './slices'

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		ui: uiSlice.reducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
