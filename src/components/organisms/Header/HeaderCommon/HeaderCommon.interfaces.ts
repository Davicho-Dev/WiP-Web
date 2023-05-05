import { NavigateFunction } from 'react-router-dom'

export interface IHeaderPrivateProps {
	username?: string
	picture?: string
	navigate: NavigateFunction
	hasAccess: boolean
}
