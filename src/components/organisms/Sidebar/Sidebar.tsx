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
import { NavLink } from 'react-router-dom'

import { logout } from '../../../helpers'
import { ButtonNavLink, ButtonSolid } from '../../atoms'

import { ISidebarProps } from './Sidebar.interfaces'

import styles from './Sidebar.module.sass'

export const Sidebar = ({ navigate }: ISidebarProps) => (
	<aside className={styles.wrapper}>
		<nav className={styles.wrapper__nav}>
			<ButtonNavLink
				to='/'
				label='Home_'
				className='grid-flow-col items-center justify-start gap-x-2'
				icon={<FontAwesomeIcon icon={faHomeAlt} />}
			/>
			<ButtonNavLink
				to='/'
				label='Post you like_'
				className='grid-flow-col items-center justify-start gap-x-2'
				icon={<FontAwesomeIcon icon={faMessage} />}
			/>
			<ButtonNavLink
				to='/'
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
		<footer className={styles.wrapper__footer}>
			<NavLink to='/settings' className='flex gap-x-2 w-fit'>
				<FontAwesomeIcon className='text-primary' icon={faCircleQuestion} />
				<span>Help_</span>
			</NavLink>
			<NavLink to='/settings' className='flex gap-x-2 w-fit'>
				<FontAwesomeIcon className='text-primary' icon={faCog} />
				<span>Settings_</span>
			</NavLink>
			<a
				className='flex gap-x-2 w-fit cursor-pointer'
				onClick={() => logout({ navigate })}
			>
				<FontAwesomeIcon className='text-primary' icon={faRightFromBracket} />
				<span>Go out_</span>
			</a>
		</footer>
	</aside>
)
