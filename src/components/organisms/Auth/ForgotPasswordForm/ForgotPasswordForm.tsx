import { useState } from 'react'

import { useForm } from 'react-hook-form'

import { apiPublic } from '../../../../api'
import { useAppDispatch } from '../../../../hooks'
import { setCurrentAuthForm } from '../../../../store/slices'
import { ButtonLink, ButtonSolid, FormInput } from '../../../atoms'
interface IFormProps {
	email: string
}

const ForgotPasswordForm = () => {
	const [onLoading, setOnLoading] = useState<boolean>(false)
	const [success, setSuccess] = useState(false)

	const dispatch = useAppDispatch()

	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<IFormProps>()

	const onSubmit = async (formData: IFormProps) => {
		setOnLoading(true)
		console.log(formData)
		try {
			await apiPublic.post('/auth/forgot-password/', {
				...formData,
				channel: 'Console',
			})

			setSuccess(true)
		} catch (err) {
			console.log(err)
		} finally {
			setOnLoading(false)
		}
	}

	if (success)
		return (
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
				<ButtonSolid className='w-1/2' label='Sent' />
			</section>
		)

	return (
		<form
			className='flex flex-col items-center gap-y-5'
			onSubmit={handleSubmit(onSubmit)}
		>
			<h2 className='text-2xl leading-none'>
				Enter the associated email address
			</h2>
			<FormInput
				placeholder='E-mail'
				type='email'
				errorDescription={`${errors.email?.message}`}
				onError={errors.email ? true : false}
				register={{
					...register('email', {
						required: { message: 'Input is required', value: true },
					}),
				}}
			/>
			<ButtonSolid className='w-1/2' label='Continue' disabled={onLoading} />
			<span>
				Do you have an account?
				<ButtonLink
					className='ml-1'
					label='login'
					type='button'
					onClick={() => dispatch(setCurrentAuthForm('login'))}
				/>
			</span>
		</form>
	)
}
export default ForgotPasswordForm
