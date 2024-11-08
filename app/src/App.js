import React, { useEffect, useState } from 'react'

function App() {
	const [message, setMessage] = useState('')

	useEffect(() => {
		// Fetch data from your Node.js backend
		fetch(`${process.env.REACT_APP_API_URL}/api`)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				return response.json()
			})
			.then((data) => setMessage(data.message))
			.catch((err) => console.error('Error fetching data:', err))
	}, [])

	return (
		<div className="App">
			<h1>React Frontend Connected to Node.js Backend</h1>
			<p>{message}</p>
		</div>
	)
}

export default App
