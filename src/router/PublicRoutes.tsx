import { Route, Routes } from 'react-router-dom'

import { ErrorPage, ForgotPasswordPage, HomePage } from '../pages'
import { PublicLayout } from '../components/layouts'

const PublicRoutes = () => (
	<Routes>
		<Route path='/' element={<PublicLayout />} errorElement={<ErrorPage />}>
			<Route element={<HomePage />} index />
			<Route element={<ForgotPasswordPage />} path='forgot-password' />
		</Route>
	</Routes>
)

export default PublicRoutes
