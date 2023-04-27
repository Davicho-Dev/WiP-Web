import { SubmitHandler, useForm } from 'react-hook-form'
import { ButtonSolid, FormInput } from '../../../atoms'

import { jwtDecode, jwtVerify, resignJwt } from 'jwt-js-decode'
import DummyImg from '../../../../assets/img/img_no_picture.png'
import { FormEventHandler, useEffect, useState } from 'react'
import { apiPrivate } from '../../../../api'
import { getLocalAccessToken } from '../../../../constants'
import { toast } from 'react-toastify'
import { hdlAxiosErrors } from '../../../../helpers'
import { AxiosError } from 'axios'
import { IUser } from '../../../../interfaces'

interface IFormProps {
	about: string
	city: string
	location: string
	username: string
	website: string
	facebook: string
	instagram: string
	tiktok: string
	sex: string
	phone_number: string
	email: string
	has_private_likes: boolean
}

export const ProfileForm = (props: IUser): JSX.Element => {
	const { picture, has_private_likes } = props
	const [onLoading, setOnLoading] = useState<boolean>(false)
	const [avatar, setAvatar] = useState<File>()

	const { handleSubmit, register, watch } = useForm<IFormProps>({
		defaultValues: props,
	})

	const onSubmit: SubmitHandler<IFormProps> = async data => {
		setOnLoading(true)
		const access = getLocalAccessToken() ?? ''
		const { payload } = jwtDecode(access)

		const formData = new FormData()

		Object.entries(data).forEach(([key, value]) => {
			if (value) formData.append(key, value)
		})

		if (avatar) formData.append('picture', avatar)

		try {
			await apiPrivate.patch(`/users/${payload.user_id}/`, data)
		} catch (err) {
			hdlAxiosErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	const hdlAddPicture: FormEventHandler<HTMLInputElement> = ({
		currentTarget,
	}) => {
		setAvatar(currentTarget?.files[0])
	}

	return (
		<form className='grid gap-y-12 pt-10' onSubmit={handleSubmit(onSubmit)}>
			<section className='bg-[#f9fbf1] rounded-xl overflow-hidden border-neutral-900 border-2'>
				<header className='w-full p-4 bg-neutral-900 text-white'>
					<h1>Profile</h1>
					<span className='text-sm'>This data is public for any user</span>
				</header>
				<section className='flex p-8 gap-x-6'>
					<aside>
						<label
							className='w-36 h-36 rounded-full overflow-hidden block relative'
							htmlFor='picture'
						>
							<img
								className='w-full h-full'
								src={
									avatar
										? URL.createObjectURL(avatar)
										: picture
										? picture
										: DummyImg
								}
								alt=''
							/>
							<input
								type='file'
								className='hidden'
								id='picture'
								onChangeCapture={hdlAddPicture}
							/>
						</label>
					</aside>
					<article className='inline-grid gap-y-4 grow'>
						<FormInput
							placeholder='Username'
							register={{ ...register('username') }}
						/>
						<fieldset>
							<textarea
								className='w-full p-4 flex gap-x-1 items-center border border-black rounded-xl'
								placeholder='Presentation'
								rows={3}
								{...register('about')}
								style={{ resize: 'none' }}
							/>
						</fieldset>
						<FormInput
							placeholder='Location'
							register={{ ...register('location') }}
						/>
						<FormInput placeholder='City' register={{ ...register('city') }} />
						<section className='grid gap-y-4 mt-6'>
							<h1 className='text-2xl'>Social networks</h1>
							<FormInput
								placeholder='Website url'
								type='url'
								register={{ ...register('website') }}
							/>
							<FormInput
								placeholder='Facebook url'
								type='url'
								register={{ ...register('facebook') }}
							/>
							<FormInput
								placeholder='instagram url'
								type='url'
								register={{ ...register('instagram') }}
							/>
							<FormInput
								placeholder='Tiktok url'
								type='url'
								register={{ ...register('tiktok') }}
							/>
						</section>
						<section className='grid gap-y-4 mt-6'>
							<h1 className='text-2xl'>Interaction</h1>
							<label className='flex gap-x-4'>
								Make likes private
								<input type='checkbox' {...register('has_private_likes')} />
							</label>
						</section>
					</article>
				</section>
			</section>
			<section className='bg-[#f9fbf1] rounded-xl overflow-hidden border-neutral-900 border-2'>
				<header className='w-full p-4 bg-neutral-900 text-white'>
					<h1>Profile</h1>
					<span className='text-sm'>This data is public for any user</span>
				</header>
				<section className='grid gap-y-4 p-8 gap-x-6'>
					<FormInput
						placeholder='Email'
						register={{ ...register('email') }}
						type='email'
					/>
					<FormInput
						placeholder='Phone number'
						type='tel'
						register={{ ...register('phone_number') }}
					/>
					<FormInput
						placeholder='Sex (Yes, please)'
						register={{ ...register('sex') }}
					/>
				</section>
			</section>
			<ButtonSolid
				label='Save'
				disabled={onLoading}
				className='w-48 bg-primary text-white justify-self-end'
			/>
		</form>
	)
}
