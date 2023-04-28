import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCircleQuestion,
	faCog,
	faHeart,
	faHomeAlt,
	faMessage,
	faPlusCircle,
	faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'

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
				<aside className='bg-[#f9fbf1] border-r border-r-neutral-300 py-5 px-3 inline-flex flex-col justify-between'>
					<nav className='flex flex-col gap-y-6'>
						<ButtonNavLink
							to='/'
							label='Home_'
							className='grid-flow-col items-center justify-start gap-x-2'
							icon={<FontAwesomeIcon icon={faHomeAlt} />}
						/>
						<ButtonNavLink
							to='/settings'
							label='Post you like_'
							className='grid-flow-col items-center justify-start gap-x-2'
							icon={<FontAwesomeIcon icon={faMessage} />}
						/>
						<ButtonNavLink
							to='/settings'
							label='Direct messages_'
							className='grid-flow-col items-center justify-start gap-x-2'
							icon={<FontAwesomeIcon icon={faHeart} />}
						/>
						<ButtonSolid
							type='button'
							className='w-full pl-4 bg-primary text-white text-left justify-start gap-x-2'
							label='Create_'
							icon={<FontAwesomeIcon icon={faPlusCircle} />}
							onClick={() => navigate('/settings')}
						/>
					</nav>
					<footer className='grid gap-y-3'>
						<NavLink to='/settings' className='flex gap-x-2'>
							<FontAwesomeIcon
								className='text-primary'
								icon={faCircleQuestion}
							/>
							<span>Help_</span>
						</NavLink>
						<NavLink to='/settings' className='flex gap-x-2'>
							<FontAwesomeIcon className='text-primary' icon={faCog} />
							<span>Settings_</span>
						</NavLink>
						<NavLink to='/settings' className='flex gap-x-2'>
							<FontAwesomeIcon
								className='text-primary'
								icon={faRightFromBracket}
							/>
							<span>Go out_</span>
						</NavLink>
					</footer>
				</aside>
				<Outlet />
			</section>
		</main>
	)
}

export default PrivateLayout
