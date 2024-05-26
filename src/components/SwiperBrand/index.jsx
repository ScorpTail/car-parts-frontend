import React, { useEffect, useState } from 'react'
import { Navigation, A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import './index.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import axiosInstance from '../../api/axiosInstance'

function SwiperBrands({ brands, onBrandClick }) {
	const [shuffledBrands, setShuffledBrands] = useState([])

	const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	useEffect(() => {
		setShuffledBrands(shuffleArray([...brands]))
	}, [brands])

	return (
		<div className="swiper">
			<Swiper
				modules={[Navigation, A11y, Autoplay]}
				spaceBetween={35}
				slidesPerView={6}
				autoplay={{ delay: 5000 }}
				navigation
				loop
			>
				{shuffledBrands.map((brand, index) => (
					<SwiperSlide key={index}>
						<div className="swiper__slide" onClick={() => onBrandClick(brand)}>
							<img
								className="swiper__slide-img"
								src={`${import.meta.env.VITE_API_BASE_URL}/getImage/${
									brand.image_path
								}`}
								alt={brand.name}
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default SwiperBrands
