import React, { useState } from 'react'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../api/axiosInstance'
import { setUserInfo, clearTokens } from '../../store/authSlice'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function ProfileLayout() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userInfo = useSelector((state) => state.auth.userInfo)
	const token = useSelector((state) => state.auth.token)
	const [currentPassword, setCurrentPassword] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirmation, setPasswordConfirmation] = useState('')

	const handleLogout = async () => {
		try {
			await axiosInstance.post('/logout', null, {
				headers: { Authorization: `Bearer ${token}` },
			})
			dispatch(clearTokens())
			navigate('/')
		} catch (error) {
			console.error('Error logging out:', error)
			toast.error('Помилка при виході')
		}
	}

	const handleChangeClick = async (e) => {
		e.preventDefault()
		try {
			const response = await axiosInstance.post(
				`/user/${userInfo.id}`,
				{
					current_password: currentPassword,
					password: password,
					password_confirmation: passwordConfirmation,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			setCurrentPassword('')
			setPassword('')
			setPasswordConfirmation('')
			toast.success('Пароль змінено')
		} catch (error) {
			console.log('Error updating user info:', error)
			toast.error('Помилка при оновленні пароля')
		}
	}

	return (
		<div className="profile-layout">
			<h2 className="profile-layout__title">Акаунт</h2>
			<div className="profile-layout__wrapper">
				<div className="profile-layout__info">
					<p className="profile-layout__field">
						<span className="profile-layout__label">Ім'я користувача:</span>
						<span className="profile-layout__value">{userInfo?.name}</span>
					</p>
					<p className="profile-layout__field">
						<span className="profile-layout__label">Електронна пошта:</span>
						<span className="profile-layout__value">{userInfo?.email}</span>
					</p>
				</div>
				<div className="profile-layout__password">
					<h3 className="profile-layout__password-title">Змінити пароль</h3>
					<form onSubmit={handleChangeClick} className="profile-layout__form">
						<div className="profile-layout__form-group">
							<label
								className="profile-layout__form-label"
								htmlFor="current_password"
							>
								Поточний пароль:
							</label>
							<input
								type="password"
								name="current_password"
								id="current_password"
								value={currentPassword}
								onChange={(e) => setCurrentPassword(e.target.value)}
								className="profile-layout__form-input"
								required
							/>
						</div>
						<div className="profile-layout__form-group">
							<label className="profile-layout__form-label" htmlFor="password">
								Новий пароль:
							</label>
							<input
								type="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								name="password"
								required
								className="profile-layout__form-input"
							/>
						</div>
						<div className="profile-layout__form-group">
							<label
								className="profile-layout__form-label"
								htmlFor="password_confirmation"
							>
								Підтвердити новий пароль:
							</label>
							<input
								type="password"
								id="password_confirmation"
								value={passwordConfirmation}
								onChange={(e) => setPasswordConfirmation(e.target.value)}
								name="password_confirmation"
								className="profile-layout__form-input"
							/>
						</div>
						<button className="profile-layout__form-button">Зберегти</button>
					</form>
				</div>
				<button
					className="profile-layout__logout-button"
					onClick={handleLogout}
				>
					Вихід
				</button>
			</div>
			<ToastContainer
				position="bottom-center"
				autoClose={3000}
				newestOnTop={false}
			/>
		</div>
	)
}

export default ProfileLayout
