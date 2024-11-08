import React, { useEffect, useState } from 'react'
import Polis from './components/Polis'

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
			<p>{message}</p>
			<Polis />
		</div>
	)
}

export default App
