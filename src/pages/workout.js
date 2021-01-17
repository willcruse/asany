import React, { useEffect, useState } from 'react'
import {
    Fade,
    Card,
    CardHeader,
    CardTitle,
    CardImg,
    CardBody,
    CardFooter,
    Button,
    Container,
    Row,
    Col,
    Progress
  } from "shards-react";
import workouts from "../workouts"
import referencePoses from "../referencePoses"
import { math } from '@tensorflow/tfjs-core';
import CameraStream from '../CameraStream';

class Workout extends React.Component {

    workout = {};
    interval;
    intervalTime = 5;
    currentTotalTime = 0;

    // props :
    // - workoutID
    constructor(props) {
        super(props)
        this.workoutID = props.workoutID
        this.state = {isLoading: true, stack: [], currentPose: null}
        this.initStack = this.initStack.bind(this)
        this.workoutLoop = this.workoutLoop.bind(this)
        this.getNextPoseName = this.getNextPoseName.bind(this)
        this.getNextPoseImage = this.getNextPoseImage.bind(this)
    }

    componentDidMount() {
        // load the correct workout
        this.workout = workouts.filter((workout, index) => index==this.props.workoutID)[0]
        // populate the stack with poses and rests
        setTimeout(() => this.initStack(), 1000);
    }

    workoutLoop() {
        // if currentPose is null, take top of stack
        if(this.state.currentPose == null) {
            this.setState({currentPose: this.state.stack.pop()})
            this.currentTotalTime = this.state.currentPose.duration;
        }
        // decrement time
        let newCurrentPose = this.state.currentPose
        newCurrentPose.duration -= this.intervalTime

        // check if time has run out
        if(newCurrentPose.duration <= 0) {
            newCurrentPose = null
        }

        this.setState({currentPose: newCurrentPose})

    }

    initStack() {
        console.log('initing stack')
        let reverseStack = []
        // get each pose
        referencePoses.forEach(referencePose => {
            if(this.workout.poseIds.includes(referencePose.id)) {
                reverseStack.push(referencePose);
                reverseStack.push({id: -1, duration: 10000,name: "break", keypoints: []})
            }
        });
        // remove last break
        reverseStack.pop()
        let newStack = reverseStack.reverse()
        reverseStack.push({id: -1, duration: 10000, name:"Get Ready!", keypoints: []})
        this.setState({isLoading: false, stack: newStack, currentPose: null})

        // start workout
        this.interval = setInterval(this.workoutLoop, this.intervalTime);
    }

    getNextPoseName() {
        return this.state.stack[this.state.stack.length-1].name;
    }

    getNextPoseImage() {
        return this.state.stack[this.state.stack.length-1].imageURL;
    }

    render() {
        var content = <div></div>

        if (!this.state.loading && this.state.currentPose != null){
            content = 
            <div>
            <div className="custom-progress-container">
                <div className="custom-progress-bar" style={{width: Math.round(this.state.currentPose.duration/this.currentTotalTime*100)+"%"}}></div>
            </div>
            <Container style={{marginTop: "80px"}}>
            <Fade>
                <div className="workoutScreen"> 
                    <div>
                        <h1>{this.state.currentPose.name}</h1>
                        {this.state.currentPose.id == -1 ? <h4>Next is {this.getNextPoseName()}</h4> : <></>}
                        <img src={this.state.currentPose.id==-1 ? this.getNextPoseImage() : this.state.currentPose.imageURL} style={{maxWidth: "400px"}}></img>
                    </div>
                </div>
            </Fade>
            </Container>
            <CameraStream></CameraStream>
            </div>
        }

        return (<div style={{width: "100%"}}>{content}</div>)
    }

}

export default Workout