import React, { useState, useEffect } from "react";
import Navbaar from "./Navbaar";
import { Modal, Button } from "react-bootstrap";
import { IoCloseCircle } from "react-icons/io5";
import { addnewCategory, getAllCategories, subCategory, deteleSubCat } from "../config/MyServices";
import { Accordion, AccordionSummary, AccordionDetails, Typography, } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
const regForName = RegExp(/^[a-zA-Z]/);

export default function Category() {
  const [ShowCategoryModal, setShowCategoryModal] = useState(false);
  const [state, setState] = useState({ categoryName: "", subcategoryName: "", catId: "" });
  const [categoriesDisplay, setcategoriesDisplay] = useState([])
  const [subcategoriesDisplay, setSubcategoriesDisplay] = useState([])

  useEffect(() => {
    getCategories()

  }, [])

  const getCategories = async () => {
    await getAllCategories().then(res => {
      setcategoriesDisplay(res.data.category)
    })
  }

  const addCategory = async () => {
    if (state.categoryName !== "" && regForName.test(state.categoryName)) {
      let formData = {
        categoryName: state.categoryName,
      };
      await addnewCategory(formData).then(res => {
        setcategoriesDisplay(res.data.category)
        console.log(res.data.category)
      })
      setState({ categoryName: "" })
    }
    else {
      alert("invalid category name")
    }
    setShowCategoryModal(false)
  };

  const subcategorySet = (id, data = categoriesDisplay) => {
    console.log("subcategory")
    setState({ ...state, catId: id })
    const sub = data.filter(ele =>
      ele._id === id
    )
    setSubcategoriesDisplay(sub[0].subCategory)
    console.log(sub[0].subCategory)
    console.log(sub)
  }

  const addSubCategories = async () => {
    if (state.subcategoryName !== "") {
      if (state.catId !== "") {
        let formData = {
          name: state.subcategoryName,
          categoryId: state.catId
        };
        await subCategory(formData).then(res => {
          console.log(res.data)
          setcategoriesDisplay(res.data.user)
          subcategorySet(state.catId, res.data.user)
        })
      }
      else {
        alert("please select category")
      }
    }
  }

  const deleteSubCategories = async (id) => {
    let formData = {
      categoryId: id
    };
    await deteleSubCat(formData)

  }

  const handleCloseModal = () => setShowCategoryModal(false);

  return (
    <>
      <Navbaar />
      <div className="container-fluid">
        <div className="mt-3">
          <button
            className="btn btn-dark"
            onClick={() => {
              setShowCategoryModal(true);
            }}
          >
            Add Category
          </button>

          <Accordion className="mt-3 shadowCus" defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header" >
              <Typography className="dropdown">Category</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {categoriesDisplay && categoriesDisplay.map((cat) => (
                <Typography key={cat._id}>
                  <input
                    type="radio"
                    id={cat._id}
                    name="categories"
                    value={cat._id}
                    onClick={() => subcategorySet(cat._id)}
                  />
                  &nbsp;  {cat.categoryName}
                  &nbsp; <button ><DeleteIcon /></button>
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="row mt-4">
          <div className="col-8">
            <input type="text" className="form-control" name="subcategoryName" value={state.subcategoryName}
              onChange={(event) => setState({ ...state, subcategoryName: event.target.value })} />
          </div>
          <div className="col-4">
            <button className="btn" onClick={() => addSubCategories()}>Add Sub Category</button>
          </div>
        </div>

        {/* {/ subcategory name /} */}
        <Accordion className="mt-3 shadowCus" defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header" >
            <Typography className="dropdown">Sub Category</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {subcategoriesDisplay.length > 0 ?
              subcategoriesDisplay.map((cat) => (

                <Typography key={cat._id}>
                  <input
                    type="radio"
                    value={cat._id}
                    name="subcategories"

                  />
                  &nbsp;  {cat.name}
                  &nbsp;  <DeleteIcon onClick={() => deleteSubCategories(cat._id)} />
                </Typography>
              ))
              : <Typography>
                No SubCategory
              </Typography>
            }
          </AccordionDetails>
        </Accordion>


        <Modal show={ShowCategoryModal} onHide={handleCloseModal}>
          <Modal.Header>
            <Modal.Title>Add Category</Modal.Title>
            <IoCloseCircle
              onClick={handleCloseModal}
              className="close"
              style={{ width: "5rem", height: "4rem" }}
            />
          </Modal.Header>
          <Modal.Body>
            Category name :{" "}
            <input
              type="text"
              className="form-control"
              name="categoryName"
              value={state.categoryName}
              onChange={(event) => setState({ ...state, categoryName: event.target.value })}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => addCategory()}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
