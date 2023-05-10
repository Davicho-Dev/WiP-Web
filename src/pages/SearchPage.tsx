import { useState } from 'react'

import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

	const [userList, setUserList] = useState<SearchResultUserItem[]>([])

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//  @ts-ignore
	const getUsers = async ({ target }) => {
		setOnLoading(true)

		if (target.value === '') {
			setUserList([])
		} else {
			try {
				const { data } = await apiPrivate.get<ISearchResp>(`users/`, {
					params: { search: target.value },
				})

				setUserList(data.results)
			} catch (err) {
				hdlErrors(err as AxiosError)
			} finally {
				setOnLoading(false)
			}
		}
	}

	// TODO: Create skeleton loader
	// FIXME: Infinite scroll
	return (
		<section className='w-full h-full pb-9 overflow-y-auto'>
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
						onChange={getUsers}
					/>
				) : null}
			</header>
			{/* <section className='w-full px-4 lg:!px-10 flex flex-col items-center'> */}
			{/* <Tabs
					tabList={tabs}
					currentTab={currentTab}
					setCurrentTab={setCurrentTab}
				/> */}
			{currentTab === 0 && (
				<section className='w-full md:!w-4/5 lg:!w-3/5 py-10 grid gap-y-6 mx-auto px-4 md:!px-0'>
					{userList.length > 0 ? (
						userList.map(user => (
							<UserCard key={user.id} {...user} isFollower={user.followed} />
						))
					) : (
						<h1>No user</h1>
					)}
				</section>
			)}
			{currentTab === 1 && <section>Hashtags</section>}
		</section>
		// </section>
	)
}

export default SearchPage
