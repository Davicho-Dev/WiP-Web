import { FormEventHandler, useState } from 'react'

import { AxiosError } from 'axios'
import { jwtDecode } from 'jwt-js-decode'
import { SubmitHandler, useForm } from 'react-hook-form'

import { PATTERN_EMAIL, getLocalAccessToken } from '../../../../constants'
import { hdlErrors } from '../../../../helpers'
import { useAppDispatch } from '../../../../hooks'
import { IUser } from '../../../../interfaces'
import { setUser } from '../../../../store'
import { apiPrivate } from '../../../../utils'
import { Avatar, ButtonSolid, FormInput } from '../../../atoms'

import DummyImg from '../../../../assets/img/img_no_picture.png'

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
	const {
		picture,
		about,
		city,
		email,
		has_private_likes,
		location,
		phone_number,
		sex,
		username,
	} = props

	const dispatch = useAppDispatch()

	const [onLoading, setOnLoading] = useState<boolean>(false)
	const [avatar, setAvatar] = useState<File>()

	const { handleSubmit, register, watch } = useForm<IFormProps>({
		defaultValues: {
			about,
			city,
			email,
			has_private_likes,
			location,
			phone_number,
			sex,
			username,
		},
	})

	const onSubmit: SubmitHandler<IFormProps> = async data => {
		setOnLoading(true)
		const access = getLocalAccessToken() ?? ''
		const { payload } = jwtDecode(access)

		const formData = new FormData()

		Object.entries(data).forEach(([key, value]) => {
			if (value !== '' && value !== undefined && key !== 'picture') {
				formData.append(key, value)
			}
		})

		if (avatar) formData.append('picture', avatar)

		try {
			const { data } = await apiPrivate.patch(
				`/users/${payload.user_id}/`,
				formData
			)

			dispatch(setUser(data))
		} catch (err) {
			hdlErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	const hdlAddPicture: FormEventHandler<HTMLInputElement> = ({
		currentTarget,
	}) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		setAvatar(currentTarget?.files[0])
	}

	return (
		<form className='grid gap-y-12 pt-10' onSubmit={handleSubmit(onSubmit)}>
			<section className='bg-[#f9fbf1] rounded-[20px] overflow-hidden border-neutral-800 border-2'>
				<header className='w-full p-4 bg-neutral-800 text-white'>
					<h1 className='text-white'>Profile</h1>
					<span className='text-sm text-white'>
						This data is public for any user
					</span>
				</header>
				<section className='flex p-8 gap-x-6'>
					<aside>
						<label
							className='w-36 h-36 rounded-full overflow-hidden block relative'
							htmlFor='picture'
						>
							<Avatar
								className='w-full h-full'
								src={
									avatar
										? URL.createObjectURL(avatar)
										: picture
										? picture
										: DummyImg
								}
							/>
							<input
								type='file'
								accept={'.jpg, .jpeg, .png, .gif'}
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
								className='w-full p-4 flex gap-x-1 items-center border border-neutral-800 rounded-xl'
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
							<label className='w-fit flex gap-x-6'>
								Make likes private
								<input
									type='checkbox'
									{...register('has_private_likes')}
									className='hidden'
								/>
								<span
									className={`flex gap-x-4 relative w-6 h-3.5 right-0 rounded-full m-auto top-0 bottom-0 transition-all duration-500 ease-in-out after:content-[''] after:absolute after:w-5 after:h-5 after:rounded-full after:m-auto after:top-0 after:bottom-0 after:transition-all after:duration-500 after:ease-in-out ${
										watch('has_private_likes')
											? 'bg-primary/20 after:bg-primary after:right-[calc(0%_-_0.625rem)]'
											: 'bg-neutral-200 after:bg-neutral-600 after:right-[calc(100%_-_0.625rem)]'
									}`}
								/>
							</label>
						</section>
					</article>
				</section>
			</section>
			<section className='bg-[#f9fbf1] rounded-xl overflow-hidden border-neutral-800 border-2'>
				<header className='w-full p-4 bg-neutral-800 text-white'>
					<h1 className='text-white'>Profile</h1>
					<span className='text-sm text-white'>
						This data is public for any user
					</span>
				</header>
				<section className='grid gap-y-4 p-8 gap-x-6'>
					<FormInput
						placeholder='Email'
						register={{
							...register('email', {
								pattern: {
									value: PATTERN_EMAIL,
									message: 'Please enter a valid email',
								},
							}),
						}}
						type='email'
					/>
					<FormInput
						placeholder='Phone number'
						type='tel'
						register={{ ...register('phone_number') }}
					/>
					<FormInput placeholder='Gender' register={{ ...register('sex') }} />
				</section>
			</section>
			<ButtonSolid
				label='Save'
				disabled={onLoading}
				onLoading={onLoading}
				className='w-48 bg-primary text-white justify-self-end'
			/>
		</form>
	)
}
