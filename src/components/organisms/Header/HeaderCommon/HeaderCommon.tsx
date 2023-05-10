import {
	faBars,
	faBell,
	faBellConcierge,
	faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import { Avatar, IcLogo } from '../../../atoms'

import { IHeaderPrivateProps } from './HeaderCommon.interfaces'
import styles from './HeaderCommon.module.sass'
import { faMessage } from '@fortawesome/free-regular-svg-icons'

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
			className='h-5 md:!h-8 fill-secondary cursor-pointer'
			onClick={() => navigate(hasAccess ? '/' : '/auth')}
		/>
		<nav className='flex justify-end items-center gap-x-8 grow'>
			<Link
				className='w-fit h-fit leading-none'
				to={hasAccess ? '/search' : '/auth'}
			>
				<FontAwesomeIcon
					icon={faMagnifyingGlass}
					className='text-xl text-white'
				/>
			</Link>
			<FontAwesomeIcon
				icon={faMessage}
				className='text-xl text-white block lg:!hidden'
			/>
			<FontAwesomeIcon icon={faBell} className='text-xl text-white' />
			<Avatar
				src={picture}
				className='hidden lg:!block'
				title={username}
				onClick={() => navigate(hasAccess ? `/user/${username}` : '/auth')}
			/>
		</nav>
	</header>
)
