import React from 'react';

const LogoutForm = ({ onLogout, loggedInUser }) => {


    const handleLogout = async () => {
        try {
            const res = await fetch('/api/logout', { method: 'POST' });
            if (res.ok) {
                onLogout();
            } else {
                const errorData = await res.json();
                console.error("Logout failed:", errorData.message);
                // Handle error
            }
        } catch (error) {
           console.error("Logout error:", error);
           // Handle network errors
        }
    };

    if (!loggedInUser) { // Don't render if not logged in
        return null;
    }

    return (
        <form onSubmit={handleLogout}> {}
            <p>Welcome, {loggedInUser}!</p>
            <button type="submit">Logout</button> {}
        </form>
    );
};

export default LogoutForm;