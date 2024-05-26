import React, { useEffect, useState } from 'react'
import './index.scss'
import { HeartFill, Heart } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../api/axiosInstance'
import { toast } from 'react-toastify'
import { addToFavorites, removeFromFavorites } from '../../store/authSlice'

function CardPart({ part }) {
	const id = part.id || part['car-part_id']
	const token = useSelector((state) => state.auth.token)
	const favorites = useSelector((state) => state.auth.userInfo?.favorites || [])
	const dispatch = useDispatch()
	const [isAddedToFavorite, setIsAddedToFavorite] = useState(null)

	useEffect(() => {
		if (favorites.length > 0 && isAddedToFavorite == null) {
			setIsAddedToFavorite(favorites.some((fav) => fav.id === id))
		}
	}, [favorites])

	const handleAddFavorite = async (e) => {
		e.preventDefault()

		try {
			await axiosInstance.post(`/user/favorite/${id}`, null, {
				headers: { Authorization: `Bearer ${token}` },
			})
			dispatch(addToFavorites(part))
			setIsAddedToFavorite(true)
			toast.success('Додано в обране!')
		} catch (error) {
			console.error('Помилка під час додавання в обране:', error)
		}
	}

	const handleRemoveFavorite = async (e) => {
		e.preventDefault()

		try {
			await axiosInstance.post(`/user/favorite/${id}`, null, {
				headers: { Authorization: `Bearer ${token}` },
			})
			dispatch(removeFromFavorites(id))
			toast.success('Видалено з обраного!')
			setIsAddedToFavorite(false)
		} catch (error) {
			console.error('Помилка під час видалення з обраного:', error)
		}
	}

	return (
		<div className="card-parts">
			<Link to={`/part/${id}`}>
				<img
					className="card-parts__image"
					src={`${import.meta.env.VITE_API_BASE_URL}/getImage/${
						part.image_path
					}`}
					alt={part.name}
				/>
			</Link>
			<h3 className="card-parts__name">{part.name}</h3>
			<p className="card-parts__price">{part.price} ₴</p>
			<p className="card-pparts__availability">{part.status} </p>
			{token && (
				<>
					{isAddedToFavorite ? (
						<HeartFill
							className="card-parts__in-favorite"
							onClick={handleRemoveFavorite}
						/>
					) : (
						<Heart
							className="card-parts__add-to-favorite"
							onClick={handleAddFavorite}
						/>
					)}
				</>
			)}
		</div>
	)
}

export default CardPart
