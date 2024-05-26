import React, { useEffect, useState } from 'react'
import './index.scss'
import TitleParts from '../../components/TitleParts'
import Filter from '../../components/FilterParts'
import CardPart from '../../components/CardParts'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'
import { useDebounce } from 'use-debounce'

function Parts() {
	const { modelId } = useParams()
	const userInfo = useSelector((state) => state.auth.userInfo)

	const favorites = userInfo?.favorites || []
	const [parts, setParts] = useState([])
	const [openSections, setOpenSections] = useState({
		status: true,
		price: true,
		country: true,
	})
	const [filters, setFilters] = useState({
		inStock: false,
		outOfStock: false,
		ended: false,
		min_price: '',
		max_price: '',
	})

	const [debouncedFilters] = useDebounce(filters, 500)

	const toggleSection = (section) => {
		setOpenSections((prevState) => ({
			...prevState,
			[section]: !prevState[section],
		}))
	}

	const fetchParts = async (appliedFilters) => {
		try {
			let status = undefined
			if (appliedFilters.inStock) status = 1
			if (appliedFilters.outOfStock) status = 2
			if (appliedFilters.ended) status = 3

			const selectedCountries = Object.keys(appliedFilters).filter(
				(key) =>
					appliedFilters[key] &&
					![
						'inStock',
						'outOfStock',
						'ended',
						'min_price',
						'max_price',
					].includes(key)
			)

			const params = {
				model_id: modelId,
				status: status,
				min_price: appliedFilters.min_price || undefined,
				max_price: appliedFilters.max_price || undefined,
				country: selectedCountries.join(','),
			}

			const response = await axiosInstance.get('/part', { params })
			setParts(response.data.data)
		} catch (error) {
			console.error('Помилка під час отримання частин:', error)
		}
	}

	useEffect(() => {
		fetchParts(debouncedFilters)
	}, [debouncedFilters])

	const model = parts.find((part) => part.model_id === parseInt(modelId))
	const modelName = model ? model.model_name : 'Невідома модель'

	console.log(model)

	const filteredParts = parts.filter(
		(part) => part.model_id === parseInt(modelId)
	)

	return (
		<div className="parts-page">
			<div className="container">
				<div className="parts-page__wrapper">
					<Filter
						openSections={openSections}
						toggleSection={toggleSection}
						filters={filters}
						setFilters={setFilters}
						parts={parts}
					/>
					<div className="parts-page__main">
						<TitleParts modelName={modelName} />
						<div className="parts-page__cards">
							{filteredParts.map((part) => (
								<CardPart
									key={part['car-part_id']}
									part={part}
									isFavorite={favorites.some(
										(fav) => fav.id === part['car-part_id']
									)}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
			<ToastContainer
				position="bottom-center"
				autoClose={3000}
				newestOnTop={false}
			/>
		</div>
	)
}

export default Parts