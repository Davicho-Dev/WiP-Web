import { useEffect, useState } from 'react'

import { AxiosError } from 'axios'
import { useParams } from 'react-router-dom'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { v4 } from 'uuid'

import { FormInput } from '../components/atoms'
import { UserCard } from '../components/molecules'
import { hdlErrors } from '../helpers'
import {
	IFollowedResp,
	IFollowedResultItem,
	IFollowersResp,
	IFollowersResultItem,
} from '../interfaces'
import { apiPrivate } from '../utils'

const tabs = [
	{
		label: 'Followers',
	},
	{
		label: 'Followed',
	},
]
const FollowsPage = () => {
	const { userID, list } = useParams()

	const [currentTab, setCurrentTab] = useState<number>(0)
	const [onLoading, setOnLoading] = useState<boolean>(false)
	const [followsList, setFollowsList] = useState<IFollowersResultItem[]>([])
	const [followedList, setFollowedList] = useState<IFollowedResultItem[]>([])

	const getFollows = async () => {
		setOnLoading(true)

		try {
			const { data } = await apiPrivate.get<IFollowersResp>(
				`/users/${userID}/followers/`
			)

			setFollowsList(data.results)
		} catch (err) {
			hdlErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	const getFollowed = async () => {
		setOnLoading(true)

		try {
			const { data } = await apiPrivate.get<IFollowedResp>(
				`/users/${userID}/followed/`
			)

			setFollowedList(data.results)
		} catch (err) {
			hdlErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	useEffect(() => {
		if (list === 'followed') {
			setCurrentTab(1)
		}
	}, [list])

	useEffect(() => {
		setFollowedList([])
		if (currentTab === 0) {
			getFollows()
		} else if (currentTab === 1) {
			getFollowed()
		}
	}, [currentTab])

	// TODO: Create skeleton loader
	// FIXME: Infinite scroll
	return (
		<section className='w-full h-full bg-[#f9fbf1] pb-9 overflow-y-auto'>
			<nav
				className={`w-full flex justify-center border-b border-b-neutral-300 bg-white`}
			>
				<span
					className={`w-full md:!w-60 h-10 inline-flex text-center leading-none cursor-pointer text-neutral-400 border-b-2 justify-center items-center gap-x-2 capitalize ${
						currentTab === 0
							? '!text-primary border-b-primary'
							: 'border-b-transparent'
					}`}
					onClick={() => setCurrentTab(0)}
				>
					Followers
				</span>
				<span
					className={`w-full md:!w-60 h-10 inline-flex text-center leading-none cursor-pointer text-neutral-400 border-b-2 justify-center items-center gap-x-2 capitalize ${
						currentTab === 1
							? '!text-primary border-b-primary'
							: 'border-b-transparent'
					}`}
					onClick={() => setCurrentTab(1)}
				>
					Followed
				</span>
			</nav>
			<header className='w-full py-4 grid lg:!justify-center border-b border-b-neutral-300 sticky top-0 px-4 md:!px-6 lg:!hidden'>
				{currentTab === 0 ? (
					<FormInput
						type='search'
						parentClassName='w-full md:!w-1/2 lg:!w-3/5 mx-auto'
						placeholder='Search'
						onChange={() => {}}
						icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
					/>
				) : null}
				{currentTab === 1 ? (
					<FormInput
						type='search'
						placeholder='Search'
						onChange={() => {}}
						icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
					/>
				) : null}
			</header>
			<section className='w-full md:!w-4/5 lg:!w-3/5 py-10 grid gap-y-6 mx-auto px-4 md:!px-0'>
				{currentTab === 0 ? (
					followsList.length > 0 ? (
						followsList.map(({ from_user, followed, follower }) => (
							<UserCard
								followed={followed}
								id={from_user?.id}
								follower={follower}
								key={v4()}
								picture={from_user?.picture}
								username={from_user?.username}
							/>
						))
					) : (
						<h1 className='mx-auto py-80'>Nobody is following you yet</h1>
					)
				) : null}
				{currentTab === 1 ? (
					followedList.length > 0 ? (
						followedList.map(({ to_user, followed, follower }) => (
							<UserCard
								followed={followed}
								id={to_user?.id}
								follower={follower}
								key={v4()}
								picture={to_user?.picture}
								username={to_user?.username}
							/>
						))
					) : (
						<h1 className='mx-auto py-80'>You are not following anyone yet</h1>
					)
				) : null}
			</section>
		</section>
	)
}

export default FollowsPage
