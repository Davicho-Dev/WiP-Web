import { useEffect, useState } from 'react'

import { AxiosError } from 'axios'
import { useParams } from 'react-router-dom'

import { Tabs } from '../components/molecules'
import { hdlErrors } from '../helpers'
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
	const [userList, setUserList] = useState([])

	const getFollows = async () => {
		setOnLoading(true)

		try {
			const { data } = await apiPrivate.get(`/users/${userID}/followers/`)
			console.log(data.results)
		} catch (err) {
			hdlErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	const getFollowed = async () => {
		setOnLoading(true)

		try {
			const { data } = await apiPrivate.get(`/users/${userID}/followed/`)
			console.log(data.results)
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
		if (currentTab === 0) {
			getFollows()
		} else if (currentTab === 1) {
			getFollowed()
		}
	}, [currentTab])

	return (
		<section className='w-full h-full pb-9 overflow-y-auto'>
			<Tabs
				tabList={tabs}
				currentTab={currentTab}
				className='pt-4'
				setCurrentTab={setCurrentTab}
			/>
			<section className='w-full px-10 flex flex-col items-center'>
				<h1 className='py-80'>
					{currentTab === 0
						? 'Nobody is following you yet'
						: 'You are not following anyone yet'}
				</h1>
			</section>
		</section>
	)
}

export default FollowsPage
