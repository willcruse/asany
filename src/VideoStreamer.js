import React, {useState, useEffect} from "react";
import {
  Row,
  Col,
  Container
} from "shards-react";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';

const SERVER_ADDRESS = 'https://asany-htn.nw.r.appspot.com'

function VideoStreamer(props){

  const [error, setError] = useState(null);
  const [connection, setConnection] = useState('Connecting');
  const [publishVideo, setPublishVideo] = useState(true);

  const [sessionID, setSessionID] = useState(props?.sessionID);
  const [token, setToken] = useState(props?.token);

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
        {sessionID && token ?
          <OTSession
            apiKey={props.apiKey}
            sessionId={props.sessionID}
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
          </OTSession> :
          <></> /* // TODO: Add Loading Screen */}
    </Container>
  )
}

VideoStreamer.defaultProps = {
  apiKey: '47084744',
  sessionID: false,
  token: false,
  setWorkoutID: () => {console.warn("Not implemented");}
}

export default VideoStreamer;
