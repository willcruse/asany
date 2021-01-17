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
    Form,
    FormGroup,
    FormInput,
  } from "shards-react";
import workouts from "../workouts"
import referencePoses from "../referencePoses"
import rfdc from 'rfdc';
const clone = rfdc();

class Lobby extends React.Component {

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
        console.log(newState);
        this.setState({poses: newState});
    }

    render() {

        const poses = this.state.poses.map((pose, index) =>
            <li>{pose.name}</li>
        )

        return(
            <Container style={{marginTop: "80px", marginBottom: "100px"}}>
              <Row>
                  <Fade>
                    <Col>
                      <Button onClick={this.props.goBack} style={{marginBottom: "20px"}}>&larr; Back</Button>
                      <h1>{this.workoutName}</h1>
                      <p><b>{this.workoutDesc}</b></p>
                      <p>This workout contains the following poses : </p>
                      <ul>
                          {poses}
                      </ul>
                      <Button onClick={this.props.navigateAway} style={{marginTop: "20px"}}>Start &rarr;</Button>
                    </Col>
                  </Fade>
                </Row>
            </Container>
        )
    }

}



export default Lobby;
