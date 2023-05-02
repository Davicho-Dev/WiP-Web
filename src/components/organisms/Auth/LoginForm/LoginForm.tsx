import { useState } from 'react'

import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { PATTERN_EMAIL } from '../../../../constants'
import { hdlErrors } from '../../../../helpers'
import { useAppDispatch } from '../../../../hooks'
import { setCurrentAuthForm, setShowAuthFormFooter } from '../../../../store'
import { apiPublic } from '../../../../utils'
import {
	ButtonLink,
	ButtonSolid,
	FormInput,
	FormInputPassword,
} from '../../../atoms'

import styles from './LoginForm.module.sass'

interface IFormProps {
	email: string
	password: string
}

interface IAuthResp {
	ACCESS: string
	REFRESH: string
}

const LoginForm = () => {
	const navigate = useNavigate()
	const [onLoading, setOnLoading] = useState<boolean>(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormProps>()

	const dispatch = useAppDispatch()

	const onSubmit = async (formData: IFormProps) => {
		setOnLoading(true)

		try {
			const { data } = await apiPublic.post<IAuthResp>('/auth/token/', formData)

			localStorage.setItem('access', data.ACCESS)
			localStorage.setItem('refresh', data.REFRESH)

			navigate('/')
		} catch (err) {
			hdlErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h2 className='text-3xl capitalize justify-self-start'>Login</h2>
			<FormInput
				placeholder='E-mail'
				errorDescription={`${errors.email?.message}`}
				type='email'
				register={{
					...register('email', {
						required: { message: 'Write a valid email', value: true },
						pattern: {
							value: PATTERN_EMAIL,
							message: 'Please enter a valid email',
						},
					}),
				}}
				onError={errors.email ? true : false}
			/>
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
					}),
				}}
				onError={errors.password ? true : false}
			/>
			<ButtonSolid label='Login' disabled={onLoading} onLoading={onLoading} />
			<ButtonLink
				label='I forgot my password'
				onClick={() => {
					dispatch(setCurrentAuthForm('forgot_password'))
					dispatch(setShowAuthFormFooter(false))
				}}
			/>
		</form>
	)
}

export default LoginForm
