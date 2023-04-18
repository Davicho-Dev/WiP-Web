import { CMSActionsInterface, CMSStateInterface } from './CMS.interface'

const CMSReducer = (state: CMSStateInterface, actions: CMSActionsInterface) => {
	switch (actions.type) {
		case 'SET_DATA':
			return { ...state, isLoading: false, data: actions.payload }

		default:
			return state
	}
}

export default CMSReducer
