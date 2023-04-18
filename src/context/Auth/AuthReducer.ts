import { AuthActionsInterface, AuthStateInterface } from './Auth.interface'

const AuthReducer = (
	state: AuthStateInterface,
	actions: AuthActionsInterface
) => {
	switch (actions.type) {
		case 'SET_USER_DATA':
			return { ...state, isLoading: false, data: actions.payload }

		default:
			return state
	}
}

export default AuthReducer
