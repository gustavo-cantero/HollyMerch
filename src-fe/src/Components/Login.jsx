import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginResponses } from "../Network/ApiResponses";
import { doLogin } from "../Redux/Actions";
import { HollyMerchForm } from "../Components/HollyMerchForm/HollyMerchForm";
import { toast } from "react-toastify";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: "",
        password: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLoginClick = async () => {
        try {
            console.log("handleLoginClick try");
            const result = await dispatch(doLogin(formData)); // Invoke the inner function
            console.log("result: ", result);
            switch (result) {
                case LoginResponses.LOGIN_SUCCESS:
                    console.log("LoginResponses.LOGIN SUCCESS");
                    toast.success("Usuario logueado con exito!")
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

    return (
        <div className="animate__animated animate__fadeInDownBig">
            <HollyMerchForm
                title="Iniciar sesión"
                onSubmit={handleLoginClick}
                submitCTAText="Iniciar Sesion"
            >
                <div className={`form-group`}>
                    <label htmlFor="username">Usuario</label>
                    <input
                        onChange={handleInputChange}
                        name="userName"
                        value={formData.userName}
                        type="text"
                        className={"form-control"}
                        id="username"
                        placeholder="Nombre de usuario"
                    />
                </div>
                <div className={`form-group`}>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        onChange={handleInputChange}
                        name="password"
                        value={formData.password}
                        type="password"
                        className={"form-control"}
                        id="password"
                        placeholder="Contraseña"
                    />
                </div>
            </HollyMerchForm>
        </div>
    );

};
export default Login;
