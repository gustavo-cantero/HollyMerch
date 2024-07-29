import { useEffect, useState } from "react";
import Product from "../Product/Product";
import style from "./Products.module.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getProducts } from "../../Redux/Actions";
import { useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginationEx from "../PaginationEx";

const CrudProducts = () => {
  const emptyCat = {
    id: 0,
    description: "Todas las categorías",
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const productList = useSelector((state) => state.productsList);
  const categories = useSelector((state) => [emptyCat, ...state.categories]);
  const dispatch = useDispatch();

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

  return (
    <>
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
        {productList?.content?.length > 0 ? (
          <>
            <div className={style.innerWrapper}>
              <Row xs={3} md={5} className="g-4">
                {productList.content.map((value, idx) => (
                  <Col key={idx}>
                    <div
                      className="animate__animated animate__fadeInDown animate__faster"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <Product key={idx} product={value} index={idx} />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
            <PaginationEx pageable={productList} goPage={goPage} />
          </>
        ) : (
          <div className="d-flex justify-content-center animate__animated animate__flipInX">
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
export default CrudProducts;
