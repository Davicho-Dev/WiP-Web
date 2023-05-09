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
		<section className='w-full max-h-full grid lg:grid-flow-col lg:grid-cols-[15rem_1fr] lg:py-9 lg:px-32 gap-x-5 overflow-y-auto'>
			<aside className=' '>
				<h1 className='mb-4'>Settings</h1>
				<nav className='border-b lg:!border-2 lg:rounded-[10px] overflow-hidden grid grid-flow-col grid-cols-2 lg:!grid-cols-1 lg:!grid-flow-row'>
					<span
						className={`w-full h-12 inline-flex gap-x-4 items-center justify-center lg:!justify-start px-5 cursor-pointer border-b-2 lg:border-l-2 lg:!border-b-0 ${
							currentTab === 'profile'
								? 'text-primary bg-[#f9fbf1] border-b-primary lg:border-l-primary lg:!border-b-inherit'
								: 'text-neutral-500 lg:border-l-[#f9fbf1] border-b-transparent lg:border-b-'
						}`}
						onClick={() => setCurrentTab('profile')}
					>
						<FontAwesomeIcon icon={faUser} />
						Profile_
					</span>
					<hr className='hidden lg:!block' />
					<span
						className={`w-full h-12 inline-flex gap-x-4 items-center justify-center lg:!justify-start px-5 cursor-pointer border-b-2 lg:border-l-2 lg:!border-b-0 ${
							currentTab === 'password'
								? 'text-primary bg-[#f9fbf1] border-b-primary lg:border-l-primary lg:!border-b-inherit'
								: 'text-neutral-500 lg:border-l-[#f9fbf1] border-b-transparent lg:border-b-'
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
