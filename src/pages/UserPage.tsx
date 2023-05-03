import { useState } from 'react'

import {
	faFacebook,
	faInstagram,
	faTiktok,
	faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, useParams } from 'react-router-dom'

import { ButtonSolid } from '../components/atoms'
import { PostItemCompact } from '../components/molecules'
import { useAppSelector } from '../hooks'

const ProfilePage = () => {
	const { username } = useParams()

	const [currentTab, setCurrentTab] = useState<number>(1)

	const navigate = useNavigate()

	const { picture, about, has_private_likes } = useAppSelector(
		state => state.user
	)

	return (
		<section className='w-full h-full py-9 px-10 overflow-y-auto'>
			<header className='grid gap-y-4'>
				<section className='w-full flex gap-x-8'>
					<figure className='w-40 h-40 rounded-full overflow-hidden cursor-pointer shrink-0 grow-0'>
						<img
							className='w-full h-full object-cover'
							src={picture}
							alt={username + ' Avatar'}
							title={username + ' Avatar'}
						/>
					</figure>
					<aside className='grow self-center inline-grid gap-y-2'>
						<h1 className='text-2xl'>{username}</h1>
						<nav className='flex gap-x-4'>
							<FontAwesomeIcon
								className='!text-primary cursor-pointer'
								icon={faTiktok}
							/>
							<FontAwesomeIcon
								className='!text-primary cursor-pointer'
								icon={faFacebook}
							/>
							<FontAwesomeIcon
								className='!text-primary cursor-pointer'
								icon={faTwitter}
							/>
							<FontAwesomeIcon
								className='!text-primary cursor-pointer'
								icon={faInstagram}
							/>
						</nav>
					</aside>
					<ButtonSolid
						label='Edit profile_'
						onClick={() => navigate('/settings')}
						className='w-fit bg-neutral-800 text-secondary px-8'
					/>
				</section>
				<article>
					<h1 className='text-2xl'>About me</h1>
					<p>{about}</p>
				</article>
				<section className='w-full inline-flex gap-x-4'>
					<ButtonSolid
						label={`${1000} Followers_`}
						className='w-fit px-8 bg-transparent border border-2 border-neutral-800 text-neutral-800'
					/>
					<ButtonSolid
						label={`${300} Followed_`}
						className='w-fit px-8 bg-transparent border border-2 border-neutral-800 text-neutral-800'
					/>
				</section>
				<nav className='w-full grid grid-flow-col justify-center border-b border-b-neutral-300'>
					<h2
						className={`w-60 h-10 inline-grid place-items-center text-center cursor-pointer text-neutral-500 ${
							currentTab === 1 ? 'text-primary border-b-2 border-b-primary' : ''
						}`}
						onClick={() => setCurrentTab(1)}
					>
						Post_
					</h2>
					<h2
						className={`w-60 h-10 inline-grid place-items-center text-center cursor-pointer text-neutral-500 ${
							currentTab === 2 ? 'text-primary border-b-2 border-b-primary' : ''
						}`}
						onClick={() => setCurrentTab(2)}
					>
						Anonymous posts_
					</h2>
					{!has_private_likes ? (
						<h2
							className={`w-60 h-10 inline-grid place-items-center text-center cursor-pointer text-neutral-500 ${
								currentTab === 3
									? 'text-primary border-b-2 border-b-primary'
									: ''
							}`}
							onClick={() => setCurrentTab(3)}
						>
							Post you like_
						</h2>
					) : null}
				</nav>
			</header>
			<section className='grid grid-cols-1 md:!grid-cols-2 xl:!grid-cols-3 gap-8 py-8'>
				<PostItemCompact />
				<PostItemCompact />
				<PostItemCompact />
				<PostItemCompact />
				<PostItemCompact />
				<PostItemCompact />
				<PostItemCompact />
				<PostItemCompact />
				<PostItemCompact />
				<PostItemCompact />
			</section>
		</section>
	)
}

export default ProfilePage
