import { getLocalRefreshToken } from '../../constants'
import { apiPublic } from '../api'

export const refreshToken = async () => {
	const refresh = getLocalRefreshToken()

	const { data } = await apiPublic.post('/auth/token/refresh/', { refresh })

	return data
}
