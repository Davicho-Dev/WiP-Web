import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const hdlAxiosErrors = (err: AxiosError) => {
	const { response } = err

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	Object.entries(response.data).forEach(([key, value]) => {
		console.log(key, value)
		toast.error(`${key.toUpperCase()}: ${value}`)
	})
}
