import React from "react";

import { Modal, Button } from "react-bootstrap";

const NewModal = (props) => {
  console.log("new Modal", props)
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{ props.modalTitle }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { props.children }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewModal;