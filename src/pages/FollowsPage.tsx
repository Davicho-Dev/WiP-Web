import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Tabs } from '../components/molecules'

const tabs = [
	{
		label: 'Followers',
	},
	{
		label: 'Followers',
	},
]
const FollowsPage = () => {
	const { userID, list } = useParams()

	const [currentTab, setCurrentTab] = useState<number>(0)
	const [userList, setUserList] = useState([])

	// useEffect(() => {}, [])

	return (
		<section className='w-full h-full pb-9 overflow-y-auto'>
			<Tabs
				tabList={tabs}
				currentTab={currentTab}
				className='pt-4'
				setCurrentTab={setCurrentTab}
			/>
		</section>
	)
}

export default FollowsPage
