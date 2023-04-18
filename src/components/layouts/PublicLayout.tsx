import { Outlet } from 'react-router-dom'

import { CMSProvider } from '../../context'

const PublicLayout = () => {
	return (
		<CMSProvider>
			<Outlet />
		</CMSProvider>
	)
}

export default PublicLayout
