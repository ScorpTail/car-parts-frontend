import React from 'react'
import './index.scss'
import { NavLink } from 'react-router-dom'

function ProfileMenu() {
	return (
		<div className="profile-menu">
			<div className="container">
				<div className="profile-menu__wrapper">
					<NavLink
						to="/profile"
						className="profile-menu__items"
						activeclassname="active"
						end
					>
						Акаунт
					</NavLink>
					<NavLink
						to="/profile/favorites"
						className="profile-menu__items"
						activeclassname="active"
					>
						Обране
					</NavLink>
					<NavLink
						to="/profile/garage"
						className="profile-menu__items"
						activeclassname="active"
					>
						Гараж
					</NavLink>
				</div>
			</div>
		</div>
	)
}

export default ProfileMenu
