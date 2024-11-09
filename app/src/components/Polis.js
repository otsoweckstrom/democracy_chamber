import React, { useEffect } from 'react';

// Embed Pol.is poll using a dynamic conversationId and height/width customization
const Polis = ({ conversationId, height = "600px", width = "100%" }) => {
  useEffect(() => {
    // Dynamically load Pol.is embed script when the component is mounted
    const script = document.createElement('script');
    script.src = 'https://pol.is/embed.js';
    script.async = true;
    document.body.appendChild(script);
  }, []); // Run once on mount

  return (
    <div className="polis-embed-container" style={{ width, height }}>
      <div
        className="polis"
		    data-ucv="true"
		    data-ucw="false"
		    data-ucsf="true"
		    data-xid="true"
		    data-x_profile_image_url="true"
		    data-build="false"
        data-conversation_id={conversationId} // Use the dynamic conversation ID
        style={{ width: '30%', height: '30%' }}
      />
    </div>
  );
};

export default Polis;

