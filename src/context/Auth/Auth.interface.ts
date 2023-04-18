interface AuthActionsInterface {
	type: 'SET_USER_DATA'
	payload: object
}

type AuthInterface = AuthStateInterface

interface AuthProviderInterface {
	children: JSX.Element | JSX.Element[]
}

interface AuthStateInterface {
	isLoading: boolean
	userData: object
}

export {
	AuthActionsInterface,
	AuthInterface,
	AuthProviderInterface,
	AuthStateInterface,
}
