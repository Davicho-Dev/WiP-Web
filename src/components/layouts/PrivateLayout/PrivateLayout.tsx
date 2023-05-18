import { useEffect } from 'react'

import { AxiosError } from 'axios'
import { Outlet, useNavigate } from 'react-router-dom'

import { hdlErrors } from '../../../helpers'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
	RootState,
	setHasAccess,
	setShowSidebar,
	setUser,
} from '../../../store'
import { getAccessToken, apiPrivate, getUsername } from '../../../utils'
import { FooterCommon, HeaderCommon, Sidebar } from '../../organisms'
import { IUser } from '../../../interfaces'

import NoAvatar from '../../../assets/img/img_no_avatar.png'

import styles from './PrivateLayout.module.sass'

const PrivateLayout = () => {
	const access = getAccessToken()

	const navigate = useNavigate()

	const {
		user: { picture, username },
		ui: { hasAccess, showSidebar },
	} = useAppSelector((state: RootState) => state)

	const dispatch = useAppDispatch()

	const getUser = async () => {
		const user = getUsername()

		try {
			const { data } = await apiPrivate.get<IUser>(`/users/${user}/`)
			const { username, id } = data

			localStorage.setItem('username', `${username}`)
			localStorage.setItem('userID', `${id}`)

			dispatch(setUser(data))
		} catch (err) {
			hdlErrors(err as AxiosError)
		}
	}

	useEffect(() => {
		if (access) dispatch(setHasAccess(true))
	}, [])

	useEffect(() => {
		if (access && hasAccess) getUser()
	}, [hasAccess])

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
