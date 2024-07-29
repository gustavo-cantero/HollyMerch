import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { fetchOrders } from "../../Redux/Actions";
import { GET_ORDERS } from "../../Redux/ActionTypes";
import Card from "../Card/Card";

const OrderComp = () => {
  const orderList = useSelector((state) => state.orders.orderList);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // Fetch posts when the component mounts
  //   fetchOrders()
  //     .then((fetchedOrders) => {
  //       // Dispatch the action with the fetched data
  //       dispatch({
  //         type: GET_ORDERS,
  //         payload: fetchedOrders,
  //       });
  //       console.log(fetchOrders);
  //     })
  //     .catch((error) => {
  //       // Handle the error (e.g., show an error message)
  //       console.error("Error fetching orders:", error);
  //     });
  // }, [dispatch]);

  // return (
  //   <>
  //     <h4>Órdenes realizadas</h4>
  //     <div>
  //       {orderList.map((order) => (
  //         <Link
  //           to={`/orders/${order.id}`}
  //           key={order.id}
  //           style={{ textDecoration: "none" }}
  //         >
  //           <Card
  //             key={order.id}
  //             id={order.id}
  //             total={order.total}
  //             itemsQty={order.itemsQty}
  //             user={order.user.userName}
  //           />
  //         </Link>
  //       ))}
  //     </div>
  //     {/* <br />
  //     <Link to="/orders/1">Orden 1</Link>
  //     <br />
  //     <Link to="/orders/1">Orden 2</Link>
  //     <br />
  //     <Link to="/orders/1">Orden 3</Link>
  //     <br /> */}
  //   </>
  // );
};
export default OrderComp;
