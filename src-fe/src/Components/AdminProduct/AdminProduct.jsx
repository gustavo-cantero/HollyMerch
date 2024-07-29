import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  getCategories,
  getProduct,
  updateProduct,
} from "../../Redux/Actions";
import { HollyMerchForm } from "../HollyMerchForm/HollyMerchForm";
import { SaveProductResponses } from "../../Network/ApiResponses";
import { toast } from "react-toastify";
import { Dropdown, Form } from "react-bootstrap";

const AdminProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  const [selectedCategory, setSelectedCategory] = useState({});
  const categories = useSelector((state) => state.categories);

  const product = useSelector((state) => state.product);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
    userName: "gcantero",
  });

  useEffect(() => {
    dispatch(getCategories());
    if (productId) dispatch(getProduct(productId));
  }, [dispatch]);

  useEffect(() => {
    if (productId != 0 && product) {
      setFormData(product);
      if (categories)
        setSelectedCategory(
          categories.find((c) => c.id == product.category.id)
        );
    } else setSelectedCategory(categories[0]);
  }, [product, productId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = async () => {
    try {
      const newData = { ...formData, categoryId: selectedCategory.id };
      let result;
      if (productId == 0) result = await dispatch(createProduct(newData));
      else result = await dispatch(updateProduct(newData));

      switch (result) {
        case SaveProductResponses.SAVE_PRODUCT_SUCCESS:
          toast.success("El producto se grabó satisfactoriamente");
          navigate(-1);
          break;
        default:
          toast.error("El producto no se pudo guardar");
          break;
      }
    } catch (error) {
      toast.error("El producto no se pudo guardar");
    }
  };

 const onCategoryChange = (e) => {
    const cat = categories.find((c) => c.id == e.target.value);
    setSelectedCategory(cat);
  };

  return (
    <>
      <HollyMerchForm
        title="Producto"
        onSubmit={handleClick}
        submitCTAText="Grabar"
      >
        <div className={`form-group`}>
          <label htmlFor="name">Nombre</label>
          <input
            onChange={handleInputChange}
            name="name"
            value={formData.name}
            type="text"
            className={"form-control"}
            id="name"
            placeholder="Nombre"
          />
        </div>
        <div className={`form-group`}>
          <label htmlFor="category">Categoría</label>
          <Form.Select
            name="category"
            variant="secondary"
            value={selectedCategory.id}
            onChange={onCategoryChange}
          >
            {categories?.map((category, idx) => (
              <option id={category.id} key={idx} value={category.id}>
                {category.description}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className={`form-group`}>
          <label htmlFor="description">Descripción</label>
          <input
            onChange={handleInputChange}
            name="description"
            value={formData.description}
            type="text"
            className={"form-control"}
            id="description"
            placeholder="Descripción"
          />
        </div>
        <div className={`form-group`}>
          <label htmlFor="price">Precio</label>
          <input
            onChange={handleInputChange}
            name="price"
            value={formData.price}
            type="number"
            className={"form-control"}
            id="price"
            placeholder="price"
          />
        </div>
        <div className={`form-group`}>
          <label htmlFor="stock">Stock</label>
          <input
            onChange={handleInputChange}
            name="stock"
            value={formData.stock}
            type="number"
            className={"form-control"}
            id="stock"
            placeholder="Stock"
          />
        </div>
        <div className={`form-group`}>
          <label htmlFor="image">Imagen</label>
          <input
            onChange={handleInputChange}
            name="image"
            value={formData.image}
            type="url"
            className={"form-control"}
            id="image"
            placeholder="Imagen"
          />
        </div>
      </HollyMerchForm>
    </>
  );
};
export default AdminProduct;
