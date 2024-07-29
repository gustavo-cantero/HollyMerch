import { useDispatch, useSelector } from "react-redux";
import { HollyMerchForm } from "../../Components/HollyMerchForm/HollyMerchForm";
import { changePassword } from "../../Redux/Actions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChangePwdResponses } from "../../Network/ApiResponses";
import { toast } from "react-toastify";
import ChangePassword from "../../Components/ChangePassword.jsx";

const ChangePasswordView = () => {
  return <><ChangePassword></ChangePassword></>;
};

export default ChangePasswordView;
