import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const hdlErrors = (err: AxiosError) => {
	const { response } = err
	console.log(err)

	if (!response || !response.data) {
		toast.error('Network Error')
		return
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	Object.entries(response.data).forEach(([key, value]) => {
		toast.error(`${key.toUpperCase()}: ${value}`)
	})
}
