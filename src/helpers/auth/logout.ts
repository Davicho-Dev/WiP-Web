interface ILogoutParams {
	navigate: (path: string) => void
}

export const logout = async ({ navigate }: ILogoutParams) => {
	localStorage.clear()

	navigate('/auth')
}
