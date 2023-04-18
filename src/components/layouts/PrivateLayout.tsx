import { Navigate, Outlet } from 'react-router-dom'

import { useCookies } from 'react-cookie'

import { CMSProvider } from '../../context'

const PrivateLayout = () => {
	const [cookie] = useCookies()

	return cookie['TOKEN'] ? (
		<CMSProvider>
			<Outlet />
		</CMSProvider>
	) : (
		<Navigate to='/login' />
	)
}

export default PrivateLayout
