import React, { useEffect, useState } from 'react'
import '../styles/polis.css'

// Embed Pol.is polls using URLs directly from MongoDB
const Polis = () => {
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
				<div key={link._id} className="polis-embed-container">
					<div
						className="polis"
						scrolling="false"
						data-ucv="true"
						data-ucw="false"
						data-ucsf="true"
						data-xid="true"
						data-x_profile_image_url="true"
						data-build="false"
						data-conversation_id={link.url.replace(
							'https://pol.is/',
							''
						)}
					/>
				</div>
			))}
		</div>
	)
}

export default Polis
