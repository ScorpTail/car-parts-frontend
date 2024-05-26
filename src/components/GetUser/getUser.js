import { useEffect } from 'react'
import axiosInstance from '../../api/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { setTokens, setUserInfo } from '../../store/authSlice'

function AuthUser() {
	const token = useSelector((state) => state.auth.token)
	const refreshToken = useSelector((state) => state.auth.refreshToken)

	const dispatch = useDispatch()

	const refresh = async () => {
		try {
			let response = await axiosInstance.post('/refresh', null, {
				headers: { Authorization: `Bearer ${refreshToken}` },
			})

			dispatch(setTokens(response.data))
		} catch (error) {
			console.log(error)
		}
	}

	const fetchUser = async () => {
		try {
			let response = await axiosInstance.get('/user', {
				headers: { Authorization: `Bearer ${token}` },
			})
			dispatch(setUserInfo(response.data.data))
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (!token && refreshToken) {
			refresh()
		}
	}, [])

	useEffect(() => {
		if (token) {
			fetchUser()
		}
	}, [token])
}

export default AuthUser
