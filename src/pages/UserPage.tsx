import { useEffect, useState } from 'react'

import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AxiosError } from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 } from 'uuid'

import { ButtonSolid } from '../components/atoms'
import { PostItemCompact, Tabs } from '../components/molecules'
import { getLocalUsername } from '../constants'
import { hdlErrors } from '../helpers'
import { IUser } from '../interfaces'
import { SocialIcons, apiPrivate } from '../utils'

import DummyImg from '../assets/img/img_no_avatar.png'

const ProfilePage = () => {
	const { username } = useParams()

	const [currentTab, setCurrentTab] = useState<number>(0)
	const [onLoading, setOnLoading] = useState<boolean>(false)

	const [
		{
			picture,
			about,
			has_private_likes,
			follower_count,
			following_count,
			id,
			social,
		},
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

	return (
		<section className='w-full h-full py-4 md:!py-6 lg:!py-9 lg:px-10 overflow-y-auto'>
			<header className='grid gap-y-4'>
				<section className='w-full flex gap-x-4 md:!gap-x-6 px-4 md:!px-6 lg:!px-0'>
					<figure className='w-24 h-24 md:!w-40 md:!h-40 rounded-full overflow-hidden cursor-pointer shrink-0 grow-0'>
						<img
							className='w-full h-full object-cover'
							src={picture ?? DummyImg}
							alt={username + ' Avatar'}
							title={username + ' Avatar'}
						/>
					</figure>
					<aside className='grow self-center inline-grid md:!gap-y-2'>
						<h1 className='text-sm md:text-2xl'>{username}</h1>
						<nav className='flex gap-x-4 mt-2 md:!mt-0'>
							{social?.map(({ network, url }) => {
								if (url && url !== '')
									return (
										<a
											key={v4()}
											href={url}
											target='_blank'
											rel='noopener noreferrer'
										>
											<FontAwesomeIcon
												className='!text-primary cursor-pointer'
												icon={SocialIcons(network!)!}
											/>
										</a>
									)
							})}
						</nav>
					</aside>
					{username === getLocalUsername() ? (
						<button
							type='button'
							onClick={() => navigate('/settings')}
							className='w-11 h-11 md:!w-fit md:h-10 bg-neutral-800 text-secondary md:px-8 rounded-3xl flex justify-center items-center'
						>
							<FontAwesomeIcon icon={faPen} className='md:!mr-2' />
							<span className='hidden md:!block text-inherit'>
								Edit profile_
							</span>
						</button>
					) : null}
				</section>
				{username !== getLocalUsername() ? (
					<section className='w-full flex gap-4 flex-wrap justify-center lg:!justify-start md:!gap-x-6 px-4 md:!px-6 lg:!px-0'>
						<ButtonSolid
							label='Follow_'
							className='w-fit px-6 bg-transparent border-neutral-800 border'
						/>
						<ButtonSolid
							label='Request contact'
							className='w-fit px-6 bg-neutral-800 text-secondary'
						/>
						<ButtonSolid
							label='Send direct message'
							className='w-fit px-6 bg-neutral-800 text-secondary'
						/>
					</section>
				) : null}
				<article className='px-4 md:!px-6 lg:!px-0'>
					<h1 className='text-lg md:!text-2xl'>About me</h1>
					<p className='text-sm md:!text-base'>{about}</p>
				</article>
				<section className='w-full inline-flex gap-x-4 px-4 md:!px-6 lg:!px-0'>
					<ButtonSolid
						label={`${follower_count ?? 0} Followers_`}
						onClick={() => navigate(`/user/follows/${id}/followers`)}
						className='w-fit h-fit md:!h-10 px-8 bg-transparent border-2 border-neutral-800 text-sm text-neutral-800 line-clamp-2'
					/>
					<ButtonSolid
						label={`${following_count ?? 0} Followed_`}
						onClick={() => navigate(`/user/follows/${id}/followed`)}
						className='w-fit h-fit md:!h-10 px-8 bg-transparent border-2 border-neutral-800 text-sm text-neutral-800 line-clamp-2'
					/>
				</section>
				<Tabs
					currentTab={currentTab}
					setCurrentTab={setCurrentTab}
					isAnonymous={username !== getLocalUsername()}
					isPrivate={has_private_likes && username !== getLocalUsername()}
				/>
			</header>
			<section className='grid grid-cols-1 md:!grid-cols-2 xl:!grid-cols-3 gap-8 py-8 px-4 md:!px-6 lg:!px-0'>
				<PostItemCompact />
			</section>
		</section>
	)
}

export default ProfilePage
