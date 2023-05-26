import { useState } from 'react'

import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { PATTERN_EMAIL, PATTERN_PASSWORD } from '../../../../constants'
import { hdlErrors } from '../../../../helpers'
import { useAppDispatch } from '../../../../hooks'
import { setShowAuthFormFooter } from '../../../../store'
import { apiPublic } from '../../../../utils'
import { ButtonSolid, FormInput, FormInputPassword } from '../../../atoms'

import IcHands from '../../../../assets/img/img_hands.png'

import { IFormProps, IRegisterResp } from './RegisterForm.interfaces'
import styles from './RegisterForm.module.sass'

const RegisterForm = () => {
	const [onLoading, setOnLoading] = useState<boolean>(false)
	const [success, setSuccess] = useState(false)

	const dispatch = useAppDispatch()

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
		watch,
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
				channel: 'Email',
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
				<h1 className='text-xl text-center'>
					We have sent you a verification mail, please verify it to continue the
					process
				</h1>
				<img className='w-20' src={IcHands} alt='' />
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
				onError={!!errors.email}
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
				onError={!!errors.password}
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
				onError={!!errors.password_confirmation}
			/>
			<fieldset className='w-full flex gap-x-2 items-center'>
				<label
					htmlFor='terms_conditions'
					data-error={errors.accept_terms_and_conditions?.message}
					className={`w-4 h-4 border border-neutral-800 rounded-full cursor-pointer relative before:bg-primary before:absolute before:m-auto before:inset-0 before:rounded-full before:transition-all before:ease-in before:duration-200 ${
						watch('accept_terms_and_conditions')
							? 'before:w-2.5 before:h-2.5'
							: 'before:w-0 before:h-0'
					} 
					after:absolute after:w-fit after:h-fit after:top-[calc(100%_+_0.5rem)] after:mx-auto after:inset-x-0 after:text-xs after:whitespace-nowrap
					${
						errors.accept_terms_and_conditions
							? `after:text-red-700 after:content-[attr(data-error)]`
							: ''
					}
					`}
				>
					<input
						id='terms_conditions'
						type='checkbox'
						className='hidden'
						{...register('accept_terms_and_conditions', {
							required: {
								value: true,
								message: 'Accept terms & conditions before you continue',
							},
						})}
					/>
				</label>
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
