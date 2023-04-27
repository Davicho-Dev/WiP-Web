import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { PasswordForm, ProfileForm } from '../components/organisms'
import { useAppSelector } from '../hooks'

type TFormTab = 'profile' | 'password'

// FIXME: Screen size is not responsive

const SettingsPage = () => {
	const user = useAppSelector(state => state.user)

	const [currentTab, setCurrentTab] = useState<TFormTab>('profile')

	return (
		<section className='w-full h-full grid grid-flow-col grid-cols-[15rem_1fr] py-9 px-32 gap-x-5 overflow-y-auto'>
			<aside className=' '>
				<h1 className='mb-4'>Settings</h1>
				<nav className='border-2 rounded-lg overflow-hidden'>
					<ul className=''>
						<li
							className={`w-full h-12 inline-flex gap-x-4 items-center px-5 cursor-pointer ${
								currentTab === 'profile'
									? 'text-primary bg-[#f9fbf1] border-l-primary border-l-2'
									: 'text-neutral-500'
							}`}
							onClick={() => setCurrentTab('profile')}
						>
							<FontAwesomeIcon icon={faUser} />
							Profile_
						</li>
						<hr />
						<li
							className={`w-full h-12 inline-flex gap-x-4 items-center px-5 cursor-pointer ${
								currentTab === 'password'
									? 'text-primary bg-[#f9fbf1] border-l-primary border-l-2'
									: 'text-neutral-500'
							}`}
							onClick={() => setCurrentTab('password')}
						>
							<FontAwesomeIcon icon={faLock} />
							Password_
						</li>
					</ul>
				</nav>
			</aside>
			{currentTab === 'profile' ? <ProfileForm {...user} /> : null}
			{currentTab === 'password' ? <PasswordForm {...user} /> : null}
		</section>
	)
}
export default SettingsPage
