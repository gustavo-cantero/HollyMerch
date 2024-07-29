import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostAction, getUserProfile } from "../../Redux/Actions";
import { useEffect, useState } from "react";
import { HollyMerchForm } from "../HollyMerchForm/HollyMerchForm";
import { Form } from "react-bootstrap";

const ProfileForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userProfile = useSelector((state) => state.userProfile);
  const loginData = useSelector((state) => state.login);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    lastName: "",
    userName: "",
    birthDate: "",
  });

  const handleClick = () => {
    navigate("/change-password");
  };

  useEffect(() => {
    dispatch(getUserProfile(loginData.userId));
  }, [dispatch]);

  const handleSignUpClick = async () => {
    try {
      const result = await dispatch(doSignUp(formData)); // Invoke the inner function

      switch (result) {
        case SignUpResponses.SIGN_UP_SUCCESS:
          navigate("/");

          break;
        // Handle other cases if needed
        default:
          // Handle other cases
          break;
      }
    } catch (error) {
      console.log("Error when trying to dispatch login", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "birthDate") {
      // Assuming the input value is in the format "yyyy-MM-dd"
      // You can parse it and reformat it as needed
      const parsedDate = new Date(value);
      const formattedDate = parsedDate.toISOString().split("T")[0]; // "yyyy-MM-dd"
      setFormData({ ...formData, [name]: formattedDate });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  return (
    <div className="animate__animated animate__fadeInDownBig">
      <HollyMerchForm
        title="Informacion de Usuario"
        onSubmit={handleSignUpClick}
        submitCTAText="Actualizar"
      >
        <div className={`form-group`}>
          <label htmlFor="email">Email</label>
          <input
            readOnly="true"
            name="email"
            value={userProfile.email}
            type="email"
            className={"form-control"}
            id="email"
            placeholder="email"
          />
        </div>
        <div className={`form-group`}>
          <label htmlFor="firstName">Nombre</label>
          <input
            onChange={handleInputChange}
            name="name"
            value={userProfile.name}
            type="firstName"
            className={"form-control"}
            id="firstName"
            placeholder="nombre"
          />
        </div>
        <div className={`form-group`}>
          <label htmlFor="lastName">Apellido</label>
          <input
            onChange={handleInputChange}
            name="lastName"
            value={userProfile.lastName}
            type="lastName"
            className={"form-control"}
            id="lastName"
            placeholder="apellido"
          />
        </div>
        <div className={`form-group`}>
          <Button variant="primary" onClick={handleClick}>
            Cambiar contraseña
          </Button>
        </div>
        <div className={`form-group`}>
          <label htmlFor="username">Usuario</label>
          <input
            readOnly="false"
            name="userName"
            value={userProfile.userName}
            type="username"
            className={"form-control"}
            id="username"
            placeholder="usuario"
          />
        </div>

        <Form.Group controlId="birthDate">
          <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control
            type="date"
            name="birthDate"
            value={userProfile.birthDate}
            onChange={handleInputChange}
          />
        </Form.Group>
      </HollyMerchForm>
    </div>
  );
};

export default ProfileForm;
