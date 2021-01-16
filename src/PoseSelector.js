import React from 'react'
import ReactDOM from 'react-dom'
import {useState, useEffect} from "react";

import {
  Container,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "shards-react";

function PoseSelector({poses}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("foo");

  useEffect(() => {
    if (poses.length > 0) {
      setSelected(poses[0]);
    }
  }, [poses])


  return (
    <Container>
      <Row><h1>Pose</h1></Row>
      <Row>
        <Dropdown open={open} toggle={(event) => {
            if (open) {
              setSelected(poses[Number(event.target.value)])
            }
            setOpen(!open)}
          }>
          <DropdownToggle>{selected?.name}</DropdownToggle>
          <DropdownMenu>
            {poses.map((val, index) => <DropdownItem key={val.id} value={index}>{val?.name}</DropdownItem>)}
          </DropdownMenu>
        </Dropdown>
      </Row>

    </Container>
  );
}

PoseSelector.defaultProps = {
  poses: []
}

export default PoseSelector;
