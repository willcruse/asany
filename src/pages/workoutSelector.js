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
import {SERVER_ADDRESS} from "../config.js"

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
                            <p>{workout.shortDescription}</p>
                            <Button onClick={() => {this.goToLobby(index)}}>View &rarr;</Button>
                        </CardBody>
                    </Card>
                </Fade>
            </Col>
        )

        return (
            <Container style={{paddingBottom: "100px"}}>
                <Row>
                    {workoutCards}
               </Row>
               <Row>
                    <SocialSetup
                      sessionID={this.props.sessionID}
                      setSessionID={this.props.setSessionID}
                      setToken={this.props.setToken}
                      setWorkoutID={this.props.setWorkoutID}
                    />
                </Row>
                <Row>
                <Col><Button style={{marginLeft: "20px"}} onClick={this.settings}>Settings</Button></Col>
                </Row>
            </Container>
        )
    }

  }

  function SocialSetup({sessionID, setSessionID, setToken, setWorkoutID}) {

    const [tempSessionID, setTempSessionID] = useState("");

    const startNewSession = () => {
      fetch(SERVER_ADDRESS + '/new-session', {
        mode: 'cors',
      }).then((resp) => {
          return resp.json()
        }).then((json) => {
          if (json?.error != undefined) {
            throw Error(json.error)
          } else if (json?.sessionID != null) {
            setSessionID(json.sessionID)
            getToken(json.sessionID);
          }
        }).catch((err) => {
          console.warn(err)
        });
    }

    const getToken = (id) => {
      fetch(SERVER_ADDRESS + '/get-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({'sessionID': id})
      }).then((resp) => {
        return resp.json()
      }).then((json) => {
        if (json?.error != undefined) {
          throw Error(json.error)
        } else if (json?.token != null) {
          console.log(json.token)
          setToken(json.token);
        }
        if (json?.workoutID != null) {
          this.props.setWorkoutID(json.workoutID);
        }
      }).catch((err) => {
        console.warn(err)
      });
    }

    if (sessionID == null) {
      return (
        <Container style={{paddingBottom: "100px"}}>
          <Card style={{ maxWidth: "500px", marginRight: "20px", marginLeft: "20px", marginBottom: "40px"}}>
            <CardHeader>Invite People</CardHeader>
            <Row style={{margin: "10px"}}>
              <Col>
                <Form>
                  <FormGroup>
                    <label htmlFor="#lobby-join">Session ID</label>
                    <FormInput
                        id="#lobby-join"
                        type="text"
                        onChange={(event) => {setTempSessionID(event.target.value)}}
                        value={tempSessionID}
                    />
                  </FormGroup>
                </Form>
              </Col>
            </Row>
            <Row style={{margin: "10px"}}>
              <Col>
                <Button onClick={() => {setSessionID(tempSessionID); getToken(tempSessionID)}}>Join</Button>
              </Col>
              <Col>
                <Button onClick={startNewSession}>Start Session</Button>
              </Col>
            </Row>
          </Card>
        </Container>
      )
    }

    return (
      <Container>
        <Card>
          <CardHeader>Invite People</CardHeader>
          <CardBody>{sessionID}</CardBody>
        </Card>
      </Container>
    )
  }

  export default workoutSelector;
