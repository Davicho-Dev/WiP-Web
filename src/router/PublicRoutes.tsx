import { Route, Routes } from 'react-router-dom'

import { AuthPage, ErrorPage } from '../pages'
import { PublicLayout } from '../components/layouts'

const PublicRoutes = () => (
	<Routes>
		<Route path='/auth' element={<PublicLayout />} errorElement={<ErrorPage />}>
			<Route index element={<AuthPage />} />
		</Route>
	</Routes>
)

export default PublicRoutes
