import React from 'react'
import '../styles/polis.css'

const Polis = () => {
	return (
		<div className="poll-container">
			<iframe
				src="https://pol.is/4in4nrryzd"
				width="100%"
				height="1000px"
				frameBorder="0"
				allowFullScreen
				title="Pol.is Conversation"
			></iframe>
			<iframe
				src="https://pol.is/53mrmhyadj"
				width="100%"
				height="1000px"
				frameBorder="0"
				allowFullScreen
				title="Pol.is Conversation"
			></iframe>
		</div>
	)
}

export default Polis
