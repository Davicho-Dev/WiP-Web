import { useState } from 'react'

import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AxiosError } from 'axios'

import { Avatar, ButtonSolid, FormInput } from '../components/atoms'
import { Tabs } from '../components/molecules'
import { hdlErrors } from '../helpers'
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

	const [userList, setUserList] = useState([])

	const getUsers = async ({ target }) => {
		setOnLoading(true)

		try {
			const { data } = await apiPrivate.get(`users/`, {
				params: { search: target.value },
			})

			setUserList(data.results)
		} catch (err) {
			hdlErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	const followUser = async (id: number, followed: boolean) => {
		setOnLoading(true)

		try {
			await apiPrivate.patch(`users/${id}/follows/`, {
				active: !followed,
			})
		} catch (err) {
			hdlErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	return (
		<section className='w-full h-full pb-9 overflow-y-auto'>
			<header className='bg-[#f9fbf1] w-full mb-4 py-4 grid justify-center border-b border-b-neutral-300 sticky top-0'>
				{currentTab === 0 ? (
					<FormInput
						type='search'
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
			<section className='w-full px-10 flex flex-col items-center'>
				<Tabs
					tabList={tabs}
					currentTab={currentTab}
					setCurrentTab={setCurrentTab}
				/>
				{currentTab === 0 && (
					<section className='w-3/5 py-10 grid gap-y-6'>
						{userList && userList.length > 0 ? (
							userList.map(({ id, public_name }) => (
								<article key={id} className='flex justify-between'>
									<aside className='inline-flex items-center gap-x-2'>
										<Avatar
											className='w-11 h-11'
											src='https://wip-app-prod-public-media.s3.amazonaws.com/media/users/pictures/2023/04/26/8319b910-e037-4c5b-a7eb-f6bf282611a9_yqfEvlm.jpg'
										/>
										<article>
											<h1 className='text-sm'>{public_name}</h1>
											<p className='text-xs'>@username</p>
										</article>
									</aside>
									<ButtonSolid
										label={'Follow_'}
										onClick={() => followUser(id, false)}
										className='w-fit px-5 border border-neutral-800 bg-transparent'
									/>
								</article>
							))
						) : (
							<h1>No user</h1>
						)}
					</section>
				)}
				{currentTab === 1 && <section>Hashtags</section>}
			</section>
		</section>
	)
}

export default SearchPage
