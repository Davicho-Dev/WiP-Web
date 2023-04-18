import { createContext } from 'react'

import { CMSInterface } from './CMS.interface'

const CMSContext = createContext({} as CMSInterface)

export default CMSContext
