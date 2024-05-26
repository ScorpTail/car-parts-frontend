import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	token: localStorage.getItem('token') || null,
	refreshToken: localStorage.getItem('refreshToken') || null,
	userInfo: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setTokens: (state, action) => {
			state.token = action.payload.token
			state.refreshToken = action.payload.refreshToken
			localStorage.setItem('token', action.payload.token)
			localStorage.setItem('refreshToken', action.payload.refreshToken)
		},
		clearTokens: (state) => {
			state.token = null
			state.refreshToken = null
			state.userInfo = null
			localStorage.removeItem('token')
			localStorage.removeItem('refreshToken')
		},
		updateToken: (state, action) => {
			state.token = action.payload
			localStorage.setItem('token', action.payload)
		},
		setUserInfo: (state, action) => {
			state.userInfo = action.payload
		},
		addToFavorites: (state, action) => {
			if (state.userInfo) {
				state.userInfo.favorites = [...state.userInfo.favorites, action.payload]
			}
		},
		removeFromFavorites: (state, action) => {
			if (state.userInfo) {
				state.userInfo.favorites = state.userInfo.favorites.filter(
					(fav) => fav.id !== action.payload
				)
			}
		},
	},
})

export const {
	setTokens,
	clearTokens,
	updateToken,
	setUserInfo,
	addToFavorites,
	removeFromFavorites,
} = authSlice.actions
export default authSlice.reducer
