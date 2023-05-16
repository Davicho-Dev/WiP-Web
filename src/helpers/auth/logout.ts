interface ILogoutParams {
	navigate: (path: string) => void
}

export const logout = async ({ navigate }: ILogoutParams) => {
	await localStorage.clear()

	navigate('/auth')
}
