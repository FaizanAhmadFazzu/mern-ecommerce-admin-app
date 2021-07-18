import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";

import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import { addProduct } from "../../actions/product.action";

const Products = () => {
  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const category = useSelector((state) => state.category);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([
        ...productPictures,
        e.target.files[0]
    ]);
  }
  

  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    const form = new FormData();
    form.append('name', name);
    form.append('price', price);
    form.append('quantity', quantity);
    form.append('description', description);
    form.append('category', categoryId);

    for (let pic of productPictures) {
        form.append('productPicture', pic)
    }

    dispatch(addProduct(form))


    setShow(false);
  };
  
  const handleClose = () => {
    setShow(false);
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Product</h3>
              <button className="btn btn-success" onClick={handleShow}>
                Add
              </button>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"Prodcut Name"}
          />
          <Input
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder={"Quantity"}
          />
          <Input
            label="Price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
            placeholder={"Price"}
          />
          <Input
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={"Description"}
          />
          <select
            className="form-control"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option>select category</option>
            {createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          {
              productPictures.length > 0 ? productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
          }
          <input type="file" name="productPicture" onChange={handleProductPictures} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Products;
