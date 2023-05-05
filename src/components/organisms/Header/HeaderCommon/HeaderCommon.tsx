import {
	faBars,
	faBell,
	faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import { Avatar, IcLogo } from '../../../atoms'

import { IHeaderPrivateProps } from './HeaderCommon.interfaces'
import styles from './HeaderCommon.module.sass'

export const HeaderCommon = ({
	navigate,
	picture,
	username,
	hasAccess,
}: IHeaderPrivateProps): JSX.Element => (
	<header className={styles.wrapper}>
		<FontAwesomeIcon
			className='text-xl text-white inline lg:!hidden'
			icon={faBars}
		/>
		<IcLogo
			className='h-8 fill-secondary cursor-pointer'
			onClick={() => navigate(hasAccess ? '/' : '/auth')}
		/>
		<nav className='flex justify-between items-center gap-x-8'>
			<Link
				className='w-fit h-fit leading-none'
				to={hasAccess ? '/search' : '/auth'}
			>
				<FontAwesomeIcon
					icon={faMagnifyingGlass}
					className='text-xl text-white'
				/>
			</Link>
			<FontAwesomeIcon icon={faBell} className='text-xl text-secondary' />
			<Avatar
				src={picture}
				title={username}
				onClick={() => navigate(hasAccess ? `/user/${username}` : '/auth')}
			/>
		</nav>
	</header>
)
