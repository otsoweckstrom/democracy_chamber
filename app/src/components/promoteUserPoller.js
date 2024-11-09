import React, { useState } from 'react';

const PromoteUserPoller = ({loggedInUser}) => {
    const [usernameToPromote, setUsernameToPromote] = useState('');
    const [promotionMessage, setPromotionMessage] = useState(null);

    const handlePromote = async () => {
        setPromotionMessage(null); // Clear any previous messages

        if (loggedInUser == null || !loggedInUser.isAdmin) {
            setPromotionMessage('You do not have permission to promote users.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/addpoller`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isAdmin: loggedInUser.isAdmin, userToPromote: usernameToPromote }),
            });

            if (response.ok) {
                setPromotionMessage('User promoted successfully!');
                setUsernameToPromote('');
            } else {
                const errorData = await response.json();
                setPromotionMessage(`Error: ${errorData.message || 'Failed to promote user.'}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            setPromotionMessage('Network error. Please try again later.');
        }
    };



    return (
        <div>
            {(loggedInUser !== null && loggedInUser.isAdmin) && (
                <div>
                    <h2>Promote User</h2>
                    <input
                        type="text"
                        placeholder="Username to promote"
                        value={usernameToPromote}
                        onChange={e => setUsernameToPromote(e.target.value)}
                    />
                    <button onClick={handlePromote} disabled={!usernameToPromote}>Promote</button>
                    {promotionMessage && <p>{promotionMessage}</p>} {}
                </div>
            )}
        </div>
    );
};

export default PromoteUserPoller;