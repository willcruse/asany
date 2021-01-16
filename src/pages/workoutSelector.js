import React from 'react'
import {
    Fade,
    Card,
    CardTitle,
    CardImg,
    CardBody,
    Button,
    Container,
    Row,
    Col
  } from "shards-react";
import workouts from "../workouts"

class workoutSelector extends React.Component {

    constructor(props) {
        super(props)
        this.settings = props.settings;
        this.goToLobby = props.goToLobby;
        this.state = []
        this.useAddFadeIn = this.useAddFadeIn.bind(this)
    }

    componentDidMount() {
        var tempFadeIns = workouts.map(() => false);
        this.setState(tempFadeIns);
        setTimeout(this.useAddFadeIn, 700);
    }

    useAddFadeIn() {
        for (const [key, value] of Object.entries(this.state)) {
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
            <Col key={index} sm="6" lg="4">
                <Fade in={this.state[index]}>
                    <Card style={{ maxWidth: "300px", marginRight: "20px", marginLeft: "20px", marginBottom: "40px" }}>
                        <CardImg top src={workout.imageURL} style={{maxHeight: "200px"}} />
                        <CardBody>
                            <CardTitle>{workout.name}</CardTitle>
                            <p>{workout.description}</p>
                            <Button onClick={() => {this.goToLobby(index)}}>View &rarr;</Button>
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
                <Row>
                <Col><Button onClick={this.settings}>Settings</Button></Col>
                </Row>
            </Container>
        )
    }

  }

  export default workoutSelector;
