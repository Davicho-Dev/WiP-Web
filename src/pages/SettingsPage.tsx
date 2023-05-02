import { useState } from 'react'

import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

import { PasswordForm, ProfileForm } from '../components/organisms'
import { useAppSelector } from '../hooks'

type TFormTab = 'profile' | 'password'

const SettingsPage = () => {
	const user = useAppSelector(state => state.user)

	const [currentTab, setCurrentTab] = useState<TFormTab>('profile')

	return (
		<section className='w-full max-h-full grid grid-flow-col grid-cols-[15rem_1fr] py-9 px-32 gap-x-5 overflow-y-auto'>
			<aside className=' '>
				<h1 className='mb-4'>Settings</h1>
				<nav className='border-2 rounded-[10px] overflow-hidden'>
					<span
						className={`w-full h-12 inline-flex gap-x-4 items-center px-5 cursor-pointer border-l-2 ${
							currentTab === 'profile'
								? 'text-primary bg-[#f9fbf1] border-l-primary'
								: 'text-neutral-500 border-l-[#f9fbf1]'
						}`}
						onClick={() => setCurrentTab('profile')}
					>
						<FontAwesomeIcon icon={faUser} />
						Profile_
					</span>
					<hr />
					<span
						className={`w-full h-12 inline-flex gap-x-4 items-center px-5 cursor-pointer border-l-2 ${
							currentTab === 'password'
								? 'text-primary bg-[#f9fbf1] border-l-primary'
								: 'text-neutral-500 border-l-[#f9fbf1]'
						}`}
						onClick={() => setCurrentTab('password')}
					>
						<FontAwesomeIcon icon={faLock} />
						Password_
					</span>
				</nav>
			</aside>
			{currentTab === 'profile' ? <ProfileForm {...user} /> : null}
			{currentTab === 'password' ? <PasswordForm {...user} /> : null}
		</section>
	)
}
export default SettingsPage
