import React, { useState } from 'react'

const ThreadForm = () => {
	const [topic, setTopic] = useState('')
	const [description, setDescription] = useState('')
	const [vote, setVote] = useState('')
	const [error, setError] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()
		// Handle form submission logic here
		const endpoint = `${process.env.REACT_APP_API_URL}/api/new_thread`
		console.log({ topic, description, vote })

		try {
			const response = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ topic, description }),
			})

			if (response.ok) {
				console.log('Registration successful:')
			} else {
				const errorData = await response.json()
				setError(errorData.message)
			}
		} catch (err) {
			console.error('AaAAAAAAAAA:', err)
			setError('Network error. Please try again later.')
		}
	}
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="topic">Topic:</label>
				<input
					type="text"
					id="topic"
					value={topic}
					onChange={(e) => setTopic(e.target.value)}
					required
				/>
			</div>
			<div>
				<label htmlFor="description">Description:</label>
				<textarea
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
			</div>
			<div>
				<label>Poll:</label>
				<div>
					<input
						type="radio"
						id="upvote"
						name="vote"
						value="upvote"
						checked={vote === 'upvote'}
						onChange={(e) => setVote(e.target.value)}
					/>
					<label htmlFor="upvote">Upvote</label>
				</div>
				<div>
					<input
						type="radio"
						id="downvote"
						name="vote"
						value="downvote"
						checked={vote === 'downvote'}
						onChange={(e) => setVote(e.target.value)}
					/>
					<label htmlFor="downvote">Downvote</label>
				</div>
			</div>
			<button type="submit">Submit</button>
		</form>
	)
}

export default ThreadForm
