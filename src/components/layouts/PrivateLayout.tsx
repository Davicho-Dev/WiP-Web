import { Outlet, useNavigate } from 'react-router-dom'
import { ButtonSolid } from '../atoms'

const PrivateLayout = () => {
	const navigate = useNavigate()

	return (
		<section className='w-screen h-screen grid grid-flow-col grid-cols-[15rem,_1fr]'>
			<aside className='bg-[#f9fbf1] border-r border-r-neutral-300 py-5 px-3'>
				<nav className='flex flex-col gap-y-6'>
					<ButtonSolid
						type='button'
						className='w-full pl-4 bg-neutral-900 text-secondary text-left'
						label='Home_'
						onClick={() => navigate('/settings')}
					/>
					<ButtonSolid
						type='button'
						className='w-full pl-4 bg-transparent text-neutral-900 text-left border-2 border-neutral-900'
						label='Direct messages_'
						onClick={() => navigate('/settings')}
					/>
					<ButtonSolid
						type='button'
						className='w-full pl-4 bg-transparent text-neutral-900 text-left border-2 border-neutral-900'
						label='Post you like_'
						onClick={() => navigate('/settings')}
					/>
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
	)
}

export default PrivateLayout
