import axios, { AxiosError } from 'axios'

import { getLocalAccessToken } from '../constants'

export const apiPrivate = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

apiPrivate.interceptors.request.use(
	config => {
		const access = getLocalAccessToken()

		if (access) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			config.headers['Authorization'] = 'Bearer ' + access
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

apiPrivate.interceptors.response.use(
	res => {
		return res
	},
	async err => {
		const originalConfig = err.config

		if (err.response) {
			if (err.response.status === 401 && !originalConfig._retry) {
				originalConfig._retry = true

				try {
					const { access } = await refreshToken()
					localStorage.setItem('access', access)
					apiPrivate.defaults.headers.common['Authorization'] = access

					return apiPrivate(originalConfig)
				} catch (error) {
					const err = error as AxiosError
					if (err.response && err.response.data) {
						return Promise.reject(err.response.data)
					}

					return Promise.reject(err)
				}
			}

			if (err.response.status === 403 && err.response.data) {
				return Promise.reject(err.response.data)
			}
		}

		return Promise.reject(err)
	}
)
