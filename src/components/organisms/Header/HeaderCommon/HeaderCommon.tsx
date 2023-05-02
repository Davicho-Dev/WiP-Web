import {
	faBars,
	faBell,
	faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Avatar, IcLogo } from '../../../atoms'

import { IHeaderPrivateProps } from './HeaderCommon.interfaces'
import styles from './HeaderCommon.module.sass'

export const HeaderCommon = ({
	navigate,
	picture,
	username,
}: IHeaderPrivateProps): JSX.Element => (
	<header className={styles.wrapper}>
		<FontAwesomeIcon
			className='text-xl text-white inline lg:!hidden'
			icon={faBars}
		/>
		<IcLogo
			className='h-8 fill-secondary cursor-pointer'
			onClick={() => navigate('/')}
		/>
		<nav className='flex justify-between items-center gap-x-8'>
			<FontAwesomeIcon
				icon={faMagnifyingGlass}
				className='text-xl text-white'
			/>
			<FontAwesomeIcon icon={faBell} className='text-xl text-secondary' />
			<Avatar
				src={picture}
				title={username}
				onClick={() => navigate(`/user/${username}`)}
			/>
		</nav>
	</header>
)
