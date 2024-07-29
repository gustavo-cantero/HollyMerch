import {
  LOGIN,
  FETCH_POSTS,
  GET_CATEGORIES,
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_ORDERS,
  GET_ORDER_DETAILS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_ONE,
  CLEAR_CART,
  VALIDATE_VOUCHER,
  GET_LAST_PRODUCTS,
  DELETE_PRODUCT,
  ADD_DISCOUNT_PERCENTAGE,
  LOGOUT,
  DO_ADDCAT,
  CONFIRM_ORDER,
  FETCH_PROFILE,
} from "./ActionTypes";

const initialState = {
  postList: [],
  productsList: {},
  lastProducts: [],
  product: {},
  orderList: [],
  categories: [],
  orderDetailList: [],
  login: {
    userId: -1,
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
  filters: {
    name: "",
    selectedCategoryId: 0,
    withStock: true,
    priceFrom: "",
    priceTo: "",
    page: 0,
  },
  discountVoucher: {},
  userProfile: {}
};

/**En el reducer, es el lugar donde ejecuto la logica luego de una accion
 * Por ejemplo si hice un FETCH_POSTS, y quiero filtrar algunos posts, y hacerles un display en algun lado, todo eso lo hago aca
 * Si alguna vez laburaron con ViewModel toda la business logic esta aca
 *
 *
 */
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      console.log("case FETCH_POSTS", action.payload);
      //Reducer Se entera gracis a que esta conectado con el Store, que alguien ejecuto esta Action, y le llega el payload de ella - aca se hace la logica
      return { ...state, postList: action.payload };

    // Productos
    case GET_PRODUCTS:
      return { ...state, productsList: action.payload };
    case GET_LAST_PRODUCTS:
      return { ...state, lastProducts: action.payload };
    case GET_PRODUCT:
      return { ...state, product: action.payload };
    // Categorías
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };

    case GET_ORDERS:
      return { ...stateL, orderList: action.payload };
    case GET_ORDER_DETAILS:
      return { ...state, orderDetailList: action.payload };
    case LOGIN:
      return { ...state, login: action.payload };
    case LOGOUT:
      return { ...state, ...action.payload };

    case ADD_TO_CART:
      let totalCalculated = 0;
      const discountPercentage = state.cartItems?.discountPercentage || 0; 
      
      if (discountPercentage !== 0) {
        totalCalculated = action.payload.price * (1 - discountPercentage / 100);
      } else {
        totalCalculated = action.payload.price;
      }
      // TODO Se debe actualizar el totalprice y el totalitems
      // Consulto si hay items ya para sumar o asignar un 1
      const existingItem = state.cartItems.items?.find(
        (item) => item.id === action.payload.id
      );
      console.log(existingItem);
      if (existingItem) {
        return {
          ...state,
          cartItems: {
            ...state.cartItems,
            items: state.cartItems.items?.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            totalItems: { ...(state.cartItems.totalItems + 1) },
            totalPrice: { ...(state.cartItems.totalPrice + totalCalculated)}
          },
        };
      } else {
        return {
          ...state,
          cartItems: {
            ...state.cartItems,
            items: [
              ...state.cartItems.items,
              { ...action.payload, quantity: 1 },
            ],
            totalItems: { ...(state.cartItems.totalItems + 1) },
            totalPrice: { ...(state.cartItems.totalPrice + totalCalculated)}
          },
        };
      }
    case REMOVE_FROM_CART:
      // Items que quedan
      const updatedItems = state.cartItems.items.filter(
        (item) => item.id !== action.payload
      );
      // Calculo nuevo total de items
      const newTotalItems = updatedItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      // Calculo nuevo total de precio
      const newTotalPrice = updatedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          items: updatedItems,
          totalItems: newTotalItems,
          totalPrice: newTotalPrice,
        },
      };
    case REMOVE_ONE:
      const existingItemToRemove = state.cartItems.items?.find(
        (item) => item.id === action.payload
      );
      if (existingItemToRemove) {
        if (existingItemToRemove.quantity > 1) {
          return {
            ...state,
            cartItems: {
              ...state.cartItems,
              items: state.cartItems.items.map((item) =>
                item.id === action.payload
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            },
          };
        } else {
          return {
            ...state,
            cartItems: {
              ...state.cartItems,
              items: state.cartItems.items.filter(
                (item) => item.id !== action.payload
              ),
            },
          };
        }
      }
      return state;
    case CLEAR_CART:
      return {
        ...state,
        cartItems: {
          items: [], 
          userId: state.cartItems.userId,
          totalItems: 0, 
          totalPrice: 0, 
          keyword: "", 
          discountPercentage: 0,
        },
      };
    //Puedo estar sumando al estado del checkoutOrder el array de productos y el codigo de descuento.
    //Debo cambiar el back para reciibir esto y no el request que está ahora. Array de id y count, y string de descuento si hay
    case VALIDATE_VOUCHER:
      return { ...state, discountVoucher: action.payload };
    case ADD_DISCOUNT_PERCENTAGE:
      let newTotal = 0;
      const totalPrice = state.cartItems.totalPrice;
      if(totalPrice > 0){
        const discountPercentage = action.payload.discountPercentage
        newTotal = totalPrice * (1 - discountPercentage / 100);
      }
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          totalPrice: newTotal,
          keyword: action.payload.keyword,
          discountPercentage: action.payload.discountPercentage,
        },
      };
      case DO_ADDCAT:
        return [ ...state.categories, ...state.categories, action.payload ];
      case CONFIRM_ORDER:
        return { ...state, ...action.payload };
      case FETCH_PROFILE:
        return { ...state, userProfile: action.payload }; 
    default:
      return state;
  }
}

// const rootReducer = combineReducers({
//   // Esto es para usar muchos reducers, entonces tenes ponele, uno por feature.
//   posts: postReducer,
//   products: productsReducer,
// });
export default rootReducer;
