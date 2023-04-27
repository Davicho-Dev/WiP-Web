import { AppState, Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface IAuth0ProviderWithConfigProps {
	children: React.ReactNode | React.ReactNode[]
}

const Auth0ProviderWithConfig = ({
	children,
}: IAuth0ProviderWithConfigProps) => {
	const navigate = useNavigate()
	const domain = import.meta.env.VITE_AUTH0_DOMAIN
	const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
	const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL

	const onRedirectCallback = (appState?: AppState) => {
		navigate(appState?.returnTo || window.location.pathname)
	}

	if (!(domain && clientId && redirectUri)) return null

	return (
		<Auth0Provider
			clientId={clientId}
			domain={domain}
			authorizationParams={{
				redirect_uri: redirectUri,
			}}
			onRedirectCallback={onRedirectCallback}
		>
			{children}
		</Auth0Provider>
	)
}

export default Auth0ProviderWithConfig
