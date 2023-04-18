import { createContext } from 'react'

import { AuthInterface } from './Auth.interface'

const AuthContext = createContext({} as AuthInterface)

export default AuthContext
