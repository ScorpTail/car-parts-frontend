import React, { useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Registration from './pages/Registration'
import Footer from './components/Footer'
import AboutUs from './pages/AboutUs'
import Parts from './pages/Parts'
import PartPage from './pages/PartPage'
import ProfilePage from './pages/ProfilePage'
import AuthUser from './components/GetUser/getUser'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import PrivateRoute from './components/Routes/ProtectedRoutes'

function App() {
	const token = useSelector((state) => state.auth.token)

	return (
		<div className="app">
			<Header />
			<AuthUser />
			<Routes>
				<Route path="/" element={<Home />} />
				{!token && <Route path="/login" element={<Login />} />}{' '}
				{!token && <Route path="/register" element={<Registration />} />}{' '}
				<Route path="/about" element={<AboutUs />} />
				<Route path="/parts/:modelId" element={<Parts />} />
				<Route path="/part/:id" element={<PartPage />} />
				<Route element={<PrivateRoute />}>
					<Route path="/profile/*" element={<ProfilePage />} />
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
			<Footer />
		</div>
	)
}

export default App
