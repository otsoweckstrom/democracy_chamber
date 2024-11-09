import React, { useEffect, useState } from 'react'

function AddPolisTopic() {
	const [links, setLinks] = useState([])
	const [form, setForm] = useState({ title: '', description: '', url: '' })

	// Fetch links from the backend
	useEffect(() => {
		const fetchLinks = async () => {
			try {
				const response = await fetch('http://localhost:5001/api/links')
				const data = await response.json()
				setLinks(data)
			} catch (error) {
				console.error('Error fetching links:', error)
			}
		}
		fetchLinks()
	}, [])

	// Handle form input change
	const handleChange = (e) => {
		const { name, value } = e.target
		setForm({ ...form, [name]: value })
	}

	// Handle form submission to add a new link
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await fetch(
				'http://localhost:5001/api/links/add',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(form),
				}
			)

			if (response.ok) {
				const newLink = await response.json()
				setLinks([...links, newLink.link]) // Update the links list
				setForm({ title: '', description: '', url: '' }) // Clear the form
			} else {
				console.error('Failed to add link')
			}
		} catch (error) {
			console.error('Error adding link:', error)
		}
	}

	return (
		<div className="App">
			<h1>Pol.is Links</h1>

			{/* Form to add a new link */}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="title"
					placeholder="Title"
					value={form.title}
					onChange={handleChange}
					required
				/>
				<input
					type="text"
					name="description"
					placeholder="Description"
					value={form.description}
					onChange={handleChange}
				/>
				<input
					type="url"
					name="url"
					placeholder="URL"
					value={form.url}
					onChange={handleChange}
					required
				/>
				<button type="submit">Add Link</button>
			</form>

			{/* Display list of links */}
			<ul>
				{links.map((link) => (
					<li key={link._id}>
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							{link.title}
						</a>
						<p>{link.description}</p>
					</li>
				))}
			</ul>
		</div>
	)
}

export default AddPolisTopic
