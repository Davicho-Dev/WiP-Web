import { useEffect } from 'react'

import { AxiosError } from 'axios'
import { Outlet, useNavigate } from 'react-router-dom'

import {
	getLocalAccessToken,
	getLocalRefreshToken,
	getLocalUsername,
} from '../../../constants'
import { hdlErrors } from '../../../helpers'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
	RootState,
	setHasAccess,
	setShowSidebar,
	setUser,
} from '../../../store'
import { apiPrivate } from '../../../utils'
import { FooterCommon, HeaderCommon, Sidebar } from '../../organisms'

import NoAvatar from '../../../assets/img/img_no_avatar.png'

import styles from './PrivateLayout.module.sass'

const PrivateLayout = () => {
	const access = getLocalAccessToken()
	const refresh = getLocalRefreshToken()

	const navigate = useNavigate()

	const { picture, username } = useAppSelector((state: RootState) => state.user)
	const { hasAccess, showSidebar } = useAppSelector(
		(state: RootState) => state.ui
	)
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
				setShowSidebar={() => dispatch(setShowSidebar(!showSidebar))}
			/>
			<section className={styles.wrapper__content}>
				<Sidebar {...{ showSidebar, navigate, hasAccess }} />
				<Outlet />
			</section>
			<FooterCommon
				navigate={navigate}
				picture={picture ?? NoAvatar}
				username={username ?? ''}
				hasAccess={hasAccess}
			/>
		</main>
	)
}

export default PrivateLayout
