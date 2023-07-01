import axios from 'axios'

import { apiUrl } from '../constants'

export const apiPublic = axios.create({
	baseURL: apiUrl,
	withCredentials: false,
})
