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

const getLocalUserId = () => {
	const userId = localStorage.getItem('userID')
	return userId
}

export {
	getLocalAccessToken,
	getLocalRefreshToken,
	getLocalUsername,
	getLocalUserId,
}
