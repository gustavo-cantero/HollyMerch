import style from "./Product.module.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/Actions";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Product = ({ product, index }) => {
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.login.isLogged);
  const loginHandle = () => navigate("/login");
  const detailHandle = (id) => navigate(`/products/${id}`);
  const selectedItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product, selectedItems));
  };

  let button;
  if (!product?.stock)
    button = (
      <div className="p-2 align-middle text-center text-warning flex-grow-1 fs-5 f  w-bold">
        SIN STOCK
      </div>
    );
  else if (!isLogged)
    button = (
      <>
        <Button variant="primary" onClick={loginHandle}>
          Ingresar para comprar
        </Button>
      </>
    );
  else
    button = (
      <>
        <Button variant="primary" onClick={handleAddToCart}>
          Agregar al carrito
        </Button>
      </>
    );

  return (
    <>
      <Card className={style.card}>
        <div className={style.cardImage}>
          <Card.Img
            variant="top"
            src={product.image}
            style={{ cursor: "pointer" }}
            onClick={() => detailHandle(product.id)}
          />
        </div>
        <Card.Body>
          <Card.Title>
            <Link as={Link} to={`/products/${product.id}`}>
              {product.name}
            </Link>
          </Card.Title>
          <Card.Text className={style.detail}>{product.description}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex bd-highlight">
          <div className="p-2 align-middle flex-grow-1 fs-5 fw-bold">
            ${product.price.toFixed(2)}
          </div>
          {button}
        </Card.Footer>
      </Card>
    </>
  );
};
export default Product;
