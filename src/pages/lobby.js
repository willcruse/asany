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
    Col
  } from "shards-react";
import workouts from "../workouts"
import referencePoses from "../referencePoses"
import rfdc from 'rfdc';
const clone = rfdc();

class lobby extends React.Component {



    // props :
    // - workoutID
    // - goback
    // - navigateAway
    constructor(props) {
        super(props)
        this.workoutID = props.workoutID;
        this.workoutName = ""
        this.goBack = props.goBack;
        this.poseIds = []
        this.state = {poses: []}
    }
    
    componentDidMount() {
        console.log(this.workoutID)
        workouts.forEach((workout, index) => {
            if(index == this.workoutID) {
                this.workoutName = workout.name;
                this.workoutDesc = workout.description;
                this.poseIds = clone(workout.poseIds);
                return
            }
        })
        this.getPosesList();
    }

    getPosesList() {
        var newState = []
        referencePoses.forEach(referencePose => {
            if(this.poseIds.includes(referencePose.id)) {
                newState.push(referencePose);
            }
        });
        this.setState({poses: newState});
    }

    render() {

        const poses = this.state.poses.map((pose, index) =>
            <li>{pose.name}</li>
        )

        return(
            <Container style={{marginTop: "80px", marginBottom: "100px"}}>
                <Fade>
                    <Button onClick={this.props.goBack} style={{marginBottom: "20px"}}>&larr; Back</Button>
                    <h1>{this.workoutName}</h1>
                    <p><b>{this.workoutDesc}</b></p>
                    <p>This workout contains the following poses : </p>
                    <ul>
                        {poses}
                    </ul>
                </Fade>
            </Container>
        )
    }

}

export default lobby;