import { faMessage } from '@fortawesome/free-regular-svg-icons'
import {
	faBars,
	faBell,
	faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink } from 'react-router-dom'

import { Avatar, IcLogo } from '../../../atoms'

import { IHeaderPrivateProps } from './HeaderCommon.interfaces'
import styles from './HeaderCommon.module.sass'

export const HeaderCommon = ({
	navigate,
	picture,
	username,
	hasAccess,
	setShowSidebar,
}: IHeaderPrivateProps): JSX.Element => (
	<header className={styles.wrapper}>
		<FontAwesomeIcon
			onClick={setShowSidebar}
			className='text-xl text-white inline lg:!hidden'
			icon={faBars}
		/>
		<IcLogo
			className='h-5 lg:!h-8 fill-secondary cursor-pointer'
			onClick={() => navigate(hasAccess ? '/' : '/auth')}
		/>
		<nav className='flex justify-end items-center gap-x-8 grow'>
			<NavLink
				className={({ isActive }) =>
					`w-fit h-fit leading-none text-xl ${
						isActive ? 'text-secondary' : 'text-white'
					}`
				}
				to={hasAccess ? '/search' : '/auth'}
			>
				<FontAwesomeIcon icon={faMagnifyingGlass} />
			</NavLink>
			<FontAwesomeIcon
				icon={faMessage}
				className='text-xl text-white block lg:!hidden'
			/>
			<FontAwesomeIcon icon={faBell} className='text-xl text-white' />
			<NavLink
				to={hasAccess ? `/user/${username}` : '/auth'}
				className={({ isActive }) =>
					`border border-transparent ${
						isActive ? '!border-secondary' : ''
					} rounded-full`
				}
			>
				<Avatar src={picture} className='hidden lg:!block' title={username} />
			</NavLink>
		</nav>
	</header>
)
