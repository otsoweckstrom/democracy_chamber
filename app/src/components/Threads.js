// Threads.js
import React, { useEffect, useState } from 'react'
import Thread from './Thread'
import '../styles/threads.css'


const Threads = () => {
	const [threads, setThreads] = useState([]) 

	useEffect(() => {

		// Fetch threads from the backend
		const fetchThreads = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/api/threads`
				)
				if (!response.ok) throw new Error('Failed to fetch threads')
				const data = await response.json()
				setThreads(data)
				console.log(threads)
			} catch (error) {
				console.log(`${process.env.REACT_APP_API_URL}/api/threads`)
				console.error('Error fetching Threads:', error)
			}
		}

		fetchThreads()
	}, [])

	return (
		<div className="threads">
			{threads.map((thread) => (
				<div key={thread._id}>
					<h1>{ thread.topic }</h1>
					<p>{ thread.description }</p>
					<p>{ thread.createdAt} </p>
				</div>
			))}
		</div>
	)
}

export default Threads
