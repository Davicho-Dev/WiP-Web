import { FC, useEffect, useReducer } from 'react'

import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import { ButtonIcon } from 'tmf-ui'

import { ThemeProviderInterface, ThemeStateInterface } from './Theme.interface'
import ThemeContext from './ThemeContext'
import ThemeReducer from './ThemeReducer'

const INITIAL_STATE: ThemeStateInterface = {
	isLoading: true,
	theme: 'light',
}

const ThemeProvider: FC<ThemeProviderInterface> = ({ children }) => {
	const [state, dispatch] = useReducer(ThemeReducer, INITIAL_STATE)

	const HTML: HTMLElement | null = document.getElementById('HTML')

	const setTheme = (theme: string) => {
		HTML?.classList.remove(state.theme)
		HTML?.classList.add(theme)

		sessionStorage.setItem('THEME', theme)
		dispatch({ type: 'SET_THEME', payload: theme })
	}

	useEffect(() => {
		setTheme(sessionStorage.getItem('THEME') ?? 'light')
	}, [])

	return (
		<ThemeContext.Provider value={{ ...state, setTheme }}>
			{children}
			<ButtonIcon
				rounded='rounded-full'
				className='fixed left-3 bottom-3'
				icon={state.theme === 'light' ? faMoon : faSun}
				title={state.theme === 'light' ? 'Dark' : 'Light'}
				onClick={() =>
					state.theme === 'light' ? setTheme('dark') : setTheme('light')
				}
			/>
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
