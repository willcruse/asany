import React, {useState} from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormSelect,
} from "shards-react";
import Header from "./Header.js";
import Settings from "./pages/settings.js";
import CameraStream from "./CameraStream.js";
import WorkoutSelector from "./pages/workoutSelector.js"
import "./app.css";

const PAGES = {
  'settings': 'settings',
  'cameraStream': 'cameraStream',
  'workoutSelector': 'workoutSelector'
}

function App() {

  const [currentPage, setCurrentPage] = useState(PAGES.workoutSelector);
  const [model, changeModel] = useState('ResNet50');
  const [outputStride, changeOutputStride] = useState(16);
  const [quantBytes, changeQuantBytes] = useState(4);

  return (
    <div className="page">
      <Header></Header>
      <Row>
        <Col>
          {/* HACK: Temp Page changer for debug */}
          <Form>
            <FormGroup>
              <label htmlFor="#app-page">DEGUB BAR</label>
              <FormSelect onChange={(event) => {setCurrentPage(event.target.value)}}>
              <option value={PAGES.workoutSelector}>{PAGES.workoutSelector}</option>
                <option value={PAGES.settings}>{PAGES.settings}</option>
                <option value={PAGES.cameraStream}>{PAGES.cameraStream}</option>
              </FormSelect>
            </FormGroup>
          </Form>
        </Col>
        </Row>
        {
          currentPage == PAGES.workoutSelector ? <Row><WorkoutSelector /></Row> : <></>
        }
      {currentPage == PAGES.settings ? <Row>
        <Settings
          changeModel={changeModel}
          changeOutputStride={changeOutputStride}
          changeQuantBytes={changeQuantBytes}
          initialModel={model}
          initialOutputStride={outputStride}
          initialQuantBytes={quantBytes}
        />
      </Row> : <></>}
      {currentPage == PAGES.cameraStream ? <Row>
        <CameraStream modelName={model} outputStride={outputStride} quantBytes={quantBytes}/>
      </Row> : <></>}
    </div>
  );

}

export default App;
