import { apiPublic, getRefreshToken } from '../../utils'

export const refresh = async () => {
	const refresh = getRefreshToken()

	const { data } = await apiPublic.post('/auth/token/refresh/', { refresh })

	return data
}
