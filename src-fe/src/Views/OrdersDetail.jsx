import { useState } from "react";
import CardGroup from "react-bootstrap/CardGroup";
import OrderProduct from "../Components/OrderProduct";

const OrdersDetail = () => {
  const [products, setProducts] = useState([
    {
      name: "Producto 1",
      description: "Descripcion del producto 1",
      image:
        "https://http2.mlstatic.com/D_NQ_NP_2X_672716-MLA74339906760_022024-F.webp",
    },
    {
      name: "Producto 2",
      description: "Descripcion del producto 2",
      image:
        "https://http2.mlstatic.com/D_NQ_NP_2X_672716-MLA74339906760_022024-F.webp",
    },
    {
      name: "Producto 3",
      description: "Descripcion del producto 3",
      image:
        "https://http2.mlstatic.com/D_NQ_NP_2X_672716-MLA74339906760_022024-F.webp",
    },
  ]);

  return (
    <>
      Órdenes de compra
      <CardGroup>
        {products.map((value, idx) => (
          <OrderProduct key={idx} product={value} index={idx} />
        ))}
      </CardGroup>
    </>
  );
};
export default OrdersDetail;
