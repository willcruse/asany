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

class workoutSelector extends React.Component {

    constructor() {
        super()
        this.state = []
        this.useAddFadeIn = this.useAddFadeIn.bind(this)
    }

    componentDidMount() {
        var tempFadeIns = workouts.map(() => false);
        console.log(tempFadeIns)
        this.setState(tempFadeIns);
        setTimeout(this.useAddFadeIn, 700);
    }

    useAddFadeIn() {
        console.log(this.state);
        for (const [key, value] of Object.entries(this.state)) {
            console.log(key);
            if(!this.state[key]) {
                var temp = this.state
                temp[key] = true
                this.setState(temp)
                setTimeout(this.useAddFadeIn, 100);
                break
            }
        }
    }

    render() {

        const workoutCards = workouts.map((workout, index) => 
            <Col sm="6" lg="4">
                <Fade in={this.state[index]}>
                    <Card style={{ maxWidth: "300px", marginRight: "20px", marginLeft: "20px", marginBottom: "40px" }}>
                        <CardImg top src={workout.imageURL} style={{maxHeight: "200px"}} />
                        <CardBody>
                            <CardTitle>{workout.name}</CardTitle>
                            <p>{workout.description}</p>
                            <Button>View &rarr;</Button>
                        </CardBody>
                    </Card>
                </Fade>
            </Col>
        )

        return (
            <Container>
                <Row>
                    {workoutCards}
                </Row>
            </Container>
        )
    }

  }

  export default workoutSelector;
  