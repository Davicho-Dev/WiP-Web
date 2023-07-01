import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import {
	faPlayCircle,
	faShareNodes,
	faUpRightAndDownLeftFromCenter,
} from '@fortawesome/free-solid-svg-icons'

import { Avatar } from '../../../atoms'

export const PostItemCompact = () => {
	return (
		<article className='w-full inline-grid gap-y-3 border-b border-b-neutral-200'>
			<figure className='w-full h-44 inline-grid grid-flow-col auto-cols-[100%] auto-rows-fr place-items-center bg-[#f9fbf1] border-2 border-neutral-800 rounded-full relative overflow-hidden'>
				<img
					className='w-full h-full'
					src='https://wip-app-prod-public-media.s3.amazonaws.com/media/users/pictures/2023/04/26/8319b910-e037-4c5b-a7eb-f6bf282611a9_yqfEvlm.jpg'
					alt=''
				/>
				<img
					className='w-full h-full'
					src='https://wip-app-prod-public-media.s3.amazonaws.com/media/users/pictures/2023/04/26/8319b910-e037-4c5b-a7eb-f6bf282611a9_yqfEvlm.jpg'
					alt=''
				/>
				<button className='m-auto absolute' type='button'>
					<FontAwesomeIcon
						className='w-14 h-14 text-secondary'
						icon={faPlayCircle}
					/>
				</button>
			</figure>
			<nav className='w-full inline-flex justify-center gap-x-1'>
				<button
					type='button'
					className='w-4 h-2 bg-primary rounded-full transition-all ease-in-out duration-500'
				/>
				<button
					type='button'
					className='w-2 h-2 bg-neutral-400 rounded-full transition-all ease-in-out duration-500'
				/>
				<button
					type='button'
					className='w-2 h-2 bg-neutral-400 rounded-full transition-all ease-in-out duration-500'
				/>
				<button
					type='button'
					className='w-2 h-2 bg-neutral-400 rounded-full transition-all ease-in-out duration-500'
				/>
			</nav>
			<span>Lorem, ipsum dolor sit amet...</span>
			<article className='flex items-center gap-x-2'>
				<Avatar
					className='w-6 h-6'
					src='https://wip-app-prod-public-media.s3.amazonaws.com/media/users/pictures/2023/04/26/8319b910-e037-4c5b-a7eb-f6bf282611a9_yqfEvlm.jpg'
				/>
				<span className='text-primary'>DavichoDev</span>
			</article>
			<span>February 25, 2023_</span>
			<nav className='flex justify-between pb-6'>
				<span>
					100 <FontAwesomeIcon className='text-primary' icon={faHeart} />
				</span>
				<span>
					100 <FontAwesomeIcon className='text-primary' icon={faMessage} />
				</span>
				<span>
					<FontAwesomeIcon className='text-primary' icon={faShareNodes} />
				</span>
				<span>
					<FontAwesomeIcon
						className='text-primary'
						icon={faUpRightAndDownLeftFromCenter}
					/>
				</span>
			</nav>
		</article>
	)
}
