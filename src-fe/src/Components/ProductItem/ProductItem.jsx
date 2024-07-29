import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const ProductItem = ({ product, toEdit, toDelete }) => {
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td className="text-truncate">{product.description}</td>
      <td>{product.stock}</td>
      <td>$ {product.price.toFixed(2)}</td>
      <td className="text-center">
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="mx-1"
          onClick={() => toEdit(product)}
          style={{ cursor: "pointer" }}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="mx-1"
          onClick={() => toDelete(product)}
          style={{ cursor: "pointer" }}
        />
      </td>
    </tr>
  );
};
export default ProductItem;
