import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PartDetails from '../../components/PartDetails'
import AddInfo from '../../components/AddInfo'
import './index.scss'
import axiosInstance from '../../api/axiosInstance'

function PartPage() {
	const { id } = useParams()
	const [part, setPart] = useState('')

	useEffect(() => {
		const fetchParts = async () => {
			try {
				const response = await axiosInstance.get(`/part/${id}`)
				setPart(response.data.data)
			} catch (error) {
				console.error('Помилка під час отримання даних:', error)
			}
		}

		fetchParts()
	}, [id])

	return (
		<div className="product-page">
			<div className="container">
				<PartDetails part={part} />
				<AddInfo />
			</div>
		</div>
	)
}

export default PartPage
