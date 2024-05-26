import React, { useState, useEffect } from 'react'
import './index.scss'
import { Search } from 'react-bootstrap-icons'
import axiosInstance from '../../api/axiosInstance'
import { useDebounce } from 'use-debounce'
import { Link, useNavigate } from 'react-router-dom'

function SearchField() {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState([])
	const [debouncedQuery] = useDebounce(query, 500)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchResults = async () => {
			if (!debouncedQuery) {
				setResults([])
				return
			}

			setLoading(true)
			setError(null)

			try {
				const response = await axiosInstance.get('/search', {
					params: { query: debouncedQuery },
				})
				setResults(response.data)
			} catch (error) {
				setError('Помилка під час пошуку.')
			} finally {
				setLoading(false)
			}
		}

		fetchResults()
	}, [debouncedQuery])

	useEffect(() => {
		setQuery('')
		setResults([])
	}, [navigate])

	const shouldShowResultsContainer =
		query && (loading || error || results.length > 0 || results.length === 0)

	return (
		<div className="search">
			<div className="search__wrapper">
				<input
					className="search__input"
					type="text"
					placeholder="Введіть назву деталі, артикул"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<Search className="search__icon" />
			</div>
			{shouldShowResultsContainer && (
				<div className="search__results-container">
					{loading && <div className="search__loading">Завантаження...</div>}
					{error && <div className="search__error">{error}</div>}
					{!loading && !error && results.length > 0 && (
						<div className="search__results">
							{results.map((result) => (
								<Link
									key={result.id}
									to={`/part/${result.id}`}
									className="search__result-item"
								>
									<img
										src={`${import.meta.env.VITE_API_BASE_URL}/getImage/${
											result.image_path
										}`}
										alt={result.name}
										className="search__result-image"
									/>
									<div className="search__result-info">
										<div className="search__result-name">{result.name}</div>
										<div className="search__result-price">{result.price} ₴</div>
									</div>
								</Link>
							))}
						</div>
					)}
					{!loading && !error && results.length === 0 && debouncedQuery && (
						<div className="search__results">
							<div className="search__result-item">
								<div className="search__no-results">Нічого не знайдено</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default SearchField
