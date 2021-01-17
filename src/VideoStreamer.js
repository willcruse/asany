import React, {useState} from "react";
import {
  Row,
  Col,
  Container
} from "shards-react";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';

function VideoStreamer({ apiKey, sessionId, token }){

  const [error, setError] = useState(null);
  const [connection, setConnection] = useState('Connecting');
  const [publishVideo, setPublishVideo] = useState(true);

  const sessionEventHandlers = {
    sessionConnected: () => {
      setConnection('Connected');
    },
    sessionDisconnected: () => {
      setConnection('Disconnected');
    },
    sessionReconnected: () => {
      setConnection('Reconnected');
    },
    sessionReconnecting: () => {
      setConnection('Reconnecting');
    },
  };

  const publisherEventHandlers = {
      accessDenied: () => {
        console.log('User denied access to media source');
      },
      streamCreated: () => {
        console.log('Publisher stream created');
      },
      streamDestroyed: ({ reason }) => {
        console.log(`Publisher stream destroyed because: ${reason}`);
      },
    };

    const subscriberEventHandlers = {
      videoEnabled: () => {
        console.log('Subscriber video enabled');
      },
      videoDisabled: () => {
        console.log('Subscriber video disabled');
      },
    };

    const onSessionError = error => {
      setError(error);
    };

    const onPublish = () => {
      console.log('Publish Success');
    };

    const onPublishError = error => {
      setError(error);
    };

    const onSubscribe = () => {
      console.log('Subscribe Success');
    };

    const onSubscribeError = error => {
      setError(error);
    };

    const toggleVideo = () => {
      setPublishVideo(!publishVideo)
    }

  return (
    <Container>
      <div id="sessionStatus">Session Status: {connection}</div>
        {error ? (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        ) : null}
        <OTSession
          apiKey={apiKey}
          sessionId={sessionId}
          token={token}
          onError={onSessionError}
          eventHandlers={sessionEventHandlers}
        >
          <button id="videoButton" onClick={toggleVideo}>
              {publishVideo ? 'Disable' : 'Enable'} Video
          </button>
          <OTPublisher
            properties={{ publishVideo, width: 50, height: 50, }}
            onPublish={onPublish}
            onError={onPublishError}
            eventHandlers={publisherEventHandlers}
          />
          <OTStreams>
            <OTSubscriber
              properties={{ width: 100, height: 100 }}
              onSubscribe={onSubscribe}
              onError={onSubscribeError}
              eventHandlers={subscriberEventHandlers}
            />
          </OTStreams>
        </OTSession>
    </Container>
  )
}

VideoStreamer.defaultProps = {
  apiKey: '47084744',
  sessionId: '1_MX40NzA4NDc0NH5-MTYxMDg0MzYyMDc1NH5CLzVtQ2MxcW0xUS9jODVyeDIydW5meml-UH4',
  token: 'T1==cGFydG5lcl9pZD00NzA4NDc0NCZzaWc9MmQ3OTkyN2U2YTg1OTE3ZGYwODRiNTRkYTEyMTI4N2Y2MDkyNDYwZTpzZXNzaW9uX2lkPTFfTVg0ME56QTRORGMwTkg1LU1UWXhNRGcwTXpZeU1EYzFOSDVDTHpWdFEyTXhjVzB4VVM5ak9EVnllREl5ZFc1bWVtbC1VSDQmY3JlYXRlX3RpbWU9MTYxMDg0MzYyMCZleHBpcmVfdGltZT0xNjEwOTMwMDIwJnJvbGU9cHVibGlzaGVyJm5vbmNlPTE1MjgwOSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=='
}

export default VideoStreamer;
