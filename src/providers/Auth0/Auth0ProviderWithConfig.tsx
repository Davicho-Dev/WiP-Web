import { AppState, Auth0Provider } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

import { domain, audience, clientId, redirectUri, scope } from '../../constants'

interface IAuth0ProviderWithConfigProps {
	children: React.ReactNode | React.ReactNode[]
}

const Auth0ProviderWithConfig = ({
	children,
}: IAuth0ProviderWithConfigProps) => {
	const navigate = useNavigate()

	const onRedirectCallback = (appState?: AppState) => {
		navigate(appState?.returnTo || window.location.pathname)
	}

	if (!(domain && clientId && redirectUri)) return <>{children}</>

	return (
		<Auth0Provider
			clientId={clientId}
			domain={domain}
			authorizationParams={{
				redirect_uri: redirectUri,
				scope,
				audience,
			}}
			onRedirectCallback={onRedirectCallback}
		>
			{children}
		</Auth0Provider>
	)
}

export default Auth0ProviderWithConfig
