import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const hdlErrors = (err: AxiosError) => {
	const { response, request } = err

	console.log({ err })
	console.log({ response })
	console.log({ request })

	if (request.status === 500) {
		toast.error('Server Error')

		return
	}

	console.log('Error status code:' + request.status)

	if (!response || !response.data) {
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
