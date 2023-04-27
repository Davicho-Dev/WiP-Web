import { useEffect, useState } from 'react'

import { faHandshake, faImages } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AxiosError } from 'axios'
import { jwtDecode } from 'jwt-js-decode'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { apiPrivate, apiPublic } from '../../api'
import { ButtonLink, ButtonSolid, FormInput } from '../../components/atoms'
import { IcLogo } from '../../components/atoms/Icons'
import { getLocalAccessToken } from '../../constants'
import { hdlAxiosErrors } from '../../helpers'

interface IAuthResp {
	ACCESS: string
	REFRESH: string
}
interface IFormProps {
	username?: string
	about?: string
	picture: File
}

type TQueryParams = {
	token: string
	email: string
}

const RegisterVerificationPage = () => {
	const { email, token } = useParams<TQueryParams>()
	const navigate = useNavigate()

	const [onLoading, setOnLoading] = useState<boolean>(false)
	const [success, setSuccess] = useState(false)
	const [showNextStep, setShowNextStep] = useState<boolean>(false)
	const [step, setStep] = useState<number>(1)

	const {
		handleSubmit,
		formState: { errors },
		register,
		getValues,
	} = useForm<IFormProps>()

	const onSubmit = async ({ about, picture, username }: IFormProps) => {
		setOnLoading(true)

		const access = getLocalAccessToken() ?? ''
		const { payload } = jwtDecode(access)

		const formData = new FormData()

		if (picture?.length > 0) {
			formData.append('picture', picture[0])
		}
		if (username) {
			formData.append('username', username)
		}
		if (about) {
			formData.append('about', about)
		}

		try {
			await apiPrivate.patch(`/users/${payload.user_id}/`, formData)

			navigate('/')
		} catch (err) {
			hdlAxiosErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	const hdlVerifyToken = async () => {
		setOnLoading(true)

		try {
			const { data } = await apiPublic.post<IAuthResp>(
				'/auth/sign-up-validate/',
				{
					email,
					token,
				}
			)

			console.log(data)

			localStorage.setItem('access', data.ACCESS)
			localStorage.setItem('refresh', data.REFRESH)

			setSuccess(true)
		} catch (err) {
			hdlAxiosErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	useEffect(() => {
		hdlVerifyToken()
	}, [])

	if (showNextStep)
		return (
			<aside className='w-96 h-fit p-6 bg-white rounded-3xl shadow-2xl'>
				<header className='flex flex-col gap-y-10 mb-10'>
					<IcLogo className='w-[200px]' />
				</header>
				<form className='w-full ' onSubmit={handleSubmit(onSubmit)}>
					<section
						className={`grid h-fit relative ${
							step === 1
								? 'before:absolute before:h-[calc(100%_-_3rem)] before:border-l-2 before:left-[calc(0.75rem_-_1px)] before:top-[3rem]'
								: ''
						} `}
					>
						<header className='flex items-center gap-x-2 mb-4'>
							<span className='w-6 h-6 text-white bg-primary text-center rounded-full text-xs flex items-center justify-center'>
								1
							</span>
							<h5>About you</h5>
						</header>
						<article
							className={`w-full pl-8 justify-self-end grid gap-y-6 overflow-hidden transition-all ease-out duration-500 ${
								step === 1 ? 'h-full' : 'h-0'
							}`}
						>
							<fieldset className='grid gap-y-2'>
								<label>Create your username</label>
								<FormInput
									placeholder='User name'
									register={{ ...register('username') }}
								/>
							</fieldset>
							<fieldset>
								<label>Tell us about yourself</label>
								<textarea
									className='w-full p-4 flex gap-x-1 items-center border border-black rounded-3xl'
									placeholder='About you'
									rows={3}
									{...register('about')}
									style={{ resize: 'none' }}
								/>
							</fieldset>
							<ButtonSolid
								className='w-1/2 justify-self-end !bg-secondary'
								label='Next'
								onClick={() => setStep(2)}
								type='button'
							/>
						</article>
					</section>
					<section
						className={`grid h-fit relative ${
							step === 2
								? 'before:absolute before:h-[calc(100%_-_3rem)] before:border-l-2 before:left-[calc(0.75rem_-_1px)] before:top-[3rem]'
								: ''
						} `}
					>
						<header className='flex items-center gap-x-2 mb-4'>
							<span
								className={`w-6 h-6 text-white ${
									step === 2 ? 'bg-primary' : 'bg-neutral-400'
								} text-center rounded-full text-xs flex items-center justify-center`}
							>
								2
							</span>
							<h5>Add your photo</h5>
						</header>
						<article
							className={`w-full pl-8 justify-self-end grid gap-y-6 overflow-hidden transition-all ease-out duration-500 delay-250 ${
								step === 2 ? 'h-full' : 'h-0'
							}`}
						>
							<fieldset className='grid gap-y-2'>
								<label
									className='w-36 h-36 bg-neutral-200 rounded-full flex items-center justify-center'
									htmlFor='profile_picture'
								>
									<FontAwesomeIcon icon={faImages} className='text-6xl' />
								</label>
								<input
									type='file'
									id='profile_picture'
									className='hidden'
									{...register('picture')}
								/>
							</fieldset>
							<nav>
								<ButtonSolid
									className='w-1/2 border-neutral-800 border-2 text-neutral-800'
									label='Prev'
									type='button'
									onClick={() => setStep(1)}
								/>
								<ButtonLink
									className='w-1/2 no-underline text-neutral-800'
									label='Finish'
									type='submit'
									disabled={onLoading}
								/>
							</nav>
						</article>
					</section>
				</form>
			</aside>
		)

	return (
		<aside className='w-96 h-fit p-6 bg-white rounded-3xl shadow-2xl'>
			<section className='grid justify-items-center gap-y-6'>
				<h1 className='text-4xl'>Successfully registered user</h1>
				<FontAwesomeIcon className='text-7xl' icon={faHandshake} />
				<ButtonSolid
					label='Lets do it'
					className='w-1/2'
					disabled={!success}
					onClick={() => setShowNextStep(true)}
				/>
			</section>
		</aside>
	)
}

export default RegisterVerificationPage
