import axios from "axios";
import {
  FETCH_POSTS,
  GET_CATEGORIES,
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_ORDERS,
  GET_ORDER_DETAILS,
  LOGIN,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_ONE,
  CLEAR_CART,
  SET_FILTERS,
  VALIDATE_VOUCHER,
  ADD_DISCOUNT_PERCENTAGE,
  DO_ADDCAT,
  GET_LAST_PRODUCTS,
  DELETE_PRODUCT,
  LOGOUT,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  CONFIRM_ORDER,
  FETCH_PROFILE,
} from "./ActionTypes";
import {
  ChangePwdResponses,
  LoginResponses,
  SignUpResponses,
  AddCatResponses,
  DeleteProductResponses,
  SaveProductResponses,
} from "../Network/ApiResponses";
import { toast } from "react-toastify";

const ApiConstants = {
  HOST: "http://localhost:4002/",
  API_PRODUCTS: "products",
  API_CATEGORIES: "categories",
  API_USERS: "users",
  LOGIN_ENDPOINT: "/login",
  SIGNUP_ENDPOINT: "/signup",
  CHANGE_PWD_ENDPOINT: "/changepwd",
  CHANGE_PWD_ENDPOINT: "/changepwd",
  API_ORDERS: "orders",
  API_VOUCHERS: "vouchers",
};

export const fetchPostAction = () => {
  return async (dispatch) => {
    try {
      console.log("Entro en el try");
      const { data } = await axios(
        "https://jsonplaceholder.typicode.com/posts"
      );
      console.log("data:", data);

      return dispatch({
        type: FETCH_POSTS,
        payload: data,
      });
    } catch (error) {
      console.error("reventoski", error);
    }
  };
};

//#region Productos

