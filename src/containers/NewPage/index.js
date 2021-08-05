import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import linearCategories from "../../helpers/linearCategory";
import { createPage } from "../../actions/page.action";

const NewPage = (props) => {
  const [createModal, setCreateModal] = useState(false);
  const category = useSelector((state) => state.category);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState('');
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch(); 

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  const handleBannerImages = (e) => {
    console.log(e);
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  };

  const onCategoryChange = (e) => {
    const category = categories.find(category => category.value == e.target.value);
    console.log(category)
    setCategoryId(category.value);
    setType(category.type);
  }

  const submitPageForm = () => {

    if (title === "") {
      alert('Title is required');
      setCreateModal(false);
      return;
    }
    const form = new FormData()
    form.append('title', title);
    form.append('description', desc);
    form.append('category', categoryId);
    form.append('type', type);
    banners.forEach(banner => {
      form.append('banners', banner)
    })

    products.forEach(product => {
      form.append('products', product)
    })

    dispatch(createPage(form))
    setCreateModal(false);

  }

  const renderCreatePageModal = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={"Create New Page"}
        handleClose={() => setCreateModal(false)}
        handleSubmit={submitPageForm}
      >
        <Container>
          <Row>
            <Col>
              <select
                className="form-control form-control-sm"
                value={categoryId}
                onChange={onCategoryChange}
              >
                <option value="">select category</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={"Page Title"}
                className={"form-control form-control-sm"}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={"Page Desc"}
                className={"form-control form-control-sm"}
              />
            </Col>
          </Row>

          {banners.length > 0
              ? banners.map((banner, index) => (
                  <Row key={index}>
                    <Col>{banner.name}</Col>
                  </Row>
                ))
              : null}

          <Row>
            <Col>
              <Input
                className={"form-control form-control-sm"}
                type={"file"}
                name={"banners"}
                onChange={handleBannerImages}
              />
            </Col>
          </Row>

          {banners.length > 0
              ? products.map((product, index) => (
                  <Row key={index}>
                    <Col>{product.name}</Col>
                  </Row>
                ))
              : null}

          <Row>
            <Col>
              <Input
                className={"form-control form-control-sm"}
                type={"file"}
                name={"products"}
                onChange={handleProductImages}
              />
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  };
  return (
    <Layout sidebar>
      {renderCreatePageModal()}
      <button onClick={() => setCreateModal(true)}>Create Page</button>
    </Layout>
  );
};

export default NewPage;
