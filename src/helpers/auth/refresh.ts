import { getLocalRefreshToken } from '../../constants'
import { apiPublic } from '../../utils'

export const refresh = async () => {
	const refresh = getLocalRefreshToken()

	const { data } = await apiPublic.post('/auth/token/refresh/', { refresh })

	return data
}
