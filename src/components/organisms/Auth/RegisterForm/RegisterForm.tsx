import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { faHandshake } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ButtonSolid, FormInputPassword } from '../../../atoms'
import { FormInput } from '../../../atoms/Form/FormInput'
import { apiPublic } from '../../../../api'

import styles from './RegisterForm.module.sass'
import { toast } from 'react-toastify'

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
		} catch ({ response: { data } }) {
			console.log(data)

			toast.error(data.email[0])
		} finally {
			setOnLoading(false)
		}
	}

	if (success)
		return (
			<section className='grid justify-items-center gap-y-6'>
				<h1 className='text-3xl'>Successfully registered user</h1>
				<FontAwesomeIcon className='text-7xl' icon={faHandshake} />
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
							value !== getValues('password') && getValues('password') !== ''
								? 'The passwords do not match'
								: undefined,
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
			<ButtonSolid label='Sign Up' disabled={onLoading} />
		</form>
	)
}
export default RegisterForm
