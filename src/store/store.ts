import { configureStore } from '@reduxjs/toolkit'

import { uiSlice, userSlice } from './slices'
// import userSliceReducer from './slices/userSlice'

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		ui: uiSlice.reducer,
		// user: userSliceReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
