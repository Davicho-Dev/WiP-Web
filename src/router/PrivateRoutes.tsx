import { Route, Routes } from 'react-router-dom'

import { PrivateLayout } from '../components/layouts'
import { ErrorPage, HomePage, ProfilePage, SettingsPage } from '../pages'

const PrivateRoutes = () => (
	<Routes>
		<Route path='/' element={<PrivateLayout />} errorElement={<ErrorPage />}>
			<Route element={<HomePage />} index />
			<Route path='settings' element={<SettingsPage />} />
			<Route path='user' element={<ProfilePage />} />
		</Route>
	</Routes>
)

export default PrivateRoutes
