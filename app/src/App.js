import React, { useEffect, useState } from 'react'
import Polis from './components/Polis'
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import AddPolisTopic from './components/AddPolisTopic'
import Threads from './components/Threads'

function App() {
    const [message, setMessage] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);
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
			<div className="Threads test">
				<Threads threads={threadsData} />
			</div>
			<div clasNane='login-logout'>
				{loggedInUser ? ( 
					<LogoutForm onLogout={() => setLoggedInUser(null)} loggedInUser={loggedInUser} />
				) : (
					<LoginForm onLoginSuccess={setLoggedInUser} /> // Pass setter function
				)}
			</div>
			<div className="polis-polls">
				<Polis conversationId={'5zjcfnwtkf'} />
				<Polis conversationId={'3utfdkbn45'} />
			</div>
			<h1>{polisThreads.url}</h1>
			<AddPolisTopic />
		</div>
	)
}

export default App
