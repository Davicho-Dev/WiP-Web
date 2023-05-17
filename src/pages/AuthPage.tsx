import { useEffect, useState } from 'react'

import { useAuth0 } from '@auth0/auth0-react'
import { faApple, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, useParams } from 'react-router-dom'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { ButtonLink } from '../components/atoms'
import { IcLogo } from '../components/atoms'
import {
	ForgotPasswordForm,
	LoginForm,
	RegisterForm,
} from '../components/organisms'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setCurrentAuthForm, setHasAccess } from '../store'
import { hdlErrors } from '../helpers'
import { apiPrivate, apiPublic } from '../utils'

const AuthPage = () => {
	const navigate = useNavigate()
	const [onLoading, setOnLoading] = useState<boolean>(false)
	const {
		loginWithPopup,
		isAuthenticated,
		getAccessTokenSilently,
		user,
		getIdTokenClaims,
	} = useAuth0()

	const { currentForm } = useParams()

	const { currentAuthForm, showAuthFormFooter } = useAppSelector(
		state => state.ui
	)
	const dispatch = useAppDispatch()

	const hdlLogin = async () => {
		// await loginWithRedirect({
		// 	appState: {
		// 		returnTo: '/',
		// 	},
		// })

		await loginWithPopup({
			authorizationParams: {
				scope: 'openid profile email',
			},
		})
	}

	const validateToken = async () => {
		try {
			await apiPrivate.get('/auth/validate_auth0/')

			dispatch(setHasAccess(true))

			navigate('/')
		} catch (err) {
			hdlErrors(err as AxiosError)
		}
	}

	useEffect(() => {
		if (isAuthenticated) {
			getIdTokenClaims()
				.then(resp => {
					const __raw = resp!.__raw
					const nickname = resp!.nickname?.replace(' ', '.')
					const email = resp!.email

					if (!__raw) throw new Error('No token')

					localStorage.setItem('username', nickname ?? email ?? '')
					localStorage.setItem('access', __raw)
					validateToken()
				})
				.catch(err => {
					toast.error(err.message)
					console.log(err.message)
				})
			console.log(user)
		}
	}, [isAuthenticated, getAccessTokenSilently, user])

	useEffect(() => {
		if (currentForm) dispatch(setCurrentAuthForm(currentForm))
	}, [currentForm])

	return (
		<aside className='w-11/12 md:!w-1/2 lg:!w-[29rem] h-fit p-6 lg:mr-20 bg-white rounded-3xl shadow-2xl'>
			<header className='flex flex-col gap-y-8 lg:!gap-y-10 mb-10'>
				<IcLogo className='w-[200px] fill-neutral-800' />
				<MarqueeTitle
					className='text-3xl uppercase text-primary line-clamp-1'
					label='join now get feedback'
				/>
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
							icon={faApple}
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

interface MarqueeTitleProps {
	className?: string
	label?: string
}

const MarqueeTitle = ({ className, label }: MarqueeTitleProps): JSX.Element => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return <marquee className={className}>{label}</marquee>
}

export default AuthPage
