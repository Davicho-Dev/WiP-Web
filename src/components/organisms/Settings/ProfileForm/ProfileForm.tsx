import { FormEventHandler, useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AxiosError } from 'axios'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { PATTERN_EMAIL, getLocalUserId } from '../../../../constants'
import { hdlErrors } from '../../../../helpers'
import { useAppDispatch } from '../../../../hooks'
import { IUser } from '../../../../interfaces'
import { setUser } from '../../../../store'
import { SocialIcons, SocialLabels, apiPrivate } from '../../../../utils'
import { Avatar, ButtonSolid, FormInput } from '../../../atoms'

import DummyImg from '../../../../assets/img/img_no_avatar.png'

interface IFormProps {
	about: string
	city: string
	location: string
	username: string
	sex: string
	phone_number: string
	email: string
	has_private_likes: boolean
	social: ISocial[]
}
interface ISocial {
	id?: number
	network?: string
	url?: string
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
		social,
	} = props

	const dispatch = useAppDispatch()

	const [onLoading, setOnLoading] = useState<boolean>(false)
	const [avatar, setAvatar] = useState<File>()
	const [socialFields, setSocialFields] = useState<ISocial[]>([
		{
			network: 'SP',
			url: '',
		},
		{
			network: 'SC',
			url: '',
		},
		{
			network: 'IN',
			url: '',
		},
		{
			network: 'FB',
			url: '',
		},
		{
			network: 'TW',
			url: '',
		},
		{
			network: 'TK',
			url: '',
		},
		{
			network: 'WB',
			url: '',
		},
	])

	const { handleSubmit, register, watch, control } = useForm<IFormProps>({
		defaultValues: {
			about,
			city,
			email,
			has_private_likes,
			location,
			phone_number,
			sex,
			username,
			social: socialFields,
		},
	})

	const { fields } = useFieldArray({
		control,
		rules: { maxLength: 7 },
		name: 'social',
	})

	const onSubmit: SubmitHandler<IFormProps> = async data => {
		setOnLoading(true)

		const userID = getLocalUserId()

		const formData = new FormData()

		Object.entries(data).forEach(([key, value]) => {
			if (
				value !== '' &&
				value !== undefined &&
				key !== 'picture' &&
				key !== 'social'
			) {
				formData.append(key, value)
			} else if (key === 'social') {
				formData.append(key, JSON.stringify(value))
			}
		})

		if (avatar) formData.append('picture', avatar)

		try {
			const { data } = await apiPrivate.patch(`/users/${userID}/`, formData)

			dispatch(setUser(data))

			toast.success('Profile updated successfully')
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

	useEffect(() => {
		if (social && social.length > 0)
			setSocialFields(prevState => [...prevState, ...social])
	}, [social])

	return (
		<form
			className='grid gap-y-4 md:!gap-y-8 lg:!gap-y-12 py-4 md:!py-6 lg:!py-10 px-3 md:!px-6 lg:px-0'
			onSubmit={handleSubmit(onSubmit)}
		>
			<section className='bg-[#f9fbf1] rounded-[20px] overflow-hidden border-neutral-800 border-2'>
				<header className='w-full p-4 bg-neutral-800 text-white'>
					<h1 className='text-white'>Profile</h1>
					<span className='text-sm text-white'>
						This data is public for any user
					</span>
				</header>
				<section className='flex px-3 md:!px-6 lg:!px-8 py-8 gap-6 flex-col md:!flex-row items-center md:!items-start'>
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
					<article className='inline-grid gap-y-4 grow w-full'>
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
							{fields.map(({ id, network, url }, index) => (
								<FormInput
									key={id}
									icon={
										<FontAwesomeIcon
											icon={SocialIcons(network!)!}
											className='text-sm mr-1'
										/>
									}
									placeholder={`${SocialLabels(network!)} url`}
									type='url'
									register={{
										...register(`social.${index}.url`, { value: url }),
									}}
								/>
							))}
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
									className={`flex gap-x-4 relative w-6 h-3.5 right-0 rounded-full m-auto top-0 bottom-0 transition-all duration-500 ease-in-out after:content-[''] after:absolute after:w-5 after:h-5 after:rounded-full after:m-auto after:top-0 after:bottom-0 after:transition-all after:duration-500 after:ease-in-out cursor-pointer ${
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
			<section className='bg-[#f9fbf1] rounded-[20px] overflow-hidden border-neutral-800 border-2'>
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
