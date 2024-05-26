import React, { useEffect, useState } from 'react'
import './index.scss'

function Filter({ openSections, toggleSection, filters, setFilters, parts }) {
	const [countries, setCountries] = useState([])

	useEffect(() => {
		if (parts) {
			const uniqueCountries = [
				...new Set(parts.map((part) => part.country_production)),
			]
			setCountries(uniqueCountries)
		}
	}, [parts])

	const handleCheckboxChange = (e) => {
		const { name, checked } = e.target
		setFilters((prevFilters) => ({
			...prevFilters,
			[name]: checked,
		}))
	}

	const handlePriceChange = (e) => {
		const { name, value } = e.target
		setFilters((prevFilters) => ({
			...prevFilters,
			[name]: value,
		}))
	}

	return (
		<div className="filter">
			<h3 className="filter__title">Фільтрація</h3>

			<div className="filter__section">
				<h4
					className="filter__subtitle"
					onClick={() => toggleSection('status')}
				>
					Статус
				</h4>
				{openSections.status && (
					<div className="filter__checkboxes">
						<label>
							<input
								type="checkbox"
								name="inStock"
								onChange={handleCheckboxChange}
							/>
							Є в наявності
						</label>
						<label>
							<input
								type="checkbox"
								name="outOfStock"
								onChange={handleCheckboxChange}
							/>
							Немає в наявності
						</label>
						<label>
							<input
								type="checkbox"
								name="ended"
								onChange={handleCheckboxChange}
							/>
							Скінчився
						</label>
					</div>
				)}
			</div>
			<div className="filter__section">
				<h4 className="filter__subtitle" onClick={() => toggleSection('price')}>
					Ціна
				</h4>
				{openSections.price && (
					<div className="filter__items">
						<input
							autoComplete="off"
							placeholder="від 3 500"
							type="number"
							name="min_price"
							onChange={handlePriceChange}
						/>
						<span>-</span>
						<input
							autoComplete="off"
							placeholder="до 40 000"
							type="number"
							name="max_price"
							onChange={handlePriceChange}
						/>
					</div>
				)}
			</div>
			<div className="filter__section">
				<h4
					className="filter__subtitle"
					onClick={() => toggleSection('country')}
				>
					Країна виробника
				</h4>
				{openSections.country && (
					<div className="filter__checkboxes">
						{countries.map((country) => (
							<label key={country}>
								<input
									type="checkbox"
									name={country}
									onChange={handleCheckboxChange}
								/>
								{country}
							</label>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Filter
