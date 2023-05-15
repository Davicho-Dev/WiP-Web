import {
	faCircleQuestion,
	faCog,
	faHeart,
	faHomeAlt,
	faMessage,
	faPlusCircle,
	faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth0 } from '@auth0/auth0-react'
import { NavLink } from 'react-router-dom'

import { ButtonNavLink, ButtonSolid } from '../../atoms'
import { useAppDispatch } from '../../../hooks'
import { clearUser } from '../../../store'

import { ISidebarProps } from './Sidebar.interfaces'
import styles from './Sidebar.module.sass'

export const Sidebar = ({
	navigate,
	hasAccess,
	showSidebar,
}: ISidebarProps): JSX.Element => {
	const { logout: auth0Logout } = useAuth0()
	const dispatch = useAppDispatch()

	const hdlLogout = () => {
		dispatch(clearUser())

		auth0Logout({ logoutParams: { returnTo: '/auth' } })
	}

	return (
		<aside
			className={`${styles.wrapper} ${
				showSidebar ? styles['wrapper--show'] : ''
			}`}
		>
			<nav className={styles.wrapper__nav}>
				<ButtonNavLink
					to='/'
					label='Home_'
					className='grid-flow-col items-center justify-start gap-x-2'
					icon={<FontAwesomeIcon icon={faHomeAlt} />}
				/>
				<ButtonNavLink
					to={hasAccess ? '/post_you_like' : '/auth'}
					label='Post you like_'
					className='grid-flow-col items-center justify-start gap-x-2'
					icon={<FontAwesomeIcon icon={faMessage} />}
				/>
				<ButtonNavLink
					to={hasAccess ? '/direct_messages' : '/auth'}
					label='Direct messages_'
					className='grid-flow-col items-center justify-start gap-x-2'
					icon={<FontAwesomeIcon icon={faHeart} />}
				/>
				<ButtonSolid
					type='button'
					className='w-full px-4 bg-primary text-white text-left justify-start gap-x-2'
					label='Create_'
					icon={<FontAwesomeIcon icon={faPlusCircle} />}
					onClick={() => navigate('/settings')}
				/>
			</nav>
			<footer className={styles.wrapper__footer}>
				<NavLink
					to={hasAccess ? '/settings' : '/auth'}
					className='flex gap-x-2 w-fit'
				>
					<FontAwesomeIcon className='text-primary' icon={faCircleQuestion} />
					<span>Help_</span>
				</NavLink>
				<NavLink
					to={hasAccess ? '/settings' : '/auth'}
					className='flex gap-x-2 w-fit'
				>
					<FontAwesomeIcon className='text-primary' icon={faCog} />
					<span>Settings_</span>
				</NavLink>
				<a className='flex gap-x-2 w-fit cursor-pointer' onClick={hdlLogout}>
					<FontAwesomeIcon className='text-primary' icon={faRightFromBracket} />
					<span>Go out_</span>
				</a>
			</footer>
		</aside>
	)
}
