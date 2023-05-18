import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const hdlErrors = (err: AxiosError) => {
	const { response, request } = err

	if (!response || !response.data || request.status === 500) {
		toast.error('Network Error')
	}

	// if (response?.data && request.status !== 500) {
	// 	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// 	// @ts-ignore
	// 	Object.entries(response.data).forEach(([, value]) => {
	// 		toast.error(`${value}`)
	// 	})
	// }
}
