import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginResponses } from "../Network/ApiResponses";
import { doLogin } from "../Redux/Actions";
import { HollyMerchForm } from "../Components/HollyMerchForm/HollyMerchForm";
import { toast } from "react-toastify";
import Login from "../Components/Login";

const LoginView = () => {
  return <><Login></Login></>;
};

export default LoginView;
