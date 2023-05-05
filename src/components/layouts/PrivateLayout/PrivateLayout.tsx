import { useEffect } from 'react'

import { AxiosError } from 'axios'
import { Outlet, useNavigate } from 'react-router-dom'

import { hdlErrors } from '../../../helpers'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { RootState, setHasAccess, setUser } from '../../../store'
import { apiPrivate } from '../../../utils'
import { HeaderCommon, Sidebar } from '../../organisms'

import styles from './PrivateLayout.module.sass'

import NoAvatar from '../../../assets/img/img_no_avatar.png'
import {
	getLocalAccessToken,
	getLocalRefreshToken,
	getLocalUsername,
} from '../../../constants'

const PrivateLayout = () => {
	const access = getLocalAccessToken()
	const refresh = getLocalRefreshToken()

	const navigate = useNavigate()

	const { picture, username } = useAppSelector((state: RootState) => state.user)
	const { hasAccess } = useAppSelector((state: RootState) => state.ui)
	const dispatch = useAppDispatch()

	const getUser = async () => {
		const username = getLocalUsername()

		try {
			const { data } = await apiPrivate.get(`/users/${username}/`)

			dispatch(setUser(data))
		} catch (err) {
			hdlErrors(err as AxiosError)
		}
	}

	useEffect(() => {
		if (access && refresh) {
			getUser()
			dispatch(setHasAccess(true))
		}
	}, [])

	return (
		<main className={styles.wrapper}>
			<HeaderCommon
				navigate={navigate}
				picture={picture ?? NoAvatar}
				username={username ?? ''}
				hasAccess={hasAccess}
			/>
			<section className={styles.wrapper__content}>
				<Sidebar navigate={navigate} hasAccess={hasAccess} />
				<Outlet />
			</section>
		</main>
	)
}

export default PrivateLayout
