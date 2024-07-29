import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { fetchDetails } from "../../Redux/Actions";
import { GET_ORDER_DETAILS } from "../../Redux/ActionTypes";
import OrderDetailCardComp from "./OrderDetailCardComp";

const OrderDetailComp = () => {
const orderDetailList = useSelector((state) => state.details.orderDetailList); //estado de detalles
const dispatch = useDispatch(); //dispatcher
const { id } = useParams(); // Obtengo id desde url

useEffect(() => {
  // Busca detalles cuando se monta el componente
  fetchDetails(id)
    .then((fetchedDetails) => {
      // Despacha la acción con la información obtenida
      dispatch({
        type: GET_ORDER_DETAILS,
        payload: fetchedDetails,
      });
      console.log(fetchDetails);
    })
    .catch((error) => {
      // Manejo el error
      console.error("Error fetching order details:", error);
    });
}, [dispatch]);

  return (
    <>
      Detalles de la orden {id}
      {console.log(orderDetailList[0])}
      {console.log(orderDetailList[0].orderDetails)}
      <div>
        {orderDetailList[0].orderDetails.map((detail) => (
          <OrderDetailCardComp
            key={detail.id}
            productName={detail.productName}
            count={detail.count}
            price={detail.price}
          />
        ))}  
      </div>    
    </>
  );
};
export default OrderDetailComp;
