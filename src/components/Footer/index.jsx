import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'

function Footer() {
	return (
		<footer className="footer">
			<div className="footer__container">
				<nav className="footer__nav">
					<ul className="footer__nav-list">
						<li className="footer__nav-item">
							<Link to="/" className="footer__nav-link">
								Головна
							</Link>
						</li>
						<li className="footer__nav-item">
							<Link to="/about" className="footer__nav-link">
								Про нас
							</Link>
						</li>
					</ul>
				</nav>
				<div className="footer__contact">
					<h3 className="footer__title">Контакти</h3>
					<p className="footer__info">
						<strong className="footer__label">Телефон:</strong> +1234567890
					</p>
					<p className="footer__info">
						<strong className="footer__label">Пошта:</strong> info@example.com
					</p>
					<p className="footer__info">
						<strong className="footer__label">Telegram:</strong> @example
					</p>
				</div>
				<div className="footer__social">
					<h3 className="footer__title">Соціальні мережі</h3>
					<ul className="footer__list">
						<li className="footer__item">
							<a href="#" className="footer__link">
								Facebook
							</a>
						</li>
						<li className="footer__item">
							<a href="#" className="footer__link">
								Twitter
							</a>
						</li>
						<li className="footer__item">
							<a href="#" className="footer__link">
								Instagram
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="footer__rights">
				<p>© 2024 Всі права захищено.</p>
			</div>
		</footer>
	)
}

export default Footer
