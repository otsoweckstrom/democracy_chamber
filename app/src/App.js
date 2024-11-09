import React, { useEffect, useState } from 'react'
import Polis from './components/Polis'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import Threads from './components/Threads'
import AddPollPage from './components/AddPollPage'

function App() {
	const [polisThreads, setPolisThreads] = useState([])
	const [loggedInUser, setLoggedInUser] = useState(null)
	const threadsData = [
		{
			id: 1,
			title: 'First Thread',
			content: 'This is the content of the first thread.',
		},
		{
			id: 2,
			title: 'Second Thread',
			content: 'This is the content of the second thread.',
		},
		{
			id: 3,
			title: 'Third Thread',
			content: 'This is the content of the third thread.',
		},
	]

	useEffect(() => {
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
			<div className="Threads test">
				<Threads threads={threadsData} />
			</div>
			<div className="login-logout">
				{loggedInUser ? (
					<LogoutForm
						onLogout={() => setLoggedInUser(null)}
						loggedInUser={loggedInUser}
					/>
				) : (
					<LoginForm onLoginSuccess={setLoggedInUser} />
				)}
			</div>
			<AddPollPage />
			<Polis />
		</div>
	)
}

export default App
