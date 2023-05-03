const getLocalAccessToken = () => {
	const access = localStorage.getItem('access')
	return access
}

const getLocalRefreshToken = () => {
	const refresh = localStorage.getItem('refresh')
	return refresh
}

const getLocalUsername = () => {
	const username = localStorage.getItem('username')
	return username
}

export { getLocalAccessToken, getLocalRefreshToken, getLocalUsername }
