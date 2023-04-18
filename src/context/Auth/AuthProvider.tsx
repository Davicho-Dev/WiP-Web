import { FC, useEffect, useReducer } from 'react'

import { AuthProviderInterface, AuthStateInterface } from './Auth.interface'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import { getUserData } from '../../helpers'

const INITIAL_STATE: AuthStateInterface = {
	isLoading: true,
	userData: {},
}

const AuthProvider: FC<AuthProviderInterface> = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

	useEffect(() => {
		getUserData().then((resp: object) =>
			dispatch({ type: 'SET_USER_DATA', payload: resp })
		)
	}, [])

	return (
		<AuthContext.Provider value={{ ...state }}>{children}</AuthContext.Provider>
	)
}

export default AuthProvider
