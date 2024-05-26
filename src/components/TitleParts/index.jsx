import React from 'react'
import './index.scss'

function TitleParts({modelName}) {
	return (
		<div className="title">
			<h2 className="title__title">Деталі для {modelName}</h2>
		</div>
	)
}

export default TitleParts
