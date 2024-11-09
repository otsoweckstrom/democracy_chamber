import React, { useState } from 'react'

import '../styles/navbar.css'

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)

	const handleToggle = () => {
		setIsOpen(!isOpen)
	}

	return (
		<nav className="navbar">
			<ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
				<li>
					<a href="#home">Home</a>
				</li>
				¨
			</ul>
			<div className="profile-logo"></div>
			<div className="navbar-toggle" onClick={handleToggle}>
				<span className="bar"></span>
				<span className="bar"></span>
				<span className="bar"></span>
			</div>
		</nav>
	)
}

export default Navbar
