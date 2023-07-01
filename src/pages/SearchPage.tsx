import { ChangeEvent, useEffect, useState } from 'react'

import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faHashtag, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InfiniteScroll from 'react-infinite-scroll-component'
import { AxiosError } from 'axios'

import { FormInput } from '../components/atoms'
import { UserCard } from '../components/molecules'
import { hdlErrors } from '../helpers'
import { ISearchResp, SearchResultUserItem } from '../interfaces'
import { apiPrivate } from '../utils'

const tabs = [
	{
		label: 'users',
		icon: <FontAwesomeIcon icon={faUser} />,
	},
	{
		label: 'hashtags',
		icon: <FontAwesomeIcon icon={faHashtag} className='text-xl' />,
	},
]

const SearchPage = () => {
	const [currentTab, setCurrentTab] = useState<number>(0)
	const [onLoading, setOnLoading] = useState<boolean>(false)
	const [hasMoreResults, setHasMoreResults] = useState<boolean>(false)
	const [offset, setOffset] = useState<number>(0)
	const [keyword, setKeyword] = useState<string>('')

	const [userList, setUserList] = useState<SearchResultUserItem[]>([])

	const getUsers = async ({ target }: ChangeEvent<HTMLInputElement>) => {
		setOnLoading(true)

		setOffset(0)

		if (target.value === '') {
			setUserList([])
		} else {
			try {
				const { data } = await apiPrivate.get<ISearchResp>(`users/`, {
					params: { search: target.value, limit: 20 },
				})

				setKeyword(target.value)
				setHasMoreResults(data.next !== null)

				setUserList(data.results)
			} catch (err) {
				hdlErrors(err as AxiosError)
			} finally {
				setOnLoading(false)
			}
		}
	}

	const getMoreUsers = async () => {
		setOnLoading(true)

		const newOffset = offset + 12

		if (keyword === '') {
			setUserList([])
		} else {
			try {
				const { data } = await apiPrivate.get<ISearchResp>(`users/`, {
					params: { search: keyword, offset: newOffset, limit: 20 },
				})

				setOffset(newOffset)
				setHasMoreResults(data.next !== null)

				setUserList(data.results)
			} catch (err) {
				hdlErrors(err as AxiosError)
			} finally {
				setOnLoading(false)
			}
		}
	}

	console.log(hasMoreResults && userList.length >= 12)
	// TODO: Create skeleton loader

	return (
		<main className='flex flex-col w-full h-full overflow-y-auto'>
			<header className='w-full bg-[#f9fbf1] py-4 grid lg:!justify-center border-b border-b-neutral-300 sticky top-0 px-4 md:!px-6'>
				{currentTab === 0 ? (
					<FormInput
						type='search'
						parentClassName='w-full md:!w-1/2 lg:!w-3/5 mx-auto'
						placeholder='Search user'
						onChange={getUsers}
					/>
				) : null}
				{currentTab === 1 ? (
					<FormInput
						type='search'
						placeholder='Search hashtag'
						onChange={({ target }) => console.log(target)}
					/>
				) : null}
			</header>
			{/* <section className='w-full px-4 lg:!px-10 flex flex-col items-center'> */}
			{/* <Tabs
					tabList={tabs}
					currentTab={currentTab}
					setCurrentTab={setCurrentTab}
				/> */}
			{/*// canFetchMore={*/}
			{/*// 	!onLoading &&*/}
			{/*// 	count > 12 &&*/}
			{/*// 	offset < count &&*/}
			{/*// 	followsList.length >= 12*/}
			{/*// }*/}
			{currentTab === 0 && (
				<InfiniteScroll
					next={getMoreUsers}
					dataLength={userList.length}
					hasMore={hasMoreResults && userList.length >= 12 && !onLoading}
					loader={
						<FontAwesomeIcon
							className='text-center text-primary animate-spin ml-[calc(50%_-_0.5rem)] mb-10'
							icon={faSpinner}
						/>
					}
				>
					<section className='w-full md:!w-4/5 lg:!w-3/5 py-10 grid gap-y-6 mx-auto px-4 md:!px-0'>
						{userList.length > 0 ? (
							userList.map(user => <UserCard key={user.id} {...user} />)
						) : (
							<h1>No user</h1>
						)}
					</section>
				</InfiniteScroll>
			)}
			{currentTab === 1 && <section>Hashtags</section>}
		</main>
	)
}

export default SearchPage
