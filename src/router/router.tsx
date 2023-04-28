import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const ErrorPage = lazy(() => import('../pages/ErrorPage'))
const HomePage = lazy(() => import('../pages/HomePage'))
const AuthPage = lazy(() => import('../pages/AuthPage'))
const ForgotPasswordVerificationPage = lazy(
	() => import('../pages/Auth/ForgotPasswordVerificationPage')
)
const RegisterVerificationPage = lazy(
	() => import('../pages/Auth/RegisterVerificationPage')
)
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const SettingsPage = lazy(() => import('../pages/SettingsPage'))

import { PrivateLayout, PublicLayout } from '../components/layouts'

const Router = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<Suspense fallback={<h1>Loading Private...</h1>}>
						<PrivateLayout />
					</Suspense>
				}
				errorElement={<ErrorPage />}
			>
				<Route element={<HomePage />} index />

				<Route path='settings' element={<SettingsPage />} />
				<Route path='user' element={<ProfilePage />} />
			</Route>
			<Route
				path='/auth'
				element={
					<Suspense fallback={<h1>Loading Public...</h1>}>
						<PublicLayout />
					</Suspense>
				}
				errorElement={<ErrorPage />}
			>
				<Route index element={<AuthPage />} />
				<Route
					path='register(/:email)(/:token)'
					element={<RegisterVerificationPage />}
				/>
				<Route
					path='forgot/:email/:token'
					element={<ForgotPasswordVerificationPage />}
				/>
			</Route>
		</Routes>
	)
}

export default Router
