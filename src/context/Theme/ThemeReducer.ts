import { ThemeActionsInterface, ThemeStateInterface } from './Theme.interface'

const ThemeReducer = (
	state: ThemeStateInterface,
	actions: ThemeActionsInterface
) => {
	switch (actions.type) {
		case 'SET_THEME':
			return { ...state, isLoading: false, theme: actions.payload }

		default:
			return state
	}
}

export default ThemeReducer
