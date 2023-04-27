import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { IcLogo } from '../components/atoms/Icons'
import {
	ForgotPasswordForm,
	LoginForm,
	RegisterForm,
} from '../components/organisms'
import { useAppDispatch, useAppSelector } from '../hooks'
import { ButtonLink } from '../components/atoms'
import { setCurrentAuthForm } from '../store/slices'

const AuthPage = () => {
	const currentAuthForm = useAppSelector(state => state.ui.currentAuthForm)
	const dispatch = useAppDispatch()

	return (
		<aside className='w-96 h-fit p-6 bg-white rounded-3xl shadow-2xl'>
			<header className='flex flex-col gap-y-10 mb-10'>
				<IcLogo className='w-[200px] fill-neutral-800' />
				<h1 className='text-3xl uppercase text-primary line-clamp-1'>
					join now get feedback
				</h1>
			</header>
			{currentAuthForm === 'login' ? <LoginForm /> : null}
			{currentAuthForm === 'register' ? <RegisterForm /> : null}
			{currentAuthForm === 'forgot_password' ? <ForgotPasswordForm /> : null}
			{currentAuthForm !== 'forgot_password' ? (
				<>
					<footer className='w-full grid gap-y-5 justify-items-center'>
						<article className='w-full flex items-center gap-x-2 mt-5'>
							<hr className='grow border-neutral-500' />
							<span>Connect with</span>
							<hr className='grow border-neutral-500' />
						</article>
						<nav className='flex gap-x-4'>
							<FontAwesomeIcon icon={faGoogle} />
							<FontAwesomeIcon icon={faFacebook} />
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
				</>
			) : null}
		</aside>
	)
}

export default AuthPage
