import { useState } from 'react'

import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'

import { apiPublic } from '../../../../api'
import { hdlAxiosErrors } from '../../../../helpers'
import { ButtonSolid, FormInput, FormInputPassword } from '../../../atoms'
import { useAppDispatch } from '../../../../hooks'
import { setShowAuthFormFooter } from '../../../../store/slices'

import IcHands from '../../../../assets/img/img_hands.png'

import styles from './RegisterForm.module.sass'

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
			hdlAxiosErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	if (success)
		return (
			<section className='grid justify-items-center gap-y-6'>
				<h1 className='text-4xl'>Successfully registered user</h1>
				<img className='w-20' src={IcHands} alt='' />
				<ButtonSolid label='Lets do it' className='w-1/2' />
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
							value !== getValues('password') && getValues('password') !== ''
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
			<fieldset className='w-full flex gap-x-2 items-center'>
				<input
					type='checkbox'
					className='rounded-full'
					id='termsConditions'
					{...register('accept_terms_and_conditions', { required: true })}
				/>
				<label
					className='text-primary underline cursor-pointer'
					htmlFor='termsConditions'
				>
					I agree to the Terms and Conditions
				</label>
			</fieldset>
			<ButtonSolid label='Sign Up' disabled={onLoading} onLoading={onLoading} />
		</form>
	)
}
export default RegisterForm
