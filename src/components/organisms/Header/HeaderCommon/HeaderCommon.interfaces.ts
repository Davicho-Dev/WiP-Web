import { NavigateFunction } from 'react-router-dom'
import { setShowSidebar } from '../../../../store'

export interface IHeaderPrivateProps {
	username?: string
	picture?: string
	navigate: NavigateFunction
	hasAccess: boolean
	setShowSidebar: () => void
}
