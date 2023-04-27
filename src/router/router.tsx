import { getLocalAccessToken } from '../constants'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

const Router = () => {
	const access = getLocalAccessToken()

	return (
		<>
			<PrivateRoutes />
			<PublicRoutes />
		</>
	)
}

export default Router
