import { Route, Routes } from 'react-router-dom'

import { PrivateLayout } from '../components/layouts'
import { ErrorPage, ProfilePage } from '../pages'

const PrivateRoutes = () => (
	<Routes>
		<Route
			path='/auth'
			element={<PrivateLayout />}
			errorElement={<ErrorPage />}
		>
			<Route element={<ProfilePage />} index />
		</Route>
	</Routes>
)

export default PrivateRoutes
