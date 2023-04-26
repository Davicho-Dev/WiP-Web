import { Route, Routes } from 'react-router-dom'

import { PrivateLayout } from '../components/layouts'
import { ErrorPage, HomePage, ProfilePage } from '../pages'

const PrivateRoutes = () => (
	<Routes>
		<Route path='/' element={<PrivateLayout />} errorElement={<ErrorPage />}>
			<Route element={<HomePage />} index />
			<Route path='user' element={<ProfilePage />} />
		</Route>
	</Routes>
)

export default PrivateRoutes
