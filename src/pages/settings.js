import React, {useState} from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormSelect,
  FormCheckbox,
  Button,
} from "shards-react";

const RES_NET = 'ResNet50';
const MOBILE_NET = 'MobileNetV1';

const OUTPUT_STRIDES = {
  'ResNet50': [16, 32],
  'MobileNetV1': [8, 16, 32]
};

const QUANT_BYTES = [1, 2, 4];

function Settings(props) {

  const [tempModel, changeTempModel] = useState(props.initialModel);
  const [tempOutputStride, changeTempOutputStride] = useState(props.initialOutputStride);
  const [tempQuantBytes, changeTempQuantBytes] = useState(props.initialQuantBytes);

  const [tempShowVideoCanvas, changeTempShowVideoCanvas] = useState(props.initialShowVideoCanvas);

  const saveSettings = () => {
    props.changeModel(tempModel);
    props.changeOutputStride(tempOutputStride);
    props.changeQuantBytes(tempQuantBytes);
    props.changeShowVideoCanvas(tempShowVideoCanvas);
  };

    return(
      <Container style={{marginTop: "80px", marginBottom: "100px"}}>
        <Row><Button onClick={props.goBack} style={{marginBottom: "20px"}}> &larr;Back</Button></Row>
        <Row><ModelSettings
          changeTempModel={changeTempModel}
          changeTempOutputStride={changeTempOutputStride}
          changeTempQuantBytes={changeTempQuantBytes}
          tempModel={tempModel}
          tempOutputStride={tempOutputStride}
          tempQuantBytes={tempQuantBytes}
        /></Row>
        <Row><VideoCanvasSettings
          tempShowVideoCanvas={tempShowVideoCanvas}
          changeTempShowVideoCanvas={changeTempShowVideoCanvas}
        /></Row>
        <Row>
          <Col sm="2" lg="2"><Button onClick={saveSettings}>Save</Button></Col>
        </Row>
      </Container>
    )
}

function ModelSettings({changeTempModel, changeTempOutputStride, changeTempQuantBytes, tempModel, tempOutputStride, tempQuantBytes}) {

  if (tempModel == RES_NET && tempOutputStride == 8) {
    changeTempOutputStride(16);
  }

  return (
    <Container>
      <Row><h1>Settings</h1></Row>
      <Row>
        <Col>
          {/* Change changeModel settings */}
          <Form>
            <FormGroup>
              <label htmlFor="#settings-model">Model</label>
              <FormSelect value={tempModel} onChange={(event) => {changeTempModel(event.target.value)}}>
                <option value={RES_NET}>{RES_NET}</option>
                <option value={MOBILE_NET}>{MOBILE_NET}</option>
              </FormSelect>
            </FormGroup>
          </Form>
        </Col>
        <Col>
          {/* Change changeOutputStride settings */}
          <Form>
            <FormGroup>
              <label htmlFor="#settings-output-stride">Output Stride</label>
              <FormSelect value={tempOutputStride} onChange={(event) => {changeTempOutputStride(event.target.value)}}>
                {OUTPUT_STRIDES[tempModel].map(val => <option value={val} key={val}>{val}</option>)}
              </FormSelect>
            </FormGroup>
          </Form>
        </Col>
        <Col>
          {/* Change changeQuantBytes settings */}
          <Form>
            <FormGroup>
              <label htmlFor="#settings-quant-bytes">Quant Bytes</label>
              <FormSelect value={tempQuantBytes} onChange={(event) => {changeTempQuantBytes(event.target.value)}}>
                {QUANT_BYTES.map(val => <option value={val} key={val}>{val}</option>)}
              </FormSelect>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Row>

      </Row>
    </Container>
  )
}

function VideoCanvasSettings({tempShowVideoCanvas, changeTempShowVideoCanvas}) {

    return (
      <Container>
        <FormCheckbox
          checked={tempShowVideoCanvas}
          onChange={e => changeTempShowVideoCanvas(!tempShowVideoCanvas)}
        >Enable drawing mode</FormCheckbox>
      </Container>
    )
}

const notImplementedFunc = () => {console.warn("Not implemented")}

Settings.defaultProps = {
  'changeModel': notImplementedFunc,
  'initialModel': RES_NET,
  'changeOutputStride': notImplementedFunc,
  'initialOutputStride': 16,
  'changeQuantBytes': notImplementedFunc,
  'initialQuantBytes': 4,
  'changeShowVideoCanvas': notImplementedFunc,
  'initialShowVideoCanvas': false,
  'goBack': notImplementedFunc,
}

export default Settings;
