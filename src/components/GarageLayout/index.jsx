import React, { useState, useEffect } from 'react'
import axiosInstance from '../../api/axiosInstance'
import './index.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

function GarageLayout() {
	const token = useSelector((state) => state.auth.token)
	const [cars, setCars] = useState([])

	useEffect(() => {
		const fetchGarage = async () => {
			try {
				const response = await axiosInstance.get('/user/garage/all', {
					headers: { Authorization: `Bearer ${token}` },
				})
				setCars(response.data.data)
			} catch (error) {
				console.error('Помилка під час отримання автомобілів з гаражу:', error)
			}
		}

		if (token) {
			fetchGarage()
		}
	}, [token])

	const handleDeleteCar = async () => {
		try {
			await axiosInstance.delete('/user/garage', {
				headers: { Authorization: `Bearer ${token}` },
			})
			toast.success('Гараж очищено')
			setCars([])
		} catch (error) {
			console.error('Error deleting car:', error)
		}
	}

	return (
		<div className="garage-layout">
			<h2 className="garage-layout__title">Мій гараж</h2>
			{cars.length > 0 ? (
				<button
					className="garage-layout__clear-button"
					onClick={handleDeleteCar}
				>
					Очистити гараж
				</button>
			) : (
				<p className="garage-layout__empty-message">
					Гараж порожній, додайте авто!
				</p>
			)}
			<div className="garage-layout__grid">
				{cars.map((car) => (
					<div key={car.id} className="garage-layout__car">
						<img
							className="garage-layout__image"
							src={`${import.meta.env.VITE_API_BASE_URL}/getImage/${
								car.image_path
							}`}
							alt={car.name}
						/>
						<div className="garage-layout__info">
							<h3 className="garage-layout__name">{car.name}</h3>

							<Link
								to={`/parts?brand=${car.brand}&model=${car.model}`}
								className="garage-layout__details-button"
							>
								Перейти до перегляду
							</Link>
						</div>
					</div>
				))}
			</div>
			<ToastContainer
				position="bottom-center"
				autoClose={3000}
				newestOnTop={false}
			/>
		</div>
	)
}

export default GarageLayout
