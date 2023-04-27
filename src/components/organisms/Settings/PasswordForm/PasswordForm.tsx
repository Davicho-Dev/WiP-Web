import { useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { AxiosError } from 'axios'
import { apiPrivate } from '../../../../api'
import { hdlAxiosErrors } from '../../../../helpers'
import { ButtonLink, ButtonSolid, FormInputPassword } from '../../../atoms'

interface IFormProps {
	password: string
	new_password: string
	new_password_verification: string
}

interface IPasswordFormProps {
	email?: string
	id?: number
}

export const PasswordForm = ({
	email,
	id,
}: IPasswordFormProps): JSX.Element => {
	const [onLoading, setOnLoading] = useState<boolean>(false)

	const {
		handleSubmit,
		formState: { errors },
		getValues,
		register,
		reset,
	} = useForm<IFormProps>()

	const onSubmit: SubmitHandler<IFormProps> = async formData => {
		setOnLoading(true)
		const { new_password, password } = formData

		console.log(formData)

		try {
			await apiPrivate.post(`/users/${id}/change_password/`, {
				email,
				password,
				new_password,
			})

			reset()
		} catch (err) {
			hdlAxiosErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	console.log(errors)

	return (
		<form
			className='flex flex-col gap-y-12 pt-10'
			onSubmit={handleSubmit(onSubmit)}
		>
			<section className='bg-[#f9fbf1] rounded-xl overflow-hidden border-neutral-900 border-2'>
				<header className='w-full p-4 bg-neutral-900 text-white'>
					<h1>Password</h1>
					<span className='text-sm'>Your passwords for login</span>
				</header>
				<section className='grid gap-y-6 p-8'>
					<FormInputPassword
						placeholder='Current password'
						onError={errors.password ? true : false}
						errorDescription={errors.password?.message}
						register={{
							...register('password', {
								required: { value: true, message: 'This field is required' },
								minLength: {
									value: 12,
									message: 'Password must be at least 12 characters',
								},
								pattern: {
									message:
										'Password must contain at least one number and symbol and one uppercase and lowercase letter',
									value:
										/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{1,}/gm,
								},
							}),
						}}
					/>
					<FormInputPassword
						placeholder='New password'
						onError={errors.new_password ? true : false}
						errorDescription={errors.new_password?.message}
						register={{
							...register('new_password', {
								validate: value =>
									value !== getValues('new_password_verification') &&
									getValues('new_password_verification') !== ''
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
					/>
					<FormInputPassword
						placeholder='Confirm new password'
						onError={errors.new_password_verification ? true : false}
						errorDescription={errors.new_password_verification?.message}
						register={{
							...register('new_password_verification', {
								validate: value =>
									value !== getValues('new_password') &&
									getValues('new_password') !== ''
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
					/>
					<ButtonLink
						label='I forgot my password'
						className='justify-self-center'
					/>
				</section>
			</section>
			<ButtonSolid
				label='Save'
				disabled={onLoading}
				className='w-48 bg-primary text-white self-end'
			/>
		</form>
	)
}
