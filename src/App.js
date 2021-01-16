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
  return (
    <div>
      <Navbar type="dark" theme="primary" style={{marginBottom: '1rem'}}>
        <NavbarBrand>Asany</NavbarBrand>
      </Navbar>
      <Container fluid>
        <Row> {/* Must have a Row before we can use a column */}
          <Col>
            <Row><PoseSelector /></Row>
            <Row><Participants /></Row>
          </Col>
          <Col><CameraStream /></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
