import React from 'react'
import './index.scss'
import CardPart from '../CardParts'
import { useSelector } from 'react-redux'

function FavoriteLayout() {
	const userInfo = useSelector((state) => state.auth.userInfo)
	const favorites = userInfo?.favorites || []
	const isEmpty = favorites.length === 0

	return (
		<div className="favorite-layout">
			<h2 className="favorite-layout__title">Обране</h2>
			{isEmpty ? (
				<p className="favorite-layout__empty-message">
					Ви ще не додали жодного елемента до обраного!
				</p>
			) : (
				<div className="favorite-layout__grid">
					{favorites.map((part) => (
						<CardPart key={part.id} part={part} />
					))}
				</div>
			)}
		</div>
	)
}

export default FavoriteLayout
