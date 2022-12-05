import axios from 'axios'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import authConfig from 'src/configs/auth'

const baseURL = 'http://52.21.199.177:5000'

const axiosInstance = axios.create({
	baseURL,
	withCredentials: true
})

axiosInstance.interceptors.request.use(async (config) => {
	const token = localStorage.getItem(authConfig.storageTokenKeyName)

	if (!token) {
		return config
	}

	config.headers!.Authorization = `Bearer ${token}`

	const tokenPayload: any = jwt_decode(token)
	const isExpired = dayjs.unix(tokenPayload.exp).diff(dayjs()) < 1

	if (!isExpired) {
		return config
	}

	try {
		const res = await axios.get(baseURL + authConfig.refreshEndpoint, {
			withCredentials: true
		})

		window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.token)
		config.headers!.Authorization = `Bearer ${res.data.token}`
	}
	catch {}
	finally {
		return config
	}
})

export default axiosInstance
