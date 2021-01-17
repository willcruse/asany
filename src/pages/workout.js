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

class Workout extends React.Component {

    workout = {};

    // props :
    // - workoutID
    constructor(props) {
        super(props)
        this.workoutID = props.workoutID;
        this.state = {isLoading: true, stack: []}
    }

    componentDidMount() {
        // load the correct workout
        this.workout = workouts.filter((workout, index) => index==props.workoutID)[0]
        // populate the stack with poses and rests
        initStack()
    }

    initStack() {
        let reverseStack = []
        // get each pose
        referencePoses.forEach(referencePose => {
            if(this.workout.poseIds.includes(referencePose.id)) {
                reverseStack.push(referencePose);
            }
        });
        console.log(reverseStack);
    }

}

export default Workout