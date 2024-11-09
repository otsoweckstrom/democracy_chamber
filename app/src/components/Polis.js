import React, { useEffect, useState } from 'react'

// Embed Pol.is polls using URLs directly from MongoDB
const Polis = ({ height = '600px', width = '100%' }) => {
	const [links, setLinks] = useState([])

	useEffect(() => {
		// Dynamically load Pol.is embed script
		const script = document.createElement('script')
		script.src = 'https://pol.is/embed.js'
		script.async = true
		document.body.appendChild(script)

		// Fetch links from the backend
		const fetchLinks = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/api/links`
				)
				if (!response.ok) throw new Error('Failed to fetch links')
				const data = await response.json()
				setLinks(data)
				console.log(links)
			} catch (error) {
				console.error('Error fetching links:', error)
			}
		}

		fetchLinks()
	}, [])

	return (
		<div className="polis-container">
			{links.map((link) => (
				<div
					key={link._id}
					className="polis-embed-container"
					style={{ marginBottom: '40px' }}
				>
					<h1>{link.url}</h1>
				</div>
			))}
		</div>
	)
}

export default Polis
