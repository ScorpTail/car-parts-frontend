import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRoute = () => {
	const token = useSelector((state) => state.auth.token)

	return token ? <Outlet /> : <Navigate to="/login" />
}

export default AuthRoute
