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

function App() {

  const poses = [
    {"name": "pose1", "id": 1},
    {"name": "pose2", "id": 2},
    {"name": "pose3", "id": 3}
  ];

  return (
    <div>
      <Navbar type="dark" theme="primary" style={{marginBottom: '1rem'}}>
        <NavbarBrand>Asany</NavbarBrand>
      </Navbar>
      <Container fluid style={{margin: '1rem'}}>
        <Row> {/* Must have a Row before we can use a column */}
          <Col>
            <Row><PoseSelector poses={poses} /></Row>
            <Row><Participants /></Row>
          </Col>
          <Col><CameraStream /></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
