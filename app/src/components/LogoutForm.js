import React from 'react'
import { Button, Typography, Box, Paper } from '@mui/material'
import '../styles/logoutform.css'

const LogoutForm = ({ onLogout, loggedInUser }) => {
	const handleLogout = async () => {
		try {
			const res = await fetch('/api/logout', { method: 'POST' })
			if (res.ok) {
				onLogout()
			} else {
				const errorData = await res.json()
				console.error('Logout failed:', errorData.message)
				// Consider displaying the error to the user
			}
		} catch (error) {
			console.error('Logout error:', error)
			// Consider displaying a generic error message to the user
		}
	}

	if (!loggedInUser) {
		return null
	}

	return (
		<Paper elevation={3} className="logout-form-container">
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					margin: 1,
					padding: 2,
					height: 80,
				}}
			>
				<Typography variant="body1">
					Welcome, {loggedInUser.username}!
				</Typography>

				<Button
					variant="outlined"
					color="primary"
					onClick={handleLogout}
				>
					Logout
				</Button>
			</Box>
		</Paper>
	)
}

export default LogoutForm
