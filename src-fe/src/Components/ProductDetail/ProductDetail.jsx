import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/Image";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ProductDetail = () => {
  const { productId } = useParams();
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.login.isLogged);
  const loginHandle = () => navigate("/login");

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch]);

  let button;
  if (!product?.stock)
    button = (
      <div className="p-2 align-middle text-warning flex-grow-1 fs-5 fw-bold">
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
        <Button variant="primary" className="my-3">
          Agregar al carrito
        </Button>
      </>
    );

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <Image
              src={product?.image}
              alt={product?.title}
              className="w-100 rounded shadow animate__animated animate__backInLeft animate__faster"
            />
          </Col>
          <Col md={6}>
            <h1>{product?.name}</h1>
            <h5>Precio: ${product?.price?.toFixed(2)}</h5>
            {button}
            <p>{product?.description}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetail;
