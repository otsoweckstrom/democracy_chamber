import React, { useEffect, useState } from 'react'
import Polis from './components/Polis'
import './App.css'
import AddPolisTopic from './components/AddPolisTopic'

function App() {
	const [polisThreads, setPolisThreads] = useState([])
	useEffect(() => {
		// Fetch data from your Node.js backend
		fetch(`${process.env.REACT_APP_API_URL}/api/links`)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				return response.json()
			})
			.then((data) => setPolisThreads(data))
			.catch((err) => console.error('Error fetching data:', err))
	}, [])

	return (
		<div className="App">
			<h1>{'lorem ipsum'}</h1>
			<div className="polis-polls">
				<Polis />
			</div>
			<h1>{polisThreads.url}</h1>
			<AddPolisTopic />
		</div>
	)
}

export default App
