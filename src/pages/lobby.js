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

class lobby extends React.Component {

    poseIds = []

    // just takes int workoutId has a prop
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        this.poseIds = workouts.map((workout, index) => {
            if(index == this.props.workoutId) {
                this.poseIds = workout.poseIds
            }
        })
        this.getPosesList();
        console.log(this.state)
    }

    getPosesList() {
        var newState = []
        referencePoses.forEach(referencePose => {
            if(this.poseIds.includes(referencePose.id)) {
                newState.push(referencePose);
            }
        });
        this.setState(newState);
    }

    render() {
        return(
            <div>
                <h1>test</h1>
            </div>
        )
    }

}

export default lobby;