import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHome, faPlus, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

import { Avatar } from '../../../atoms'

import { IFooterCommonProps } from './FooterCommon.interfaces'

export const FooterCommon = ({
	hasAccess,
	navigate,
	picture,
	username,
}: IFooterCommonProps) => (
	<footer className='h-14 p-4 inline-flex justify-between items-center text-xl bg-neutral-800 lg:!hidden'>
		<NavLink
			className={({ isActive }) =>
				`${isActive ? 'text-secondary' : 'text-white'} leading-none`
			}
			to='/'
		>
			<FontAwesomeIcon icon={faHome} />
		</NavLink>
		<FontAwesomeIcon className='text-white' icon={faVolumeHigh} />
		<span className='w-14 h-14 inline-grid place-content-center bg-primary border-8 border-white rounded-full -translate-y-1/2'>
			<FontAwesomeIcon className='text-white text-sm' icon={faPlus} />
		</span>
		<NavLink
			className={({ isActive }) =>
				`${isActive ? 'text-secondary' : 'text-white'} leading-none`
			}
			to='/'
		>
			<FontAwesomeIcon icon={faHeart} />
		</NavLink>
		<NavLink
			to={hasAccess ? `/user/${username}` : '/auth'}
			className={({ isActive }) =>
				`${
					isActive ? 'border border-secondary' : 'text-white'
				} leading-none rounded-full`
			}
		>
			<Avatar src={picture} title={username} className='w-6 h-6' />
		</NavLink>
	</footer>
)
