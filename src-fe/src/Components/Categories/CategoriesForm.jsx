import style from "./CategoriesForm.module.scss";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AddCatResponses, SignUpResponses } from "../../Network/ApiResponses";
import { useNavigate } from "react-router-dom";
import { addCategory, doSignUp } from "../../Redux/Actions";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteProduct, getCategories, getProducts } from "../../Redux/Actions";
import { faTrash, faSquarePlus } from "@fortawesome/free-solid-svg-icons";

const CategoriesForm = () => {
  const dispatch = useDispatch();
  //Grilla
  const emptyCat = {
    id: "",
    description: "",
  };
  const categories = useSelector((state) => state.categories);
  const filteredCategories = categories.filter(
    (category) =>
      category.id != null &&
      category.description != null &&
      category.description.trim() !== ""
  );

  ////
  const [formData, setFormData] = useState({
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUpClick = async (_event) => {
    try {
      const result = await dispatch(addCategory(formData)); // Invoke the inner function

      switch (result) {
        case AddCatResponses.ADD_CAT_SUCCESS:
          dispatch(getCategories());
          toast.success("Categoria creada correctamente");
          setFormData({ description: "" });
          break;
        // Handle other cases if needed
        default:
          toast.error("No se puede agregar la categoria correctamente.");
          break;
      }
    } catch (error) {
      console.log("Error al tratar de agregar una Categoria", error);
      toast.error("No se puede agregar la categoria correctamente.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the server)
    console.log("Form submitted:", formData);
  };

  return (
    <div className={style.wrapper}>
      <div>
        <h1>Categorías</h1>
        {formData.category && <p>{formData.category}</p>}
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Descripción</th>
              <th></th>
            </tr>
            <tr>
              <th></th>
              <th>
                {" "}
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="description"
                    placeholder="Nueva categoría"
                    className={"form-control"}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </form>
              </th>
              <th>
                {/* <button onClick={handleSignUpClick} type="submit">
                  Agregar
                </button> */}
                <FontAwesomeIcon
                  icon={faSquarePlus}
                  className="mx-1"
                  onClick={handleSignUpClick}
                  style={{ cursor: "pointer" }}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.description}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="mx-1"
                    onClick={() => handleDelete(category.id)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CategoriesForm;
