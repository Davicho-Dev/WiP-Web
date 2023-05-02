import { Outlet, useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../hooks'
import { HeaderCommon, Sidebar } from '../organisms'

import NoAvatar from '../../assets/img/img_no_avatar.png'

const PrivateLayout = () => {
	const navigate = useNavigate()

	const { username, picture } = useAppSelector(state => state.user)

	return (
		<main className='w-screen h-screen flex flex-col shrink-0'>
			<HeaderCommon
				navigate={navigate}
				picture={picture ?? NoAvatar}
				username={username}
			/>
			<section className='w-full h-full grid grid-flow-col grid-cols-[15rem,_1fr] grow overflow-hidden'>
				<Sidebar navigate={navigate} />
				<Outlet />
			</section>
		</main>
	)
}

export default PrivateLayout
