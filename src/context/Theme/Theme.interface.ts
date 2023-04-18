interface ThemeActionsInterface {
	type: 'SET_THEME'
	payload: string
}

interface ThemeInterface extends ThemeStateInterface {
	setTheme: (theme: string) => void
}

interface ThemeProviderInterface {
	children: JSX.Element | JSX.Element[]
}

interface ThemeStateInterface {
	isLoading: boolean
	theme: string
}

export {
	ThemeActionsInterface,
	ThemeInterface,
	ThemeProviderInterface,
	ThemeStateInterface,
}
