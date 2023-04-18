import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

const Router = () => (
	<AnimatePresence exitBeforeEnter>
		<BrowserRouter>
			<PublicRoutes />
			<PrivateRoutes />
		</BrowserRouter>
	</AnimatePresence>
)

export default Router
