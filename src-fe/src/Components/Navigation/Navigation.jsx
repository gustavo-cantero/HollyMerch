import style from "./Navigation.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/logo.png";
import Search from "../Search";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import { doLogout } from "../../Redux/Actions";
import { toast } from "react-toastify";

const iconUser = <FontAwesomeIcon icon={faUser} />;

const Navigation = () => {
  const isLogged = useSelector((state) => state.login.isLogged);
  const cartItems = useSelector((state) => state.cartItems.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    console.log("handleLogout", e);
    dispatch(doLogout());
    toast.success("Usuario deslogueado con exito!");
    navigate("/");
  };

  return (
    <>
      <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} width="50" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/products">
                Productos
              </Nav.Link>
              {isLogged && (
                <NavDropdown title="Administración" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/admin-products">
                    Productos
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item as={Link} to="/orders">
                  Órdenes
                </NavDropdown.Item> */}
                  <NavDropdown.Item as={Link} to="/admin-categories">
                    Categorías
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin-cupons">
                    Cupones
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
            <Search />
            <Navbar.Brand as={Link} to="/cart">
              <FontAwesomeIcon icon={faCartShopping} className={style.cart} />
              {cartItems?.length > 0 && (
                <Badge
                  pill
                  style={{
                    position: "absolute",
                    marginLeft: "-5px",
                    fontSize: ".5em",
                    marginTop: "-5px",
                  }}
                >
                  {cartItems?.reduce((acc, item) => acc + item.quantity, 0)}
                </Badge>
              )}
            </Navbar.Brand>
            {/* <Navbar className="ml-1 me-2">
              <Navbar.Text>Mark Otto</Navbar.Text>
            </Navbar> */}
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={iconUser}
              className={style.avatar}
            >
              {isLogged ? (
                <>
                  <NavDropdown.Item as={Link} to="/profile">
                    Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Salir
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="/login">
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/register">
                    Registro
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
