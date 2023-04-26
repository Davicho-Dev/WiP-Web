import { configureStore } from '@reduxjs/toolkit'

import { uiSlice, userSlice } from './slices'

const RTKStore = configureStore({
	reducer: {
		user: userSlice.reducer,
		ui: uiSlice.reducer,
	},
})

export default RTKStore
export type RootState = ReturnType<typeof RTKStore.getState>
export type AppDispatch = typeof RTKStore.dispatch
