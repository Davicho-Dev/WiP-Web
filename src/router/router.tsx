import { Suspense, lazy } from 'react'

import { Route, Routes } from 'react-router-dom'

const ForgotPasswordVerificationPage = lazy(
	() => import('../pages/Auth/ForgotPasswordVerificationPage')
)
const RegisterVerificationPage = lazy(
	() => import('../pages/Auth/RegisterVerificationPage')
)
const AuthPage = lazy(() => import('../pages/AuthPage'))
const ErrorPage = lazy(() => import('../pages/ErrorPage'))
const FollowsPage = lazy(() => import('../pages/FollowsPage'))
const HomePage = lazy(() => import('../pages/HomePage'))
const SearchPage = lazy(() => import('../pages/SearchPage'))
const SettingsPage = lazy(() => import('../pages/SettingsPage'))
const UserPage = lazy(() => import('../pages/UserPage'))

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
				<Route path='post_you_like' element={<HomePage />} />
				<Route path='direct_messages' element={<HomePage />} />
				<Route path='search' element={<SearchPage />} />
				<Route path='settings' element={<SettingsPage />} />
				<Route path='user/:username' element={<UserPage />} />
				<Route path='user/follows/:userID/:list' element={<FollowsPage />} />
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
				{/* <Route index element={<AuthPage />} /> */}
				<Route index path=':currentForm?' element={<AuthPage />} />
				<Route
					path='register/:email/:token'
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
