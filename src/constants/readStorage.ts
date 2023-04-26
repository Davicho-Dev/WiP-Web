const getLocalAccessToken = () => {
	const access = localStorage.getItem('access')
	return access
}

const getLocalRefreshToken = () => {
	const refresh = localStorage.getItem('refresh')
	return refresh
}

export { getLocalAccessToken, getLocalRefreshToken }
