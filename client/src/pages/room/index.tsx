import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Bar, VideoContainer } from './styles';

import { useSocket } from 'context/socket';
import Controls from 'components/Controls';

const Room: React.FC = () => {
  const { connect, stream, mediaAvailable } = useSocket();
  const { roomName } = useParams<{ roomName: string }>();
  const userVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    connect(roomName);
  }, [connect, roomName]);

  useEffect(() => {
    if(stream && userVideo.current) {
      userVideo.current.srcObject = stream;
    }
  }, [stream])

  return (
    <Container>
      <Bar>
        <h1>Room - {roomName}</h1>
      </Bar>

      <VideoContainer>
        {mediaAvailable.video ? (
          <video 
            playsInline 
            muted 
            ref={userVideo} 
            autoPlay 
            />
        ): (
          <h1>Thumb video</h1>
        )}
      
      </VideoContainer>

      <Controls />
    </Container>
  )
}

export default Room;
