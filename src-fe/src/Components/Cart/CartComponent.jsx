import style from "./CartComponent.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import CartItemComponent from "../Cart/CartItemComponent";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  removeFromCart,
  removeOne,
  clearCart,
  validateVoucher,
  confirmOrder,
} from "../../Redux/Actions";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CartComponent = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    const updatedCart = {
      ...cart,
      totalItems: totalItems,
      totalPrice: totalPrice,
    };
    console.log(updatedCart);
    // dispatch(confirmOrder(updatedCart));
    toast.success("¡Orden confirmada!");
    handleClearCart();
    // navigate("/checkout");
  };

  const [inputText, setInputText] = useState("");
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartItems);
  const cartItems = useSelector((state) => state.cartItems.items);
  const keywordVoucher = useSelector((state) => state.cartItems.keyword);
  const discountPercentage = useSelector(
    (state) => state.cartItems.discountPercentage
  );

  const calcularTotales = (array) => {
    let totalItems = 0;
    let totalPrice = 0;

    array.forEach((item) => {
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity;
    });

    return { totalItems, totalPrice };
  };

  useEffect(() => {
    const { totalItems, totalPrice } = calcularTotales(cartItems);
    setTotalItems(totalItems);
    if (keywordVoucher !== "") {
      const discountedPrice = totalPrice * (1 - discountPercentage / 100);
      setTotalPrice(discountedPrice);
    } else {
      setTotalPrice(totalPrice);
    }
  }, [cartItems, keywordVoucher, discountPercentage]);

  const handleUpdateNumeros = () => {
    const { totalItems, totalPrice } = calcularTotales(cartItems);
    setTotalItems(totalItems);
    if (keywordVoucher !== "") {
      const discountedPrice = totalPrice * (1 - discountPercentage / 100);
      setTotalPrice(discountedPrice);
    } else {
      setTotalPrice(totalPrice);
    }
  };

  const handleRemoveOne = async (productId) => {
    await dispatch(removeOne(productId));
    handleUpdateNumeros;
  };

  const handleRemoveFromCart = async (productId) => {
    await dispatch(removeFromCart(productId));
    handleUpdateNumeros;
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleValidateVoucher = () => {
    console.log(inputText);
    dispatch(validateVoucher(inputText));
  };

  return (
    <div className={style.wrapper}>
      <h1>Carrito de compras</h1>
      <br />
      <div>
        {cartItems?.length === 0 ? (
          <h4>Carrito vacío</h4>
        ) : (
          <Container>
            <Row>
              {cartItems?.map((item) => (
                <Col xs={6}>
                  <div className="card" key={item.id}>
                    <div style={{ marginLeft: "10px" }}>
                      <h3>{item.name}</h3>
                      <p style={{ float: "left" }}>Precio: ${item.price}</p>
                      <p style={{ float: "right" }}>
                        Cantidad: {item.quantity} &nbsp;
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "10px",
                        marginLeft: "10px",
                        marginBottom: "5px",
                        marginRight: "10px",
                      }}
                    >
                      <Button
                        variant="secondary"
                        onClick={() => handleRemoveOne(item.id)}
                      >
                        Quitar un producto
                        {/* TODO: Agregar variante de stock sin que se pase del stock del producto */}
                      </Button>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => handleRemoveFromCart(item.id)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            <Row
              style={{
                justifyContent: "center",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <Col xs="auto">
                <Button
                  variant="secondary"
                  onClick={handleClearCart}
                  style={{
                    width: "150px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Vaciar carrito
                </Button>
              </Col>
            </Row>
          </Container>
        )}
      </div>
      <div style={{ margin: "20px" }}>
        <Row style={{ marginBottom: "10px" }}>
          {/* Total items y Precio total */}
          <Col md={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <span>Total items: {totalItems}</span>
            </div>
          </Col>
          <Col md={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Form style={{ display: "flex", alignItems: "center" }}>
                <Form.Control
                  type="search"
                  placeholder="Cupón de descuento"
                  value={inputText}
                  onChange={handleInputChange}
                  style={{ marginRight: "10px", width: "auto" }}
                />
                <Button
                  variant="outline-success"
                  onClick={handleValidateVoucher}
                  disabled={inputText.length === 0}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
        <Row>
          {/* Precio total y Comprar */}
          <Col md={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <span>Precio total: ${totalPrice}</span>
            </div>
          </Col>
          <Col md={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button
                variant="primary"
                disabled={cartItems?.length === 0}
                onClick={handleClick}
                style={{ marginLeft: "10px" }}
              >
                Comprar
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default CartComponent;
