import React from 'react';

const VideoPlayer: React.FC = () => {
    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <video 
                width="100%" 
                height="auto" 
                autoPlay 
                muted 
                loop 
                playsInline
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            >
                <source src="../src/images/main.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '0',
                transform: 'translateY(-50%)',
                color: 'white',
                fontSize: '66px', 
                textAlign: 'left',
                padding: '10px 20px',
                fontWeight: 'bold',
                fontFamily: 'cursive'
            }}>
                A refugee's journey speaks volumes of courage, determination, and resilience.
            </div>
        </div>
    );
};

export default VideoPlayer;
