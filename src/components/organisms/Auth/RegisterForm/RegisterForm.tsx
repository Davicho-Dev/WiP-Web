import { useState } from 'react'

import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'

import { PATTERN_EMAIL, PATTERN_PASSWORD } from '../../../../constants'
import { hdlErrors } from '../../../../helpers'
import { useAppDispatch } from '../../../../hooks'
import { setShowAuthFormFooter } from '../../../../store'
import { apiPublic } from '../../../../utils'
import { ButtonSolid, FormInput, FormInputPassword } from '../../../atoms'

import IcHands from '../../../../assets/img/img_hands.png'

import styles from './RegisterForm.module.sass'
import { Link } from 'react-router-dom'

interface IFormProps {
	email: string
	password: string
	password_confirmation: string
	accept_terms_and_conditions: boolean
}

interface IRegisterResp {
	ACCESS: string
	REFRESH: string
}

const RegisterForm = () => {
	const [onLoading, setOnLoading] = useState<boolean>(false)
	const [success, setSuccess] = useState(false)

	const dispatch = useAppDispatch()

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<IFormProps>()

	const onSubmit = async (formData: IFormProps) => {
		console.log(formData)

		const { email, password, accept_terms_and_conditions } = formData
		setOnLoading(true)

		try {
			await apiPublic.post<IRegisterResp>('/auth/sign-up/', {
				email,
				password,
				accept_terms_and_conditions,
				channel: 'Console',
			})

			setSuccess(true)
			dispatch(setShowAuthFormFooter(false))
		} catch (err) {
			hdlErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	if (success)
		return (
			<section className='grid justify-items-center gap-y-6'>
				<h1 className='text-4xl'>Successfully registered user</h1>
				<img className='w-20' src={IcHands} alt='' />
				<ButtonSolid
					label="Let's do it"
					className='w-1/2'
					icon={<FontAwesomeIcon icon={faCircleArrowRight} />}
				/>
			</section>
		)

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h2 className='text-3xl capitalize justify-self-start'>Sign up</h2>
			<FormInput
				placeholder='E-mail'
				errorDescription={`${errors.email?.message}`}
				type='email'
				register={{
					...register('email', {
						required: { message: 'Write a valid email', value: true },
						pattern: {
							value: PATTERN_EMAIL,
							message: 'Write a valid email',
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
							value: PATTERN_PASSWORD,
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
							value !== getValues('password') && getValues('password') !== ''
								? 'The passwords do not match'
								: undefined,
						required: { value: true, message: 'This field is required' },
						minLength: {
							value: 12,
							message: 'Password must be at least 12 characters',
						},
						pattern: {
							value: PATTERN_PASSWORD,
							message:
								'Password must contain at least one number and symbol and one uppercase and lowercase letter',
						},
					}),
				}}
				onError={errors.password_confirmation ? true : false}
			/>
			<fieldset className='w-full flex gap-x-2 items-center'>
				<input
					type='checkbox'
					className='rounded-full'
					{...register('accept_terms_and_conditions', { required: true })}
				/>
				<Link
					to='/auth/terms-and-conditions'
					className='text-primary underline cursor-pointer'
				>
					I agree to the Terms and Conditions
				</Link>
			</fieldset>
			<ButtonSolid label='Sign Up' disabled={onLoading} onLoading={onLoading} />
		</form>
	)
}
export default RegisterForm
