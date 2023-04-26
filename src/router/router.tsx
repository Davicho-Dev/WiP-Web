import { BrowserRouter } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'
import { getLocalAccessToken } from '../constants'

const Router = () => {
	const access = getLocalAccessToken()

	return (
		<BrowserRouter>
			<PrivateRoutes />
			<PublicRoutes />
		</BrowserRouter>
	)
}

export default Router
