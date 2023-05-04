import { useEffect } from 'react'

import { useAuth0 } from '@auth0/auth0-react'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'react-router-dom'

import { ButtonLink } from '../components/atoms'
import { IcLogo } from '../components/atoms/Icons'
import {
	ForgotPasswordForm,
	LoginForm,
	RegisterForm,
} from '../components/organisms'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setCurrentAuthForm } from '../store'

const AuthPage = () => {
	const { currentForm } = useParams()

	const { currentAuthForm, showAuthFormFooter } = useAppSelector(
		state => state.ui
	)
	const dispatch = useAppDispatch()

	const { loginWithRedirect } = useAuth0()

	const hdlLogin = async () => {
		await loginWithRedirect({
			appState: {
				returnTo: '/',
			},
		})
	}

	useEffect(() => {
		if (currentForm) dispatch(setCurrentAuthForm(currentForm))
	}, [currentForm])

	return (
		<aside className='w-11/12 md:!w-1/2 lg:!w-[29rem] h-fit p-6 lg:mr-20 bg-white rounded-3xl shadow-2xl'>
			<header className='flex flex-col gap-y-8 lg:!gap-y-10 mb-10'>
				<IcLogo className='w-[200px] fill-neutral-800' />
				<h1 className='text-3xl uppercase text-primary line-clamp-1'>
					All art is a work in progress_
				</h1>
			</header>
			{currentAuthForm === 'login' ? <LoginForm /> : null}
			{currentAuthForm === 'register' ? <RegisterForm /> : null}
			{currentAuthForm === 'forgot_password' ? <ForgotPasswordForm /> : null}
			{showAuthFormFooter ? (
				<footer className='w-full grid gap-y-5 justify-items-center'>
					<article className='w-full flex items-center gap-x-2 mt-5'>
						<hr className='grow border-neutral-500' />
						<span>Connect with</span>
						<hr className='grow border-neutral-500' />
					</article>
					<nav className='flex gap-x-4'>
						<FontAwesomeIcon
							className='cursor-pointer'
							icon={faGoogle}
							onClick={hdlLogin}
						/>
						<FontAwesomeIcon
							className='cursor-pointer text-blue-700'
							icon={faFacebook}
							onClick={hdlLogin}
						/>
					</nav>
					{currentAuthForm === 'login' ? (
						<ButtonLink
							label='Create one here'
							onClick={() => dispatch(setCurrentAuthForm('register'))}
						/>
					) : null}
					{currentAuthForm === 'register' ? (
						<ButtonLink
							label='Login'
							onClick={() => dispatch(setCurrentAuthForm('login'))}
						/>
					) : null}
				</footer>
			) : null}
		</aside>
	)
}

export default AuthPage
