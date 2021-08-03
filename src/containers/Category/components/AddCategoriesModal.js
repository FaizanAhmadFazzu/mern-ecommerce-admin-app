import React from "react";

import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";
import { Col, Row } from "react-bootstrap";

const AddCategoriesModal = (props) => {
  const {
    show,
    modalTitle,
    handleClose,
    handleSubmit,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    categoryList,
    handleCategoryImage,
  } = props;
  return (
    <Modal
      show={show}
      modalTitle={modalTitle}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    >
      <Row>
        <Col>
          <Input
            value={categoryName}
            placeholder={"Category Name"}
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-control-sm"
          />
        </Col>
        <Col>
          <select
            className="form-control"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
            className="form-control-sm"
          >
            <option>select category</option>
            {categoryList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>

      <Row>
        <Col>
          <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
          ></input>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddCategoriesModal;
