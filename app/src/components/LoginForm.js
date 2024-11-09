import React, { useState } from 'react'

const LoginForm = ({ setLoggedInUser }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [isLogin, setIsLogin] = useState(true)
	const [error, setError] = useState(null)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null)

		const endpoint = isLogin
			? `${process.env.REACT_APP_API_URL}/api/user/login`
			: `${process.env.REACT_APP_API_URL}/api/user/register`

		try {
			const response = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			})

			if (response.ok) {
				const data = await response.json()
				if (isLogin) {
					// Handle login success
					console.log('Login successful:', data)
					setLoggedInUser({
						username: data.username,
						isAdmin: data.isAdmin,
						isPoller: data.isPoller,
					})
				} else {
					// Handle registration success
					console.log('Registration successful:', data)
					setIsLogin(true) // Switch to login form after registration
				}
			} else {
				const errorData = await response.json()
				setError(errorData.message)
			}
		} catch (err) {
			console.error('Network error:', err)
			setError('Network error. Please try again later.')
		}
	}

	return (
		<div>
			{
				<form onSubmit={handleSubmit}>
					<h2>{isLogin ? 'Login' : 'Register'}</h2>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					{error && <p style={{ color: 'red' }}>{error}</p>}
					<button type="submit">
						{isLogin ? 'Login' : 'Register'}
					</button>
					<button type="button" onClick={() => setIsLogin(!isLogin)}>
						{isLogin ? 'Switch to Register' : 'Switch to Login'}
					</button>
				</form>
			}
		</div>
	)
}

export default LoginForm
