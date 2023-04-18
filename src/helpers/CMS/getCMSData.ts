import axios from 'axios'

import GetCMSDataParams from './getCMSData.interface'

const getCMSData = async ({ path }: GetCMSDataParams) => {
	try {
		const { data } = await axios(`/cms${path}`)

		console.log(data)

		return data
	} catch (err) {
		console.log(err)
	}
}

export default getCMSData
