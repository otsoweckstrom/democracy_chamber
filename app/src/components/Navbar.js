import React, { useState } from 'react'

import tenor from '../assets/cat.gif'
import '../styles/navbar.css'

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)

	const handleToggle = () => {
		setIsOpen(!isOpen)
	}

	return (
		<nav className="navbar">
			<ul className={`navbar-links`}>
				<li>
					<a href="#home">Home</a>
					<a>Login</a>
				</li>
			</ul>
			<div className="profile-logo">
				<img src={tenor} style={{ borderRadius: 8, height: 70 }} />
			</div>
		</nav>
	)
}

export default Navbar
