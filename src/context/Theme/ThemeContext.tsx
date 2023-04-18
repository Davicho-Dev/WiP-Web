import { createContext } from 'react'

import { ThemeInterface } from './Theme.interface'

const ThemeContext = createContext({} as ThemeInterface)

export default ThemeContext
