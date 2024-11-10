import React, { useEffect, useState } from 'react';
import Polis from './components/Polis';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import AddPollPage from './components/AddPollPage';
import PromoteUserPoller from './components/promoteUserPoller';
import ThreadForm from './components/ThreadForm';
import Navbar from './components/Navbar';
import Threads from './components/Threads';

function App() {
    const [polisThreads, setPolisThreads] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [activeTab, setActiveTab] = useState('polis');


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/links`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setPolisThreads(data))
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="App">
            <Navbar onTabChange={handleTabChange} /> {/* No need for className here */}
			<div className="login-logout">
                        {loggedInUser ? (
                            <LogoutForm onLogout={() => setLoggedInUser(null)} loggedInUser={loggedInUser} />
                        ) : (
                            <LoginForm setLoggedInUser={setLoggedInUser} />
                        )}
                    </div>
                    <PromoteUserPoller loggedInUser={loggedInUser} />
                    {loggedInUser !== null && (loggedInUser.isAdmin || loggedInUser.isPoller) && <AddPollPage />}

            {activeTab === 'polis' && (
                <div>
                    <Polis />
                    {}
					</div>
            )}

			{activeTab === 'threads' && (
                <div className="Threads test">
                    <div className="Thread form">
                        <ThreadForm />
                    </div>
					<div className="Thread list">
                        <Threads />
                    </div> 
                    {/* Components ONLY for Threads tab (if any) */}
                </div>
            )}

			</div>
    );
}

export default App;