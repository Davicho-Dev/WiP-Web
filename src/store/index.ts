import { userSlice } from './slices/userSlice'
import { configureStore } from '@reduxjs/toolkit'

const RTKStore = configureStore({
	reducer: {
		user: userSlice.reducer,
	},
})

export default RTKStore
export type RootState = ReturnType<typeof RTKStore.getState>
export type AppDispatch = typeof RTKStore.dispatch
