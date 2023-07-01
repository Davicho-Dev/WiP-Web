import { apiPublic } from '../../utils'

interface ILoginParams {
	email: string
	password: string
}

interface IAuthResp {
	ACCESS: string
	REFRESH: string
}

export const login = async ({ email, password }: ILoginParams) => {
	return await apiPublic.post<IAuthResp>('/auth/token/', {
		email,
		password,
	})
}
