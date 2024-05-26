import React, { useEffect, useState } from 'react'
import './index.scss'
import { HeartFill, Heart } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../api/axiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import { addToFavorites, removeFromFavorites } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function PartDetails({ part }) {
	const token = useSelector((state) => state.auth.token)
	const favorites = useSelector((state) => state.auth.userInfo?.favorites || [])
	const dispatch = useDispatch()
	const navigate = useNavigate()

	console.log(part)

	const [isAddedToFavorite, setIsAddedToFavorite] = useState({})

	useEffect(() => {
		if (token) {
			const favoritesMap = favorites.reduce((acc, fav) => {
				acc[fav.id] = true
				return acc
			}, {})
			setIsAddedToFavorite(favoritesMap)
		}
	}, [token, favorites, setIsAddedToFavorite])

	const handleAddFavorite = async (id, part) => {
		try {
			if (!token) {
				navigate('/login')
				return
			}

			await axiosInstance.post(`/user/favorite/${part['car-part_id']}`, null, {
				headers: { Authorization: `Bearer ${token}` },
			})
			dispatch(addToFavorites(part))

			setIsAddedToFavorite((prevState) => ({ ...prevState, [id]: true }))

			toast.success('Додано в обране!')
		} catch (error) {
			console.error('Помилка під час додавання в обране:', error)
		}
	}

	const handleRemoveFavorite = async (id) => {
		try {
			await axiosInstance.post(`/user/favorite/${part['car-part_id']}`, null, {
				headers: { Authorization: `Bearer ${token}` },
			})
			dispatch(removeFromFavorites(id))
			setIsAddedToFavorite((prevState) => ({ ...prevState, [id]: false }))
			toast.success('Видалено з обраного!')
		} catch (error) {
			console.error('Помилка під час видалення з обраного:', error)
		}
	}

	return (
		<div>
			<div className="part-details">
				<div key={part.id} className="part-details__content">
					<div className="part-details__image-wrapper">
						<img
							className="part-details__image"
							src={`${import.meta.env.VITE_API_BASE_URL}/getImage/${
								part.image_path
							}`}
							alt={part.name}
						/>
					</div>
					<div className="part-details__info">
						<h3 className="part-details__name">{part.name}</h3>
						<p className="part-details__description">{part.description}</p>
						<div className="part-details__specs">
							<p className="part-details__spec">
								<span className="part-details__spec-label">
									Країна виробника:
								</span>{' '}
								{part.country_production}
							</p>
							<p className="part-details__spec">
								<span className="part-details__spec-label">Артикул:</span>{' '}
								{part.article}
							</p>
							<p className="part-details__spec">
								<span className="part-details__spec-label">Ціна:</span>{' '}
								{part.price} ₴
							</p>
							<p
								className={`part-details__availability ${
									part.status === 'Not Available'
										? 'not-available'
										: 'available'
								}`}
							>
								{part.status === 'Not Available'
									? 'Немає в наявності'
									: 'Є в наявності'}
							</p>
						</div>
						<div className="part-details__action">
							{isAddedToFavorite[part.id] ? (
								<button
									className="part-details__button"
									onClick={() => handleRemoveFavorite(part.id)}
								>
									<HeartFill /> <span>Видалити з обраного</span>
								</button>
							) : (
								<button
									className="part-details__button"
									onClick={() => handleAddFavorite(part.id, part)}
								>
									<Heart /> <span>Додати в обране</span>
								</button>
							)}
						</div>
					</div>
				</div>

				<ToastContainer
					position="bottom-center"
					autoClose={3000}
					newestOnTop={false}
				/>
			</div>
		</div>
	)
}

export default PartDetails
