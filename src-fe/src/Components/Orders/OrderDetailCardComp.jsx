const OrderDetailCardComp = ({ productName, count, price }) => {
  return (
    <>
      <h3>{productName}</h3>
      <p>{count}</p>
      <p>{price}</p>
    </>
  );
};

export default OrderDetailCardComp;
