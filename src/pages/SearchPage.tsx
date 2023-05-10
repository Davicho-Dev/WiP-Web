import { useState } from 'react'

import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AxiosError } from 'axios'

import { Avatar, ButtonSolid, FormInput } from '../components/atoms'
import { Tabs } from '../components/molecules'
import { hdlErrors } from '../helpers'
import { apiPrivate } from '../utils'
import { ISearchResp, SearchUserResults } from '../interfaces'

import DummyImg from '../assets/img/img_no_avatar.png'

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

	const [userList, setUserList] = useState<SearchUserResults[]>([])

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
					{userList && userList.length > 0 ? (
						userList.map(user => <UserCard key={user.id} {...user} />)
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

interface IUserCardProps {
	id: number
	public_name: string
	followed: boolean
	picture: string | null
	username: string
}

export const UserCard = ({
	followed,
	id,
	picture,
	public_name,
	username,
}: IUserCardProps) => {
	const [isFollowed, setIsFollowed] = useState<boolean>(followed)
	const [onLoading, setOnLoading] = useState<boolean>(false)
	const [followSuccess, setFollowSuccess] = useState<boolean>(false)

	const followUser = async (id: number, followed: boolean) => {
		setOnLoading(true)

		try {
			await apiPrivate.patch(`users/${id}/follows/`, {
				active: !followed,
			})

			setIsFollowed(!followed)
			setFollowSuccess(true)
		} catch (err) {
			hdlErrors(err as AxiosError)
		} finally {
			setOnLoading(false)

			setTimeout(() => {
				setFollowSuccess(false)
			}, 1000)
		}
	}

	// FIXME: Mobile view
	return (
		<article
			key={id}
			className='flex justify-between gap-x-2 md:!gap-x-4 max-w-full overflow-hidden'
		>
			<Avatar className='w-11 h-11 shrink-0' src={picture ?? DummyImg} />
			<article className='grow shrink'>
				<h1 className='w-max md:!w-fit text-sm line-clamp-1 text-ellipsis'>
					{public_name}
				</h1>
				<h5 className='w-max md:!w-fit text-xs line-clamp-1 text-ellipsis'>
					@{username}
				</h5>
			</article>
			<ButtonSolid
				label={isFollowed ? 'Following_' : 'Follow_'}
				onLoading={onLoading}
				onSuccess={followSuccess}
				disabled={onLoading}
				onClick={() => followUser(id, isFollowed)}
				className={`w-fit px-5 border border-neutral-800 bg-transparent text-sm md:text-base ${
					isFollowed ? '!bg-primary text-white' : ''
				}`}
			/>
		</article>
	)
}

export default SearchPage
