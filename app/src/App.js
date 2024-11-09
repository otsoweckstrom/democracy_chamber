import React, { useEffect, useState } from 'react'
import Polis from './components/Polis'
import "./App.css";
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';

function App() {
    const [message, setMessage] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);

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
			<h1>{"lorem ipsum"}</h1>
			<div className='polis-polls'>
				<Polis conversationId={"5zjcfnwtkf"} />
				<Polis conversationId={"3utfdkbn45"} />
			</div>
			<div clasNane='login-logout'>
				{loggedInUser ? ( 
					<LogoutForm onLogout={() => setLoggedInUser(null)} loggedInUser={loggedInUser} />
				) : (
					<LoginForm onLoginSuccess={setLoggedInUser} /> // Pass setter function
				)}
			</div>
		</div>
	)
}

export default App
