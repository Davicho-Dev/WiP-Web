import { useEffect, useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { jwtDecode, jwtVerify, resignJwt } from 'jwt-js-decode'
import {
	ButtonSolid,
	FormInput,
	FormInputPassword,
} from '../../components/atoms'
import { IcLogo } from '../../components/atoms/Icons'
import { apiPrivate, apiPublic } from '../../api'
import { type } from 'os'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getLocalAccessToken } from '../../constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
interface IAuthResp {
	ACCESS: string
	REFRESH: string
}
interface IFormProps {
	password: string
	password_confirmation: string
}

type TQueryParams = {
	token: string
	email: string
}

const ForgotPasswordVerificationPage = () => {
	const { email, token } = useParams<TQueryParams>()
	const navigate = useNavigate()

	const [onLoading, setOnLoading] = useState<boolean>(false)
	const [success, setSuccess] = useState(false)
	const [showNextStep, setShowNextStep] = useState<boolean>(false)
	const [showModal, setShowModal] = useState<boolean>(false)

	const {
		handleSubmit,
		formState: { errors },
		register,
		getValues,
	} = useForm<IFormProps>()

	const onSubmit = async (formData: IFormProps) => {
		const access = getLocalAccessToken() ?? ''
		const { payload } = jwtDecode(access)
		setOnLoading(true)

		try {
			const { data } = await apiPrivate.patch(`/users/${payload.user_id}/`, {
				password: formData.password,
			})

			console.log(formData)
			console.log(data)
			setShowModal(true)
		} catch (err) {
			console.log(err)
		} finally {
			setOnLoading(false)
		}
	}

	const hdlVerifyToken = async () => {
		setOnLoading(true)

		try {
			const { data } = await apiPublic.post<IAuthResp>(
				'/auth/forgot-password-validate/',
				{
					email,
					token,
				}
			)

			console.log(data)

			localStorage.setItem('access', data.ACCESS)
			localStorage.setItem('refresh', data.REFRESH)

			setSuccess(true)
		} catch ({ response: { data } }) {
			console.log(data)
			toast.error(data.token[0])
		} finally {
			setOnLoading(false)
		}
	}

	useLayoutEffect(() => {
		hdlVerifyToken()
	}, [])

	if (showModal)
		return (
			<aside className='w-96 h-fit py-14 px-6 bg-white rounded-3xl shadow-2xl flex flex-col items-center gap-y-8'>
				<FontAwesomeIcon
					icon={faCheckCircle}
					className='text-primary text-3xl'
				/>
				<h2 className='text-2xl leading-none text-center'>
					Your password was reset successfully
				</h2>
				<ButtonSolid
					label='Login'
					className='w-1/2'
					onClick={() => navigate('/auth', { replace: true })}
				/>
			</aside>
		)

	if (showNextStep)
		return (
			<aside className='w-96 h-fit p-6 bg-white rounded-3xl shadow-2xl'>
				<header className='flex flex-col gap-y-10 mb-10'>
					<IcLogo className='w-[200px]' />
					<h1 className='text-3xl uppercase text-primary line-clamp-1'>
						join now get feedback
					</h1>
				</header>
				<form
					className='flex flex-col items-center gap-y-5'
					onSubmit={handleSubmit(onSubmit)}
				>
					<h2 className='text-2xl leading-none'>
						Enter the associated email address
					</h2>

					<FormInputPassword
						placeholder='Password'
						errorDescription={`${errors.password?.message}`}
						register={{
							...register('password', {
								required: { message: 'Input is required', value: true },
								minLength: {
									message: 'Password must be at least 12 characters',
									value: 12,
								},
								validate: value =>
									value !== getValues('password_confirmation') &&
									getValues('password_confirmation') !== ''
										? 'The passwords do not match'
										: undefined,
							}),
						}}
						onError={errors.password ? true : false}
					/>
					<FormInputPassword
						placeholder='Repeat Password'
						errorDescription={`${errors.password_confirmation?.message}`}
						register={{
							...register('password_confirmation', {
								required: { message: 'Input is required', value: true },
								minLength: {
									message: 'Password must be at least 12 characters',
									value: 12,
								},
								validate: value =>
									value !== getValues('password') &&
									getValues('password') !== ''
										? 'The passwords do not match'
										: undefined,
							}),
						}}
						onError={errors.password_confirmation ? true : false}
					/>
					<ButtonSolid label='Continue' disabled={onLoading} />
				</form>
			</aside>
		)

	return (
		<aside className='w-96 h-fit p-6 bg-white rounded-3xl shadow-2xl'>
			<section className='grid gap-y-6 justify-items-center'>
				<h2 className='text-3xl justify-self-start'>Great!</h2>
				<p className='text-sm text-neutral-600'>
					If you have sent a confirmation link to the mail, click on the link
					and log in.
				</p>
				<p className='text-sm text-neutral-400'>
					If you cannot see the mail in your in-tray, please check your
					notifications and spam tray.
				</p>
				<ButtonSolid
					className='w-1/2'
					label='Sent'
					disabled={!success}
					onClick={() => setShowNextStep(true)}
				/>
			</section>
		</aside>
	)
}
export default ForgotPasswordVerificationPage
