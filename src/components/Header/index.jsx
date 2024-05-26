import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import SearchField from '../Search'
import { Heart, Person } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'

function Header() {
	const userInfo = useSelector((state) => state.auth.userInfo)
	const token = useSelector((state) => state.auth.userInfo)
	return (
		<div className="header">
			<div className="header__wrapper">
				<Link to="/" className="header__logo">
					<img src="/src/assets/logo.png" alt="logo" />
				</Link>
				<div className="header__nav-bar">
					<SearchField />
				</div>
				{token && (
					<div className="header__actions">
						<Link to="/profile/garage" className="header__garage">
							<img src="/garage-icon.png" alt="" />
						</Link>
						<Link to="/profile/favorites" className="header__favorite">
							<Heart className="header__favorite-icon" />
						</Link>
					</div>
				)}
				{userInfo ? (
					<Link to="/profile" className="header__auth-name">
						<span>{userInfo.name}</span>
					</Link>
				) : (
					<Link to="/login" className="header__login">
						<Person className="header__login-icon" /> <span>Увійти</span>
					</Link>
				)}
			</div>
		</div>
	)
}

export default Header
