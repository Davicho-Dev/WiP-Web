import { useEffect, useState } from 'react'

import {
	faFacebook,
	faInstagram,
	faTiktok,
	faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import {
	faHeart,
	faTableCells,
	faUnlockKeyhole,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AxiosError } from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import { ButtonSolid } from '../components/atoms'
import { PostItemCompact, Tabs } from '../components/molecules'
import { hdlErrors } from '../helpers'
import { IUser } from '../interfaces'
import { apiPrivate } from '../utils'

import DummyImg from '../../../../assets/img/img_no_picture.png'

const ProfilePage = () => {
	const { username } = useParams()

	const [currentTab, setCurrentTab] = useState<number>(0)
	const [onLoading, setOnLoading] = useState<boolean>(false)
	const [tabs, setTabs] = useState([
		{
			label: 'Post',
			icon: <FontAwesomeIcon icon={faTableCells} />,
		},
		{
			label: 'Anonymous posts',
			icon: <FontAwesomeIcon icon={faUnlockKeyhole} />,
		},
		{
			label: 'Post you like',
			icon: <FontAwesomeIcon icon={faHeart} />,
		},
	])
	const [
		{ picture, about, has_private_likes, follower_count, following_count, id },
		setUser,
	] = useState<IUser>({})

	const navigate = useNavigate()

	const getUser = async () => {
		setOnLoading(true)

		try {
			const { data } = await apiPrivate.get(`/users/${username}/`)

			setUser(data)
		} catch (err) {
			hdlErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	useEffect(() => {
		if (username) getUser()
	}, [username])

	useEffect(() => {
		if (has_private_likes) tabs.pop()
	}, [has_private_likes])

	return (
		<section className='w-full h-full py-9 px-10 overflow-y-auto'>
			<header className='grid gap-y-4'>
				<section className='w-full flex gap-x-8'>
					<figure className='w-40 h-40 rounded-full overflow-hidden cursor-pointer shrink-0 grow-0'>
						<img
							className='w-full h-full object-cover'
							src={picture ?? DummyImg}
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
						label={`${follower_count} Followers_`}
						onClick={() => navigate(`/user/follows/${id}/followers`)}
						className='w-fit px-8 bg-transparent border border-2 border-neutral-800 text-neutral-800'
					/>
					<ButtonSolid
						label={`${following_count} Followed_`}
						onClick={() => navigate(`/user/follows/${id}/followed`)}
						className='w-fit px-8 bg-transparent border border-2 border-neutral-800 text-neutral-800'
					/>
				</section>
				<Tabs
					tabList={tabs}
					currentTab={currentTab}
					setCurrentTab={setCurrentTab}
				/>
			</header>
			<section className='grid grid-cols-1 md:!grid-cols-2 xl:!grid-cols-3 gap-8 py-8'>
				<PostItemCompact />
			</section>
		</section>
	)
}

export default ProfilePage
