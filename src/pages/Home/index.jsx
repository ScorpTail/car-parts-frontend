import React, { useState, useEffect } from 'react'
import './index.scss'
import SwiperBrands from '../../components/SwiperBrand'
import { PlusSquare } from 'react-bootstrap-icons'
import AddCarModal from '../Garage'
import axiosInstance from '../../api/axiosInstance'
import AddInfo from '../../components/AddInfo'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'

function HomePage() {
	const [showModal, setShowModal] = useState(false)
	const [selectedBrand, setSelectedBrand] = useState(null)
	const [brands, setBrands] = useState([])
	const [models, setModels] = useState([])
	const navigate = useNavigate()
	const token = useSelector((state) => state.auth.token)

	const openModal = () => {
		if (token) {
			setShowModal(true)
		} else {
			navigate('/login')
		}
	}
	const closeModal = () => setShowModal(false)

	const handleBackClick = () => {
		setSelectedBrand(null)
		setModels([])
	}

	const handleBrandClick = (brand) => {
		setSelectedBrand(brand)
		setModels(brand.brand_models)
	}

	useEffect(() => {
		const fetchBrands = async () => {
			try {
				const response = await axiosInstance.get('/brand')
				setBrands(Array.isArray(response.data.data) ? response.data.data : [])
			} catch (error) {
				console.log('Error fetching brands:', error.response)
			}
		}

		fetchBrands()
	}, [])

	return (
		<div className="home-page">
			<div className="container">
				<h1 className="home-page__title">
					Запчастини для всіх марок автомобілів
				</h1>
				<SwiperBrands brands={brands} onBrandClick={handleBrandClick} />
				<hr className="home-page__divider" />
				{selectedBrand ? (
					<div className="home-page__models">
						<button
							className="home-page__back-button"
							onClick={handleBackClick}
						>
							Повернутись до марок
						</button>
						<h2 className="home-page__subtitle">{selectedBrand.name}</h2>
						<div className="home-page__list">
							{models.map((model) => (
								<Link
									to={`/parts/${model['car-model_id']}`}
									key={model['car-model_id']}
									className="home-page__item"
								>
									<img
										src={`${import.meta.env.VITE_API_BASE_URL}/getImage/${
											model.image_path
										}`}
										alt={model.name}
										className="home-page__item-image"
									/>
									<div className="home-page__item-name">{model.name}</div>
								</Link>
							))}
						</div>
					</div>
				) : (
					<div className="home-page__brands-list">
						<div className="home-page__list">
							{brands.map((brand) => (
								<a
									key={brand.brand_id}
									className="home-page__brand"
									onClick={() => handleBrandClick(brand)}
								>
									{brand.name}
								</a>
							))}
						</div>
					</div>
				)}
				<hr className="home-page__divider" />
				<div className="home-page__call-to-action">
					<h2>Додайте своє авто в гараж!</h2>
					<p>
						Отримайте персоналізовані рекомендації щодо запчастин для вашого
						автомобіля.
					</p>
					<button className="home-page__actions" onClick={openModal}>
						<PlusSquare /> <span>Додати нове авто</span>
					</button>
				</div>
				<AddCarModal show={showModal} handleClose={closeModal} />
				<hr className="home-page__divider" />
				<AddInfo />
			</div>
			<ToastContainer
				position="bottom-center"
				autoClose={3000}
				newestOnTop={false}
			/>
		</div>
	)
}

export default HomePage
