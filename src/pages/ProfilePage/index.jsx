import React from 'react'
import ProfileMenu from '../../components/ProfileMenu'
import ProfileLayout from '../../components/ProfileLayout'
import { Route, Routes } from 'react-router-dom'
import FavoriteLayout from '../../components/FavoriteLayout'
import GarageLayout from '../../components/GarageLayout'

function ProfilePage() {
	return (
		<div className="prfile">
			<div className="container">
				<div className="profile__wrapper">
					<ProfileMenu />
					<Routes>
						<Route path="/" element={<ProfileLayout />} />
						<Route path="/favorites" element={<FavoriteLayout />} />
						<Route path="/garage" element={<GarageLayout />} />
					</Routes>
				</div>
			</div>
		</div>
	)
}

export default ProfilePage
