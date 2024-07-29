import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HollyMerchForm } from "../HollyMerchForm/HollyMerchForm";
import { useState } from "react";
import { createCoupon } from "../../Redux/Actions";

const Coupon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        keyword: '',
        discountPercentage: '',
        active: true,
    });

    const handleClick = async () => {
        try {
            const result = await dispatch(createCoupon(formData)); // Invoke the inner function

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
        setFormData({ ...formData, [name]: value });
    }
    return (
        <>
            <HollyMerchForm title="Crear Cupon" onSubmit={handleClick} submitCTAText="Crear">
                <div className={`form-group`}>
                    <label htmlFor="email">Nombre Cupon</label>
                    <input
                        onChange={handleInputChange}
                        name="keyword"
                        value={formData.keyword}
                        type="text"
                        className={'form-control'}
                        id="keyword"
                        placeholder="nombre cupon" />
                </div>
                <div className={`form-group`}>
                    <label htmlFor="discountPercentage">Porcentaje Descuento</label>
                    <input
                        onChange={handleInputChange}
                        name="discountPercentage"
                        value={formData.discountPercentage}
                        type="discountPercentage"
                        className={'form-control'}
                        id="discountPercentage"
                        placeholder="porcentaje de descuento" />
                </div>
            </HollyMerchForm>
        </>
    );
}

export default Coupon