export const getProducts = (
  name,
  priceFrom,
  priceTo,
  categoryId,
  withStock,
  page
) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4002/products/list?page=${page}`,
        {
          name,
          priceFrom,
          priceTo,
          categoryId,
          withStock,
        }
      );
      return dispatch({
        type: GET_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      console.error("error:", error);
    }
  };
};

export const getLastProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `${ApiConstants.HOST}${ApiConstants.API_PRODUCTS}`
      );
      return dispatch({
        type: GET_LAST_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      console.error("error:", error);
    }
  };
};

export const getProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `${ApiConstants.HOST}${ApiConstants.API_PRODUCTS}/${productId}`
      );
      return dispatch({
        type: GET_PRODUCT,
        payload: data,
      });
    } catch (error) {
      console.error("error:", error);
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `${ApiConstants.HOST}${ApiConstants.API_PRODUCTS}/${productId}`
      );
      dispatch({
        type: DELETE_PRODUCT,
        payload: productId,
      });
      return DeleteProductResponses.DELETE_PRODUCT_SUCCESS;
    } catch (error) {
      console.error("error:", error);
      return DeleteProductResponses.DELETE_PRODUCT_FAILURE;
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    try {
      await axios.put(
        `${ApiConstants.HOST}${ApiConstants.API_PRODUCTS}/${product.id}`,
        product
      );
      dispatch({
        type: UPDATE_PRODUCT,
        payload: product,
      });
      return SaveProductResponses.SAVE_PRODUCT_SUCCESS;
    } catch (error) {
      console.error("error:", error);
      return SaveProductResponses.SAVE_PRODUCT_FAILURE;
    }
  };
};

export const createProduct = (product) => {
  return async (dispatch) => {
    try {
      await axios.post(
        `${ApiConstants.HOST}${ApiConstants.API_PRODUCTS}`,
        product
      );
      dispatch({
        type: CREATE_PRODUCT,
        payload: product,
      });
      return SaveProductResponses.SAVE_PRODUCT_SUCCESS;
    } catch (error) {
      console.error("error:", error);
      return SaveProductResponses.SAVE_PRODUCT_FAILURE;
    }
  };
};

//#endregion

//#region Filtro

export const setFilters = (filters) => ({
  type: SET_FILTERS,
  payload: filters,
});

//#endregion

//#region Categorías

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `${ApiConstants.HOST}${ApiConstants.API_CATEGORIES}?page=0&size=10000`
      );
      return dispatch({
        type: GET_CATEGORIES,
        payload: data.content,
      });
    } catch (error) {
      console.error("error:", error);
    }
  };
};

export const addCategory = (formData) => {
  return async (dispatch) => {
    try {
      let endpoint = `${ApiConstants.HOST}${ApiConstants.API_CATEGORIES}`;
      const { data, status } = await axios.post(endpoint, formData);
      /*dispatch({
        type: DO_ADDCAT,
        payload: data,
      });*/
      console.log("Categoria agregada:", status);
      return AddCatResponses.ADD_CAT_SUCCESS;
    } catch (error) {
      //Aca en el catch, es todo lo que no es 20X o 30X
      alert(error);
      console.error("error:", error);
      //TODO hacer un switch, y catchear toda las distintas exceptions en el CATCH, y crear distintas LoginResponses para eso .
      return AddCatResponses.ADD_CAT_FAILURE;
    }
  };
};

//#endregion

//#region Cart
export const addToCart = (product, selectedItems) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });
  };
};

export const removeFromCart = (productId) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: productId,
    });
  };
};

export const removeOne = (productId) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_ONE,
      payload: productId,
    });
  };
};

export const clearCart = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CART,
      payload: null,
    });
  };
};
//#endregion

//#region Voucher
export const validateVoucher = (keyword) => {
  return async (dispatch) => {
    try {
      console.log(keyword);
      const { data } = await axios(
        `${ApiConstants.HOST}${ApiConstants.API_VOUCHERS}/${keyword}`
      );
      if (data.id) {
        const voucherPayload = {
          keyword: data.keyword,
          discountPercentage: data.discountPercentage,
        };
        toast.success("Cupón validado correctamente.");
        dispatch({
          type: ADD_DISCOUNT_PERCENTAGE,
          payload: voucherPayload,
        });
      }
      return dispatch({
        type: VALIDATE_VOUCHER,
        payload: data,
      });
    } catch (error) {
      toast.error("Cupón incorrecto o no válido.");
      console.error("error:", error);
    }
  };
};

export const confirmOrder = (checkoutOrder) => {
  return async (dispatch) => {
    try {
      let endpoint = `${ApiConstants.HOST}${ApiConstants.API_ORDERS}`;
      const { data, status } = await axios.post(endpoint, checkoutOrder);
      toast.success("Orden confirmada.");
      return dispatch({
        type: CONFIRM_ORDER,
        payload: data,
      });
    } catch (error) {
      toast.error("Falló la confirmación.", error);
    }
  };
};
//#endregion

//#region User

export const doLogin = (formData) => {
  return async (dispatch) => {
    try {
      console.log("Entro en el try");

      const endpoint = `${ApiConstants.HOST}${ApiConstants.API_USERS}${ApiConstants.LOGIN_ENDPOINT}`;
      const { data, status, statusText } = await axios.post(endpoint, formData);

      //Si llegaste aca, es porque dio 200 o 300x
      if (data.userId) {
        const loginPayload = {
          userId: data.userId,
          isLogged: true,
          userName: data.userName,
        };

        dispatch({
          type: LOGIN,
          payload: loginPayload,
        });
        return LoginResponses.LOGIN_SUCCESS;
      } else {
        toast.error("Usuario o contraseña incorrectos. Intente nuevamente");
      }
    } catch (error) {
      //Aca en el catch, es todo lo que no es 20X o 30X
      toast.error(
        "Usuario o contraseña incorrectos. Intente nuevamente",
        error
      );
      console.error("error:", error);
      console.error("error.response.status:", error.response.status);
      console.error(
        "error.response.data.message:",
        error.response.data.message
      );

      //TODO hacer un switch, y catchear toda las distintas exceptions en el CATCH, y crear distintas LoginResponses para eso .
      return LoginResponses.LOGIN_INVALID_CREDS;
    }
  };
};

export const doSignUp = (formData) => {
  return async (dispatch) => {
    try {
      let endpoint = `${ApiConstants.HOST}${ApiConstants.API_USERS}${ApiConstants.SIGNUP_ENDPOINT}`;

      const { data, status } = await axios.post(endpoint, formData);

      const loginPayload = {
        userId: data.userId,
        isLogged: true,
        userName: data.userName,
      };

      //Si llegaste aca, es porque dio 200 o 300x

      dispatch({
        type: LOGIN,
        payload: loginPayload,
      });
      return SignUpResponses.SIGN_UP_SUCCESS;
    } catch (error) {
      //Aca en el catch, es todo lo que no es 20X o 30X
      alert(error);
      toast.error("", error);
      //TODO hacer un switch, y catchear toda las distintas exceptions en el CATCH, y crear distintas LoginResponses para eso .
      return SignUpResponses.SIGN_UP_FAILURE;
    }
  };
};

export const getUserProfile = (userId) => {
  return async (dispatch) => {
    try {
      let endpoint = `${ApiConstants.HOST}${ApiConstants.API_USERS}${"/"+userId}`;

      const { data, status } = await axios(endpoint);

      //Si llegaste aca, es porque dio 200 o 300x

      dispatch({
        type: FETCH_PROFILE,
        payload: data,
      });
      return data;
    } catch (error) {
      //Aca en el catch, es todo lo que no es 20X o 30X
      toast.error("", error);
      console.error("error:", error);
      //TODO hacer un switch, y catchear toda las distintas exceptions en el CATCH, y crear distintas LoginResponses para eso .
      return SignUpResponses.SIGN_UP_FAILURE;
    }
  };
};

// export const updateUserProfile = () => {
//   return async (dispatch) => {
//     try {
//       let endpoint = `${ApiConstants.HOST}${ApiConstants.API_USERS}${ApiConstants.SIGNUP_ENDPOINT}`;

//       const { data, status } = await axios.post(endpoint, formData);

//       //Si llegaste aca, es porque dio 200 o 300x

//       dispatch({
//         type: DO_LOGIN,
//         payload: true,
//       });
//       return SignUpResponses.SIGN_UP_SUCCESS;
//     } catch (error) {
//       //Aca en el catch, es todo lo que no es 20X o 30X
//       toast.error("", error);
//       console.error("error:", error);
//       //TODO hacer un switch, y catchear toda las distintas exceptions en el CATCH, y crear distintas LoginResponses para eso .
//       return SignUpResponses.SIGN_UP_FAILURE;
//     }
//   };
// };

export const changePassword = (formData, userId) => {
  return async (_dispatch) => {
    try {
      let endpoint = `${ApiConstants.HOST}${ApiConstants.API_USERS}${"/" + userId
        }${ApiConstants.CHANGE_PWD_ENDPOINT}`;

      const { data } = await axios.put(endpoint, formData);

      return ChangePwdResponses.CHANGE_PWD_SUCCESS;
    } catch (error) {
      //Aca en el catch, es todo lo que no es 20X o 30X
      toast.error("", error);
      console.error("error:", error);
      //TODO hacer un switch, y catchear toda las distintas exceptions en el CATCH, y crear distintas LoginResponses para eso .
      return ChangePwdResponses.CHANGE_PWD_FAILURE;
    }
  };
};

export const createCoupon = (formData) => {
  return async (_dispatch) => {
    try {
      let endpoint = `${ApiConstants.HOST}${ApiConstants.API_VOUCHERS}`

      const { data } = await axios.post(endpoint, formData);
      toast.success("Cupon creado con exito!");

      return ChangePwdResponses.CHANGE_PWD_SUCCESS;
    } catch (error) {
      //Aca en el catch, es todo lo que no es 20X o 30X
      toast.error("", error);
      console.error("error:", error);
      //TODO hacer un switch, y catchear toda las distintas exceptions en el CATCH, y crear distintas LoginResponses para eso .
      return ChangePwdResponses.CHANGE_PWD_FAILURE;
    }
  };
};

export const doLogout = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
      payload: {
        login: {
          userId: "",
          isLogged: false,
          userName: "",
        },
        cartItems: {
          items: [],
          userId: 1,
          totalItems: 0,
          totalPrice: 0,
          keyword: "",
          discountPercentage: 0,
        },
      },
    });
  };
};

//#endregion
