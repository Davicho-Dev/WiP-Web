import { useState } from 'react'

import { AxiosError } from 'axios'

import { hdlErrors } from '../../../../helpers'
import { apiPrivate } from '../../../../utils'
import { Avatar, ButtonSolid } from '../../../atoms'
import { IUserCardProps } from './UserCard.interfaces'

import DummyImg from '../../../../assets/img/img_no_avatar.png'

export const UserCard = ({
	followed,
	id,
	picture,
	public_name,
	isFollower,
}: IUserCardProps): JSX.Element => {
	const [isFollowed, setIsFollowed] = useState<boolean>(followed)
	const [onLoading, setOnLoading] = useState<boolean>(false)
	const [followSuccess, setFollowSuccess] = useState<boolean>(false)

	const followUser = async (id: number, followed: boolean) => {
		setOnLoading(true)

		try {
			await apiPrivate.patch(`users/${id}/follows/`, {
				active: !followed,
			})

			setIsFollowed(!followed)
			setFollowSuccess(true)
		} catch (err) {
			hdlErrors(err as AxiosError)
		} finally {
			setOnLoading(false)

			setTimeout(() => {
				setFollowSuccess(false)
			}, 1000)
		}
	}

	// FIXME: Mobile view
	return (
		<article
			key={id}
			className='flex justify-between gap-x-2 md:!gap-x-4 max-w-full overflow-hidden'
		>
			<Avatar className='w-11 h-11 shrink-0' src={picture ?? DummyImg} />
			<article className='grow shrink'>
				<h1 className='w-max md:!w-fit text-sm line-clamp-1 text-ellipsis'>
					{public_name}
				</h1>
				<h5 className='w-max md:!w-fit text-xs line-clamp-1 text-ellipsis'>
					{isFollower}
				</h5>
			</article>
			<ButtonSolid
				label={isFollowed ? 'Following_' : 'Follow_'}
				onLoading={onLoading}
				onSuccess={followSuccess}
				disabled={onLoading}
				onClick={() => followUser(id, isFollowed)}
				className={`w-fit px-5 border border-neutral-800 bg-transparent text-sm md:text-base ${
					isFollowed ? '!bg-primary text-white' : ''
				}`}
			/>
		</article>
	)
}
