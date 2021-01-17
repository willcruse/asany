import React from 'react'
import ReactDOM from 'react-dom'
import {
  useRef,
  useEffect,
  useState,
} from "react";

import {
  Container
} from "shards-react";

import * as posenet from '@tensorflow-models/posenet';
import '@tensorflow/tfjs-backend-webgl';
import {getPoseScore} from './utils/poseDifference.js';
import referencePoses from './referencePoses.js';

function CameraStream(props) {

  const {videoWidth, videoHeight, modelName} = props;

  const videoComponent = useRef(null);
  const canvasComponent = useRef(null);

  const [model, updateModel] = useState(null);
  const [ready, setReady] = useState(false);

  let interval = null;

  useEffect(() => { // Called when videoComponent is changed
    if (videoComponent.current != null) {
      async function videoLoader() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Browser API navigator.mediaDevices.getUserMedia not available');
        }
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
          video.onloadeddata = () => {
            video.play()
            resolve(video)
          }
        });
        videoPlayer.then(() => {});
        setReady(true)
      } catch (error) {
        throw error
      }

    }
    videoLoader()
  }
}, [videoComponent, videoWidth, videoHeight])

  useEffect(() => {
    async function posenetLoader() {
      try {
        let posenet_model = await posenet.load({
          architecture: modelName,
          outputStride: props.outputStride,
          quantBytes: props.quantBytes

        });
        updateModel(posenet_model);
        console.log(`Current model is ${modelName}`);
      } catch (error) {
        console.log(error)
        throw new Error('PoseNet failed to load');
      } finally {
        // setTimeout(() => {
        //   this.setState({loading: false});
        // }, 200);
      }
    }
    posenetLoader(); // Loads PoseNet model whenever modelName changes
  }, [modelName, props.outputStride, props.quantBytes]);

  useEffect(() => {
    return () => {
      if (interval != null) {
        clearInterval(interval);
      }
    }
  }, []);

  const getPose = () => {
    const getPoseFrame = async () => {
      if (videoComponent.current != null &&
          model != null &&
          ready) {
        const {
          minPoseConfidence,
          minPartConfidence,
          showVideoCanvas,
          showPoints,
          calcDifference,
          showSkeleton,
          skeletonColor,
          skeletonLineWidth
        } = props;
        const poses = [];
        try {
          const pose = await model.estimateSinglePose(videoComponent.current, {
            video: true,
            flipHorizontal: props.flipHorizontal
          });
          poses.push(pose);

      //   if(canvasComponent.current != null){
      //     const canvasContext = canvasComponent.current.getContext('2d');
      //     canvasContext.clearRect(0, 0, videoWidth, videoHeight);
      //     canvasContext.canvas.width = videoWidth;
      //     canvasContext.canvas.height = videoHeight;
      //     if (showVideoCanvas) {
      //       canvasContext.save();
      //       canvasContext.scale(-1, 1);
      //       canvasContext.translate(-videoWidth, 0);
      //       canvasContext.drawImage(videoComponent.current, 0, 0, videoComponent.current.width, videoComponent.current.height);
      //       canvasContext.restore();
      //     }

      //     poses.forEach(({score, keypoints}) => {
      //       if (score >= minPoseConfidence) {
      //         if (showVideoCanvas && showPoints) {
      //           drawKeyPoints(
      //             keypoints,
      //             minPartConfidence,
      //             skeletonColor,
      //             canvasContext
      //           );
      //         }
      //         if (showVideoCanvas && showSkeleton) {
      //           drawSkeleton(
      //             keypoints,
      //             minPartConfidence,
      //             skeletonColor,
      //             skeletonLineWidth,
      //             canvasContext
      //           );
      //         }
      //         if (calcDifference) {
      //           // const score = getPoseScore(tpose, keypoints);
      //         }
      //       }
      //   })
      // }
      } catch (error) {
        // HACK: This isn't ideal, we only want to skip the error if the video element hasn't loaded
        console.log(error)
        return
      }
    }
    }
    interval = setInterval(getPoseFrame, 1000/props.fps);
  }

  getPose();
  return (
    <Container fluid>
      <video
        playsInline
        ref={videoComponent}
        style={props.showVideoCanvas ? {display: 'none', width: '100%'} : {transform: 'scaleX(-1)', width: '400px'}}
      />
      {props.showVideoCanvas ? <canvas ref={canvasComponent} style={{width: videoWidth, height: videoHeight}}/> : <></>}
    </Container>
  );
}

CameraStream.defaultProps = {
    videoWidth: 1280,
    videoHeight: 780,
    flipHorizontal: true,
    modelName: 'ResNet50',
    algorithm: 'single-pose',
    showVideoCanvas: false,
    showSkeleton: true,
    showPoints: true,
    calcDifference: true,
    minPoseConfidence: 0.1,
    minPartConfidence: 0.5,
    maxPoseDetections: 2,
    nmsRadius: 20,
    outputStride: 32,
    quantBytes: 2,
    imageScaleFactor: 0.45,
    skeletonColor: '#ffadea',
    skeletonLineWidth: 6,
    loadingText: 'Loading...please be patient...',
    fps: 1
};

function toTuple({x, y}) {
  return [x, y]
}

function drawKeyPoints(
    keypoints,
    minConfidence,
    skeletonColor,
    canvasContext,
    scale = 1,
    pointRadius = 3
  ) {
    keypoints.forEach(keypoint => {
      if (keypoint.score >= minConfidence) {
        const {x, y} = keypoint.position
        canvasContext.beginPath()
        canvasContext.arc(x * scale, y * scale, pointRadius, 0, 2 * Math.PI)
        canvasContext.fillStyle = skeletonColor
        canvasContext.fill()
      }
    })
}

function drawSegment(
  [firstX, firstY],
  [nextX, nextY],
  color,
  lineWidth,
  scale,
  canvasContext
  ) {
    canvasContext.beginPath()
    canvasContext.moveTo(firstX * scale, firstY * scale)
    canvasContext.lineTo(nextX * scale, nextY * scale)
    canvasContext.lineWidth = lineWidth
    canvasContext.strokeStyle = color
    canvasContext.stroke()
}

function drawSkeleton(
  keypoints,
  minConfidence,
  color,
  lineWidth,
  canvasContext,
  scale = 1
) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  )

  adjacentKeyPoints.forEach(keypoints => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      lineWidth,
      scale,
      canvasContext
    )
  })
}

export default CameraStream;
