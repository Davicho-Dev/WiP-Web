import { useEffect, useState } from 'react'

import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AxiosError } from 'axios'
import { jwtDecode } from 'jwt-js-decode'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { apiPrivate, apiPublic } from '../../api'
import { ButtonSolid, FormInputPassword } from '../../components/atoms'
import { IcLogo } from '../../components/atoms/Icons'
import { getLocalAccessToken } from '../../constants'
import { hdlAxiosErrors } from '../../helpers'

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
			hdlAxiosErrors(err as AxiosError)
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
		} catch (err) {
			hdlAxiosErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	useEffect(() => {
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
								validate: value =>
									value !== getValues('password_confirmation') &&
									getValues('password_confirmation') !== ''
										? 'The passwords do not match'
										: undefined,
								required: { value: true, message: 'This field is required' },
								minLength: {
									value: 12,
									message: 'Password must be at least 12 characters',
								},
								pattern: {
									value:
										/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{1,}/gm,
									message:
										'Password must contain at least one number and symbol and one uppercase and lowercase letter',
								},
							}),
						}}
						onError={errors.password ? true : false}
					/>
					<FormInputPassword
						placeholder='Repeat Password'
						errorDescription={`${errors.password_confirmation?.message}`}
						register={{
							...register('password_confirmation', {
								validate: value =>
									value !== getValues('password') &&
									getValues('password') !== ''
										? 'The passwords do not match'
										: undefined,
								required: { value: true, message: 'This field is required' },
								minLength: {
									value: 12,
									message: 'Password must be at least 12 characters',
								},
								pattern: {
									value:
										/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{1,}/gm,
									message:
										'Password must contain at least one number and symbol and one uppercase and lowercase letter',
								},
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
