import style from "./AdminProducts.module.scss";
import { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getCategories, getProducts } from "../../Redux/Actions";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginationEx from "../PaginationEx";
import ProductItem from "../ProductItem/ProductItem";
import { Modal, Table } from "react-bootstrap";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { DeleteProductResponses } from "../../Network/ApiResponses";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const navigate = useNavigate();
  const emptyCat = {
    id: 0,
    description: "Todas las categorías",
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const productList = useSelector((state) => state.productsList);
  const categories = useSelector((state) => [emptyCat, ...state.categories]);
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showToDelete, setShowToDelete] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(emptyCat);
  const [name, setName] = useState(
    searchParams.has("name")
      ? searchParams.get("name").replace(/%20/g, " ")
      : ""
  );
  const [page, setPage] = useState(
    searchParams.has("page") ? searchParams.get("page") : 0
  );
  const [withStock, setWithStock] = useState(
    searchParams.has("withStock")
      ? searchParams.get("withStock") == "true"
      : true
  );
  const [priceFrom, setPriceFrom] = useState(
    searchParams.has("priceFrom") ? searchParams.get("priceFrom") : ""
  );
  const [priceTo, setPriceTo] = useState(
    searchParams.has("priceTo") ? searchParams.get("priceTo") : ""
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get("name") || "";
    setName(search);
    dispatch(
      getProducts(
        search,
        priceFrom,
        priceTo,
        selectedCategory.id,
        withStock,
        page
      )
    );
    dispatch(getCategories());
    //console.log(productList); //En este caso como lo que estoy haciendo es mostrar la data cuando CARGO la pagina. hago el dispatch en useEffect, pero sino lo haria en onClick o algo asi.
  }, [searchParams, dispatch]);

  const handlePriceChange = (e, setPrice) => {
    const value = e.target.value;
    if (value == 0) setPrice("");
    else if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleSearch = () => {
    setPage(0);
    if (priceFrom && priceTo && priceFrom > priceTo) {
      dispatch(
        getProducts(name, priceTo, priceFrom, selectedCategory.id, withStock, 0)
      );
      const t = priceFrom;
      setPriceFrom(priceTo);
      setPriceTo(t);
    } else
      dispatch(
        getProducts(name, priceFrom, priceTo, selectedCategory.id, withStock, 0)
      );

    setSearchParams({
      name,
      priceFrom,
      priceTo,
      selectedCategoryId: selectedCategory.id,
      withStock,
      page: 0,
    });
  };

  const hangleWithStockChange = (value) => {
    setWithStock(value.target.checked);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevenir el comportamiento predeterminado
      handleSearch();
    }
  };

  const goPage = (page) => {
    setPage(page);
    setSearchParams({
      name,
      priceFrom,
      priceTo,
      selectedCategoryId: selectedCategory.id,
      withStock,
      page,
    });
    window.scrollTo(0, 0);
  };

  const handleToEdit = (product) => navigate(`/admin-products/${product.id}`);

  const handleToCreate = (product) => navigate(`/admin-products/0`);

  const handleToDelete = (product) => {
    setSelectedProduct(product);
    setShowToDelete(true);
  };

  const delProduct = async () => {
    setShowToDelete(false);
    const resp = await dispatch(deleteProduct(selectedProduct.id));
    if (resp === DeleteProductResponses.DELETE_PRODUCT_SUCCESS) {
      toast.success("El producto se ha eliminado");
      dispatch(
        getProducts(
          name,
          priceFrom,
          priceTo,
          selectedCategory.id,
          withStock,
          page
        )
      );
    } else toast.error("El producto no se pudo eliminar");
  };

  return (
    <>
      <Modal show={showToDelete} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de eliminar el producto "{selectedProduct?.name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowToDelete(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={delProduct}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={style.wrapper}>
        <Navbar
          fixed="top"
          expand="lg"
          className={style.navbar + " bg-body-tertiary"}
        >
          <Form className="m-auto d-flex">
            <InputGroup>
              <Dropdown
                variant="secondary"
                onSelect={(e) => setSelectedCategory(categories[e])}
              >
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {selectedCategory.description}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categories.map((category, idx) => (
                    <Dropdown.Item key={idx} eventKey={idx}>
                      {category.description}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              {/* <Form.Control
                placeholder="Nombre"
                value={name}
                onChange={(e) => hangleNameChange(e)}
              /> */}
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                placeholder="Desde"
                onKeyDown={handleKeyDown}
                value={priceFrom}
                onChange={(e) => handlePriceChange(e, setPriceFrom)}
              />
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                placeholder="Hasta"
                onKeyDown={handleKeyDown}
                value={priceTo}
                onChange={(e) => handlePriceChange(e, setPriceTo)}
              />
              <InputGroup.Checkbox
                checked={withStock}
                onChange={hangleWithStockChange}
              />
              <span className="input-group-text">
                {withStock ? "Sólo con stock" : "Todos los productos"}
              </span>
              <Button onClick={handleSearch}>Buscar</Button>
            </InputGroup>
          </Form>
        </Navbar>
        {productList?.content.length > 0 ? (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Stock</th>
                  <th>Precio</th>
                  <th className="text-center">
                    <FontAwesomeIcon
                      icon={faSquarePlus}
                      className="mx-1"
                      onClick={handleToCreate}
                      style={{ cursor: "pointer" }}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {productList.content.map((value, idx) => (
                  <ProductItem
                    key={idx}
                    product={value}
                    index={idx}
                    toEdit={handleToEdit}
                    toDelete={handleToDelete}
                  />
                ))}
              </tbody>
            </Table>
            <PaginationEx pageable={productList} goPage={goPage} />
          </>
        ) : (
          <div class="d-flex justify-content-center animate__animated animate__flipInX animate__delay-2s">
            <Alert variant="warning" className="fs-2 text m-5">
              No se encontraron productos con las especificaciones ingresadas
              <div className="text-center mt-5">
                <FontAwesomeIcon icon={faFaceSadTear} size="6x" />
              </div>
            </Alert>
          </div>
        )}
      </div>
    </>
  );
};
export default AdminProducts;
