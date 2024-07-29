import style from "./Home.module.scss";
import { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getLastProducts } from "../../Redux/Actions";
import Product from "../../Components/Product/Product";

const Home = () => {
  const dispatch = useDispatch();
  const lastProducts = useSelector((state) => state.lastProducts);
  useEffect(() => {
    dispatch(getLastProducts());
  }, [dispatch]);

  return (
    <Container className={style.container}>
      <Row>
        <Col xs={8}>
          <Image
            src="/Home.jpeg"
            rounded
            className={
              style.img +
              " animate__animated animate__fadeInLeft animate__faster"
            }
          />
        </Col>
        <Col xs={4} className={style.list}>
          <h3 className="text-center mb-4">Últimos productos</h3>
          <Container>
            {lastProducts?.map((value, idx) => (
              <div key={idx} className="mb-2">
                <div
                  className="animate__animated animate__fadeInRight animate__faster"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <Product key={idx} product={value} index={idx} />
                </div>
              </div>
            ))}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
