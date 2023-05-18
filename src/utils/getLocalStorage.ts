const getAccessToken = () => localStorage.getItem('access') ?? ''
const getRefreshToken = () => localStorage.getItem('refresh') ?? ''
const getUserId = () => localStorage.getItem('userID') ?? ''
const getUsername = () => localStorage.getItem('username') ?? ''

export { getAccessToken, getRefreshToken, getUserId, getUsername }
