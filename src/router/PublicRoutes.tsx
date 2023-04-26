import { Route, Routes } from 'react-router-dom'

import {
	AuthPage,
	ErrorPage,
	ForgotPasswordVerificationPage,
	RegisterVerificationPage,
} from '../pages'
import { PublicLayout } from '../components/layouts'

const PublicRoutes = () => (
	<Routes>
		<Route path='/auth' element={<PublicLayout />} errorElement={<ErrorPage />}>
			<Route index element={<AuthPage />} />
			<Route
				path='register/:email/:token'
				element={<RegisterVerificationPage />}
			/>
			<Route
				path='forgot/:email/:token'
				element={<ForgotPasswordVerificationPage />}
			/>
		</Route>
	</Routes>
)

export default PublicRoutes
