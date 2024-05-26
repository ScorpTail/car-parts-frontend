import React, { useState } from 'react'
import './index.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axiosInstance from '../../api/axiosInstance'
import { setTokens } from '../../store/authSlice'
import { ToastContainer, toast } from 'react-toastify'

function Login() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (e) => {
		e.preventDefault()

		try {
			const response = await axiosInstance.post('/login', {
				email: email,
				password: password,
			})

			const { token, refreshToken } = response.data
			dispatch(setTokens({ token: token, refreshToken: refreshToken }))
			navigate('/')
		} catch (error) {
			let errorMessage = 'Щось пішло не так, спробуйте ще раз.'
			if (error.response?.data?.errors) {
				const firstErrorKey = Object.keys(error.response.data.errors)[0]
				errorMessage = error.response.data.errors[firstErrorKey][0]
			} else if (error.response?.data?.message) {
				errorMessage = error.response.data.message
			}
			toast.error(errorMessage)
		}
	}

	return (
		<div className="login">
			<div className="login__container">
				<h2 className="login__title">Увійти</h2>
				<form onSubmit={handleLogin} className="login__form">
					<div className="login__form-group">
						<label htmlFor="email" className="login__label">
							Електронна пошта
						</label>
						<input
							type="email"
							id="email"
							className="login__input"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Введіть вашу пошту"
							required
						/>
					</div>
					<div className="login__form-group">
						<label htmlFor="password" className="login__label">
							Пароль
						</label>
						<input
							type="password"
							value={password}
							id="password"
							onChange={(e) => setPassword(e.target.value)}
							className="login__input"
							placeholder="Введіть ваш пароль"
							required
						/>
					</div>
					<button className="login__button">Увійти</button>
				</form>
				<div className="login__register">
					<span>Ще не зареєстровані?</span>
					<Link to="/register" className="login__register-link">
						Зареєструватись
					</Link>
				</div>
			</div>
			<ToastContainer
				position="bottom-center"
				autoClose={3000}
				newestOnTop={false}
			/>
		</div>
	)
}

export default Login
