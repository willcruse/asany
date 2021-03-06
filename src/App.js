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
import Lobby from "./pages/lobby.js"
import WorkoutSelector from "./pages/workoutSelector.js"
import Workout from "./pages/workout.js"
import "./app.css";

const PAGES = {
  'settings': 'settings',
  'cameraStream': 'cameraStream',
  'workoutSelector': 'workoutSelector',
  'lobby': 'lobby',
  'workout': 'workout'
}

function App() {

  const [previousPage, changePreviousPage] = useState(PAGES.workoutSelector);
  const [currentPage, setCurrentPage] = useState(PAGES.workoutSelector);

  const [model, changeModel] = useState('MobileNetV1');
  const [outputStride, changeOutputStride] = useState(16);
  const [quantBytes, changeQuantBytes] = useState(4);
  const [showVideoCanvas, changeShowVideoCanvas] = useState(false);

  const [workoutID, changeWorkoutID] = useState(0);

  const navigateAway = (nextPage) => {
    changePreviousPage(currentPage);
    setCurrentPage(nextPage);
  }

  const goBack = () => {
    navigateAway(previousPage);
  }

  const goToLobby = (workoutID) => {
    changeWorkoutID(workoutID);
    navigateAway(PAGES.lobby);
  }
  return (
    <div className="page">
      <Header currentPage={currentPage}></Header>
      {/* HACK: Temp Page changer for debug */}
      {/* <Row>
        <Col>
          <Form>
            <FormGroup>
              <label htmlFor="#app-page">DEGUB BAR</label>

              <FormSelect value={currentPage} onChange={(event) => {navigateAway(event.target.value)}}>
                <option value={PAGES.workoutSelector}>{PAGES.workoutSelector}</option>
                <option value={PAGES.settings}>{PAGES.settings}</option>
                <option value={PAGES.cameraStream}>{PAGES.cameraStream}</option>
                <option value={PAGES.lobby}>{PAGES.lobby}</option>
              </FormSelect>
            </FormGroup>
          </Form>
        </Col>
        </Row> */}
        {
          currentPage == PAGES.workoutSelector ? <Row><WorkoutSelector settings={() => navigateAway(PAGES.settings)} goToLobby={goToLobby}/></Row> : <></>
        }
      {currentPage == PAGES.settings ? <Row>
        <Settings
          changeModel={changeModel}
          changeOutputStride={changeOutputStride}
          changeQuantBytes={changeQuantBytes}
          changeShowVideoCanvas={changeShowVideoCanvas}
          initialModel={model}
          initialOutputStride={outputStride}
          initialQuantBytes={quantBytes}
          initialShowVideoCanvas={showVideoCanvas}
          goBack={goBack}
        />
      </Row> : <></>
      }
      {
        currentPage == PAGES.lobby ? <Row>
          <Lobby workoutID={workoutID} goBack={goBack} navigateAway={() => navigateAway(PAGES.workout)}></Lobby>
          </Row>
          : <></>
      }
      {
        currentPage == PAGES.workout ? <Row>
          <Workout workoutID={workoutID}
          modelName={model}
          outputStride={outputStride}
          quantBytes={quantBytes}
          showVideoCanvas={showVideoCanvas}
          goBack={goBack}>
          </Workout>
          </Row> : <></>
      }
      {
        currentPage == PAGES.cameraStream ? <Row>
        <CameraStream
          modelName={model}
          outputStride={outputStride}
          quantBytes={quantBytes}
          showVideoCanvas={showVideoCanvas}
        />
        </Row> : <></>
      }
    </div>
  );

}

export default App;
