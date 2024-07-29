import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doSignUp } from "../Redux/Actions";
import { Form } from 'react-bootstrap'
import { HollyMerchForm } from "../Components/HollyMerchForm/HollyMerchForm";
import { SignUpResponses } from "../Network/ApiResponses";

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        lastName: '',
        password: '',
        userName: '',
        birthDate: '',
    });

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
        const { name, value } = event.target

        if (name === 'birthDate') {
            // Assuming the input value is in the format "yyyy-MM-dd"
            // You can parse it and reformat it as needed
            const parsedDate = new Date(value);
            const formattedDate = parsedDate.toISOString().split('T')[0]; // "yyyy-MM-dd"
            setFormData({ ...formData, [name]: formattedDate });
        } else {
            setFormData({ ...formData, [name]: value });

        }
    }
    return (
        <>
            <HollyMerchForm title="Crear Usuario" onSubmit={handleSignUpClick} submitCTAText="Registrarse">
                <div className={`form-group`}>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleInputChange}
                        name="email"
                        value={formData.email}
                        type="email"
                        className={'form-control'}
                        id="email"
                        placeholder="email" />
                </div>
                <div className={`form-group`}>
                    <label htmlFor="firstName">Nombre</label>
                    <input
                        onChange={handleInputChange}
                        name="name"
                        value={formData.name}
                        type="firstName"
                        className={'form-control'}
                        id="firstName"
                        placeholder="nombre" />
                </div>
                <div className={`form-group`}>
                    <label htmlFor="lastName">Apellido</label>
                    <input
                        onChange={handleInputChange}
                        name="lastName"
                        value={formData.lastName}
                        type="lastName"
                        className={'form-control'}
                        id="lastName"
                        placeholder="apellido" />
                </div>
                <div className={`form-group`}>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        onChange={handleInputChange}
                        name="password"
                        value={formData.password}
                        type="password"
                        className={'form-control'}
                        id="password"
                        placeholder="contraseña" />
                </div>
                <div className={`form-group`}>
                    <label htmlFor="username">Usuario</label>
                    <input
                        onChange={handleInputChange}
                        name="userName"
                        value={formData.userName}
                        type="username"
                        className={'form-control'}
                        id="username"
                        placeholder="usuario" />
                </div>

                <Form.Group controlId="birthDate">
                    <Form.Label>Fecha de nacimiento</Form.Label>
                    <Form.Control
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange} />
                </Form.Group>
            </HollyMerchForm>
        </>
    );
};
export default SignUp;