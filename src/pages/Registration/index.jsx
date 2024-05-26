import React, { useState } from 'react'
import './index.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setTokens } from '../../store/authSlice'
import axiosInstance from '../../api/axiosInstance'
import { ToastContainer, toast } from 'react-toastify'

function Registration() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleRegister = async (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			toast.error('Паролі не співпадають')
			return
		}

		try {
			const response = await axiosInstance.post(
				'/register',

				{
					name: name,
					email: email,
					password: password,
					password_confirmation: confirmPassword,
				}
			)

			const { token, refreshToken } = response.data
			console.log(response.data)
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
		<div className="register">
			<div className="register__container">
				<h2 className="register__title">Реєстрація</h2>
				<form className="register__form" onSubmit={handleRegister}>
					<div className="register__form-group">
						<label htmlFor="name" className="register__label">
							Ім'я
						</label>
						<input
							type="text"
							id="name"
							className="register__input"
							placeholder="Введіть ваше ім'я"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>
					<div className="register__form-group">
						<label htmlFor="email" className="register__label">
							Електронна пошта
						</label>
						<input
							type="email"
							id="email"
							className="register__input"
							placeholder="Введіть вашу пошту"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="register__form-group">
						<label htmlFor="password" className="register__label">
							Пароль
						</label>
						<input
							type="password"
							id="password"
							className="register__input"
							placeholder="Введіть ваш пароль"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="register__form-group">
						<label htmlFor="confirmPassword" className="register__label">
							Підтвердіть пароль
						</label>
						<input
							type="password"
							id="confirmPassword"
							className="register__input"
							placeholder="Підтвердіть ваш пароль"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit" className="register__button">
						Зареєструватись
					</button>
				</form>
				<div className="register__login">
					<span>Вже зареєстровані?</span>
					<Link to="/login" className="register__login-link">
						Увійти
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

export default Registration
