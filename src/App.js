import React from 'react'
import ReactDOM from 'react-dom'
import {
  Navbar,
  NavbarBrand,
  Container,
  Row,
  Col
} from "shards-react";
import CameraStream from "./CameraStream.js";
import PoseSelector from "./PoseSelector.js";
import Participants from "./Participants.js";
import Header from "./Header.js";
import "./app.css";

function App() {

  const poses = [
    {"name": "pose1", "id": 1},
    {"name": "pose2", "id": 2},
    {"name": "pose3", "id": 3}
  ];

  return (
    <div>
      <Header></Header>
      <Container fluid style={{margin: '1rem'}}>
        <Row> {/* Must have a Row before we can use a column */}
          {/* <Col><PoseSelector poses={poses} /></Col>
          <Col><Participants /></Col>
          <Col><CameraStream /></Col> */}
        </Row>
      </Container>
    </div>
  );
}

export default App;
