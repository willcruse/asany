import {
  useRef,
  useEffect
} from "react";

import {
  Container
} from "shards-react";

function CameraStream({videoWidth, videoHeight}) {

  const videoComponent = useRef(null);

  useEffect(() => { // Called when videoComponent is changed
    if (videoComponent.current != null) {
      async function videoLoader() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Browser API navigator.mediaDevices.getUserMedia not available');
        }
        console.log(videoComponent.current)
        const video = videoComponent.current;
        video.width = videoWidth;
        video.height = videoHeight;

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: 'user',
            width: videoWidth,
            height: videoHeight
          }
        })

        video.srcObject = stream;

        const videoPlayer = new Promise(resolve => {
          video.onloadedmetadata = () => {
            video.play()
            resolve(video)
          }
        });
        videoPlayer.then(() => {})
      } catch (error) {
        throw error
      }

    }
    videoLoader()
  }
}, [videoComponent, videoWidth, videoHeight])

  return (
    <Container fluid>
      <h1>Camera</h1>
      <video
        playsInline
        ref={videoComponent}
      />
    </Container>
  );
}

export default CameraStream;
