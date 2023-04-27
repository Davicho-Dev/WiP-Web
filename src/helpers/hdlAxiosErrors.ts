import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const hdlAxiosErrors = (err: AxiosError) => {
	const { response } = err

	Object.entries(response.data).forEach(([key, value]) => {
		console.log(key, value)
		toast.error(`${key.toUpperCase()}: ${value}`)
	})
}
