import React, { useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoCheckboxOutline,
  IoCheckbox,
  IoChevronForward,
  IoChevronDown,
  IoAdd,
  IoTrash,
  IoCloudUpload,
} from "react-icons/io5";

import Layout from "../../components/Layout";

import { useSelector, useDispatch } from "react-redux";
import {
  addCategory,
  getAllCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from "../../actions";
import UpdateCategoriesModal from "./components/UpdateCategoryModel";
import AddCategoriesModal from "./components/AddCategoriesModal";
import DeleteCategoriesModal from "./components/DeleteCategoriesModal";

import "./style.css";

const Category = () => {
  const category = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [show, setShow] = useState(false);
  const [deleteCategoriesModal, setDeleteCategoriesModal] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);

  const handleCloseUpdateCategoryModal = () => setUpdateCategoryModal(false);

  const handleSubmit = () => {
    if (categoryName === "") {
      alert("Name is required");
      return;
    }
    const form = new FormData();

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);

    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");
    //   const cat = {
    //       categoryName,
    //       parentCategoryId,
    //       categoryImage
    //   };
    //   console.log(cat)
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }

    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    console.log({ checked, expanded, categories, checkedArray, expandedArray });
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const updateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategories(form));
    setUpdateCategoryModal(false);
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoriesModal(true);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = expandedIdsArray.concat(checkedIdsArray);
    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray)).then((result) => {
        if (result) {
          dispatch(getAllCategory());
          setDeleteCategoriesModal(false);
        }
      });
    }
  };

  const categoryList = createCategoryList(category.categories);

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <div className="actionBtnContainer">
                <span>Actions: </span>
                <button onClick={handleShow}><IoAdd /> <span>Add</span></button>
                <button onClick={deleteCategory}><IoTrash /> <span>Delete</span></button>
                <button onClick={updateCategory}><IoCloudUpload /> <span>Edit</span></button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoCheckbox />,
                uncheck: <IoCheckboxOutline />,
                halfCheck: <IoCheckboxOutline />,
                expandClose: <IoChevronForward />,
                expandOpen: <IoChevronDown />,
              }}
            />
          </Col>
        </Row>
      </Container>

      {/* Add Category Modal */}
      <AddCategoriesModal
        show={show}
        modalTitle={"Add New Category"}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        parentCategoryId={setParentCategoryId}
        setParentCategoryId={setParentCategoryId}
        categoryList={categoryList}
        handleCategoryImage={handleCategoryImage}
      />

      {/* Edit Categories Modal */}
      <UpdateCategoriesModal
        show={updateCategoryModal}
        modalTitle={"Update Categories"}
        handleClose={handleCloseUpdateCategoryModal}
        handleSubmit={updateCategoriesForm}
        size={"lg"}
        expandedArray={expandedArray}
        handleCategoryInput={handleCategoryInput}
        categoryList={categoryList}
        checkedArray={checkedArray}
      />

      {/* Delete Categories Modal */}
      <DeleteCategoriesModal
        modalTitle={"Confirm"}
        show={deleteCategoriesModal}
        handleClose={setDeleteCategoriesModal}
        handleSubmit={deleteCategory}
        deleteCategories={deleteCategories}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
      />
    </Layout>
  );
};

export default Category;
