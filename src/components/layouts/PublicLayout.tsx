import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
	return (
		<section className='w-screen h-screen flex justify-end items-center bg__public pr-20'>
			<Outlet />
		</section>
	)
}

export default PublicLayout
