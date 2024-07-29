import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../Redux/Actions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChangePwdResponses } from "../Network/ApiResponses";
import { toast } from "react-toastify";
import { HollyMerchForm } from "./HollyMerchForm/HollyMerchForm";

const ChangePassword = () => {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangePassword = async (_event) => {
    try {
      const result = await dispatch(changePassword(formData, login.userId)); // Invoke the inner function
      console.log("result: ", result);
      switch (result) {
        case ChangePwdResponses.CHANGE_PWD_SUCCESS:
          toast.success("Contraseña cambiada exitosamente!");
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
        title="Cambiar Contraseña"
        onSubmit={handleChangePassword}
        submitCTAText="Actualizar"
      >
        <div className={`form-group`}>
          <label htmlFor="oldPassword">Contraseña actual</label>
          <input
            onChange={handleInputChange}
            name="oldPassword"
            value={formData.oldPassword}
            type="password"
            className={"form-control"}
            id="oldPassword"
            placeholder="**********"
          />
        </div>
        <div className={`form-group`}>
          <label htmlFor="newPassword">Contraseña nueva</label>
          <input
            onChange={handleInputChange}
            name="newPassword"
            value={formData.newPassword}
            type="password"
            className={"form-control"}
            id="newPassword"
            placeholder="**********"
          />
        </div>
        <div className={`form-group`}>
          <label htmlFor="repeatPassword">Repetir contraseña</label>
          <input
            onChange={handleInputChange}
            name="repeatPassword"
            value={formData.repeatPassword}
            type="password"
            className={"form-control"}
            id="repeatPassword"
            placeholder="**********"
          />
        </div>
      </HollyMerchForm>
    </div>
  );
};
export default ChangePassword;
