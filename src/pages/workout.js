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

class Workout extends React.Component {

    workout = {};
    interval;
    intervalTime = 10;
    currentTotalTime = 0;

    // props :
    // - workoutID
    constructor(props) {
        super(props)
        this.workoutID = props.workoutID
        this.state = {isLoading: true, stack: [], currentPose: null}
        this.initStack = this.initStack.bind(this)
        this.workoutLoop = this.workoutLoop.bind(this)
        this.getContent = this.getContent.bind(this)
    }

    componentDidMount() {
        // load the correct workout
        this.workout = workouts.filter((workout, index) => index==this.props.workoutID)[0]
        // populate the stack with poses and rests
        this.initStack()
        // start workout
        this.interval = setInterval(this.workoutLoop, this.intervalTime);
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
        this.setState({isLoading: false, stack: newStack, currentPose: null})
    }

    getContent() {
        let ret
        if (this.state.currentPose != null){
            ret = <div>
                <Progress theme="primary" value={100 - (this.state.currentPose.duration / this.currentTotalTime)*100} />
                <h1>{this.state.currentPose.name}</h1>
                <img src={this.state.currentPose.imageURL} style={{maxWidth: "400px"}}></img>
            </div>
        } else {
            ret = <div></div>
        }

        return ret
    }

    render() {

        var content = this.state.isLoading ? <h1 style={{textAlign: "center"}}>Loading...</h1> : this.getContent()

        return (
            <Container style={{marginTop: "80px"}}>
                <Fade>
                    <div className="workoutScreen">
                        {content}
                    </div>
                </Fade>
            </Container>
        )
    }

}

export default Workout