import { Outlet, useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../hooks'
import { ButtonNavLink, ButtonSolid } from '../atoms'
import { IcLogo } from '../atoms/Icons'

const PrivateLayout = () => {
	const navigate = useNavigate()

	const { username, picture } = useAppSelector(state => state.user)

	return (
		<main className='w-screen h-screen flex flex-col shrink-0'>
			<header className='w-full bg-neutral-800 flex justify-between py-4 px-10'>
				<IcLogo className='h-8 fill-secondary' />
				<nav className='flex justify-between items-center'>
					<figure
						className='w-7 h-7 rounded-full overflow-hidden cursor-pointer'
						onClick={() => navigate('/user')}
					>
						<img
							className='w-full h-full object-cover'
							src={picture}
							alt={username + ' Avatar'}
							title={username + ' Avatar'}
						/>
					</figure>
				</nav>
			</header>
			<section className='w-full h-full grid grid-flow-col grid-cols-[15rem,_1fr] grow'>
				<aside className='bg-[#f9fbf1] border-r border-r-neutral-300 py-5 px-3'>
					<nav className='h-full flex flex-col gap-y-6'>
						<ButtonNavLink to='/' label='Home_' />
						<ButtonNavLink to='/settings' label='Post you like_' />
						<ButtonNavLink to='/settings' label='Direct messages_' />
						<ButtonSolid
							type='button'
							className='w-full pl-4 bg-primary text-white text-left'
							label='Create_'
							onClick={() => navigate('/settings')}
						/>
					</nav>
				</aside>
				<Outlet />
			</section>
		</main>
	)
}

export default PrivateLayout
