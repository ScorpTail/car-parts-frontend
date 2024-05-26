import React, { useState, useEffect } from 'react'
import axiosInstance from '../../api/axiosInstance'
import './index.scss'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function AddCarModal({ show, handleClose }) {
	const token = useSelector((state) => state.auth.token)
	const [car, setCar] = useState('')
	const [brands, setBrands] = useState([])
	const [models, setModels] = useState([])

	useEffect(() => {
		const fetchBrands = async () => {
			try {
				const response = await axiosInstance.get('/brand')
				setBrands(Array.isArray(response.data.data) ? response.data.data : [])
			} catch (error) {
				console.log(error.response)
			}
		}

		fetchBrands()
	}, [])

	const handleBrandChange = (e) => {
		const selectedBrand = e.target.value
		setCar((prevCar) => ({
			...prevCar,
			brand: selectedBrand,
		}))
		const brandModels =
			brands.find((brand) => brand.name === selectedBrand)?.brand_models || []
		setModels(brandModels)
	}

	const handleModelChange = (e) => {
		setCar((prevCar) => ({
			...prevCar,
			model: e.target.value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await axiosInstance.post(
				`/user/garage/${car.model}`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)

			toast.success('Додано в гараж!')
			setCar('')
			handleClose()
		} catch (error) {
			console.error('Помилка під час додавання автомобіля у гараж:', error)
		}
	}

	if (!show) return null

	return (
		<div className="modal">
			<div className="modal__content">
				<span className="modal__close" onClick={handleClose}>
					&times;
				</span>
				<h2 className="modal__title">Додати автомобіль у гараж</h2>
				<form className="modal__form" onSubmit={handleSubmit}>
					<div className="modal__form-group">
						<label htmlFor="brand">Марка</label>
						<select
							id="brand"
							name="brand"
							value={car.brand}
							onChange={handleBrandChange}
							required
						>
							<option value="">Виберіть марку</option>
							{brands.map((brand) => (
								<option key={brand.brand_id} value={brand.name}>
									{brand.name}
								</option>
							))}
						</select>
					</div>

					<div className="modal__form-group">
						<label htmlFor="model">Модель</label>
						<select
							id="model"
							name="model"
							value={car.model}
							onChange={handleModelChange}
							required
							disabled={!car.brand}
						>
							<option value="">Виберіть модель</option>
							{models.map((model) => (
								<option
									key={model['car-model_id']}
									value={model['car-model_id']}
								>
									{model.name}
								</option>
							))}
						</select>
					</div>

					<button
						type="submit"
						className="modal__action"
						disabled={!car.brand || !car.model}
					>
						Додати в гараж
					</button>
				</form>
			</div>
		</div>
	)
}

export default AddCarModal
