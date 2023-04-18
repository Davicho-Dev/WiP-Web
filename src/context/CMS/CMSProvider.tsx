import { FC, useEffect, useReducer } from 'react'

import { useLocation } from 'react-router-dom'

import { CMSProviderInterface, CMSStateInterface } from './CMS.interface'
import CMSContext from './CMSContext'
import CMSReducer from './CMSReducer'
import { getCMSData } from '../../helpers'

const INITIAL_STATE: CMSStateInterface = {
	isLoading: true,
	data: {},
}

const CMSProvider: FC<CMSProviderInterface> = ({ children }) => {
	const { pathname } = useLocation()

	const [state, dispatch] = useReducer(CMSReducer, INITIAL_STATE)

	useEffect(() => {
		getCMSData({ path: pathname }).then((result: object) =>
			dispatch({ type: 'SET_DATA', payload: result })
		)
	}, [pathname])

	return (
		<CMSContext.Provider value={{ ...state }}>{children}</CMSContext.Provider>
	)
}

export default CMSProvider
