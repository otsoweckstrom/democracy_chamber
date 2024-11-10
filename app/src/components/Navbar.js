// Navbar.js
import React, { useState } from 'react'
import '../styles/navbar.css'

const Navbar = ({ onTabChange }) => {
	const handleTabClick = (tab) => {
		onTabChange(tab)
	}

	return (
		<nav className="navbar">
			<div className="navbar-buttons">
				<button onClick={() => handleTabClick('polis')}>Polis</button>
				<div className="separator"></div> {/* Separator line */}
				<button onClick={() => handleTabClick('threads')}>
					Threads
				</button>
			</div>
		</nav>
	)
}

export default Navbar
