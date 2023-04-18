import axios from 'axios'

const getUserData = async () => {
	try {
		const { data } = await axios.get('/user_data_endpoint')

		console.log(data)

		return data
	} catch (err) {
		console.log(err)
	}
}

export default getUserData
