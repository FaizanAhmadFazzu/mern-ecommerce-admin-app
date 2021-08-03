import React from 'react'

import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";
import { Col, Row } from "react-bootstrap";

const DeleteCategoriesModal = (props) => {

    const {
        modalTitle,
        show,
        handleClose,
        handleSubmit,
        deleteCategories,
        expandedArray,
        checkedArray,
    } = props
    return (
      <Modal
        modalTitle={modalTitle}
        show={show}
        handleClose={() => handleClose(false)}
        handleSubmit={handleSubmit}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => alert("No"),
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategories,
          },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
        <h5>Checked</h5>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </Modal>
    );
  };

  export default DeleteCategoriesModal;