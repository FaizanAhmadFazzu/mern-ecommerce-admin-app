import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";

import { Col, Container, Row, Table } from "react-bootstrap";
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
  const product = useSelector((state) => state.product);
  console.log('product', product)
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
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form));

    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  const renderProducts = () => {
    return (
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Product Pictures</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0 ? (
            product.products.map((product) => (
              <tr key={product._id}>
                <td>1</td>
                <td>{ product.name }</td>
                <td>{ product.price }</td>
                <td>{ product.quantity }</td>
                <td>{ product.description }</td>
                <td> - </td>
              </tr>
            ))
          ) : (
            <p>No Products Available!</p>
          )}
          {/* <tr>
            <td>1</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr> */}
        </tbody>
      </Table>
    );
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
        <Row>
          <Col md={12}>{renderProducts()}</Col>
        </Row>
      </Container>
      <Modal
        show={show}
        modalTitle={"Add New Product"}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      >
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
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          name="productPicture"
          onChange={handleProductPictures}
        />
      </Modal>
    </Layout>
  );
};

export default Products;
