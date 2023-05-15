import { useEffect, useState } from 'react'

import { AxiosError } from 'axios'
import { useParams } from 'react-router-dom'
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InfiniteScroll from 'react-infinite-scroll-component'
import { v4 } from 'uuid'

import { FormInput } from '../components/atoms'
import { UserCard } from '../components/molecules'
import { hdlErrors } from '../helpers'
import {
	IFollowedResp,
	IFollowedResultItem,
	IFollowersResp,
	IFollowersResultItem,
	ISearchFollowsResp,
	ISearchFollowsResultItem,
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
	const [onSearch, setOnSearch] = useState<boolean>(false)
	const [followsList, setFollowsList] = useState<IFollowersResultItem[]>([])
	const [followedList, setFollowedList] = useState<IFollowedResultItem[]>([])
	const [searchList, setSearchList] = useState<ISearchFollowsResultItem[]>([])
	const [count, setCount] = useState<number>(0)

	const [offset, setOffset] = useState<number>(0)
	const [keyword, setKeyword] = useState<string>('')
	const [hasMoreResults, setHasMoreResults] = useState<boolean>(false)

	const getFollows = async () => {
		setOnLoading(true)

		setOffset(0)

		try {
			const { data } = await apiPrivate.get<IFollowersResp>(
				`/users/${userID}/followers/`,
				{
					params: {
						offset,
					},
				}
			)

			setHasMoreResults(data.next !== null)

			setFollowsList(data.results)
		} catch (err) {
			hdlErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	const getMoreFollows = async () => {
		setOnLoading(true)

		const newOffset = offset + 12

		try {
			const { data } = await apiPrivate.get<IFollowersResp>(
				`/users/${userID}/followers/`,
				{
					params: {
						limit: 20,
						offset: newOffset,
					},
				}
			)

			setOffset(newOffset)
			setHasMoreResults(data.next !== null)

			setFollowsList(data.results)
		} catch (err) {
			hdlErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	const getFollowed = async () => {
		setOnLoading(true)

		setOffset(0)

		try {
			const { data } = await apiPrivate.get<IFollowedResp>(
				`/users/${userID}/followed/`
			)

			setHasMoreResults(data.next !== null)

			setFollowedList(data.results)
		} catch (err) {
			hdlErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	const getMoreFollowed = async () => {
		setOnLoading(true)

		const newOffset = offset + 12

		try {
			const { data } = await apiPrivate.get<IFollowedResp>(
				`/users/${userID}/followed/`,
				{
					params: {
						limit: 20,
						offset: newOffset,
					},
				}
			)

			setOffset(newOffset)
			setHasMoreResults(data.next !== null)

			setFollowedList(data.results)
		} catch (err) {
			hdlErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	const searchFollows = async ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
		setOnLoading(true)

		setOffset(0)

		if (target.value === '') {
			setOnSearch(false)
		} else {
			setOnSearch(true)
		}

		try {
			const { data } = await apiPrivate.get<ISearchFollowsResp>(`/users/`, {
				params: {
					follower: currentTab === 0 ? target.value : null,
					followed: currentTab === 1 ? target.value : null,
					limit: 20,
				},
			})

			setKeyword(target.value)
			setHasMoreResults(data.next !== null)

			setSearchList(data.results)
		} catch (err) {
			hdlErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	const searchMoreFollows = async () => {
		setOnLoading(true)

		const newOffset = offset + 12

		if (keyword === '') {
			setOnSearch(false)
		} else {
			setOnSearch(true)
		}

		try {
			const { data } = await apiPrivate.get<ISearchFollowsResp>(`/users/`, {
				params: {
					follower: currentTab === 0 ? keyword : null,
					followed: currentTab === 1 ? keyword : null,
					offset: newOffset,
					limit: 20,
				},
			})

			setOffset(newOffset)
			setHasMoreResults(data.next !== null)

			setSearchList(data.results)
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
		if (currentTab === 0 && !onSearch) {
			setFollowedList([])
			setSearchList([])
			getFollows()
		} else if (currentTab === 1 && !onSearch) {
			setFollowsList([])
			setSearchList([])
			getFollowed()
		} else if (onSearch) {
			setFollowsList([])
			setFollowedList([])
		}
	}, [currentTab, onSearch])

	// TODO: Create skeleton loader

	return (
		<main className='w-full max-h-full bg-[#f9fbf1] pb-9'>
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
				<FormInput
					type='search'
					placeholder='Search'
					onChange={searchFollows}
					icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
				/>
			</header>
			<InfiniteScroll
				next={
					currentTab === 0 && !onSearch
						? getMoreFollows
						: currentTab === 1 && !onSearch
						? getMoreFollowed
						: searchMoreFollows
				}
				dataLength={
					currentTab === 0 && !onSearch
						? followsList.length
						: currentTab === 1 && !onSearch
						? followedList.length
						: searchList.length
				}
				hasMore={
					hasMoreResults &&
					!onLoading &&
					(followsList.length >= 12 ||
						followedList.length >= 12 ||
						searchList.length >= 12)
				}
				loader={
					<FontAwesomeIcon
						className='text-center text-primary animate-spin ml-[calc(50%_-_0.5rem)] mb-10'
						icon={faSpinner}
					/>
				}
			>
				<section className='w-full md:!w-4/5 lg:!w-3/5 py-10 grid gap-y-6 mx-auto px-4 md:!px-0'>
					{currentTab === 0 && !onSearch ? (
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
					{currentTab === 1 && !onSearch ? (
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
							<h1 className='mx-auto py-80'>
								You are not following anyone yet
							</h1>
						)
					) : null}
					{onSearch ? (
						searchList.length > 0 ? (
							searchList.map(user => <UserCard key={v4()} {...user} />)
						) : (
							<h1 className='mx-auto py-80'>No results found</h1>
						)
					) : null}
				</section>
			</InfiniteScroll>
		</main>
	)
}

export default FollowsPage
