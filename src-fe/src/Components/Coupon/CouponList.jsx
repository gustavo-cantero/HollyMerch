// import ProductItem from "../ProductItem/ProductItem";

// const CouponList = () => {
//     return (
//         <>
//           <Modal show={showToDelete} backdrop="static" keyboard={false}>
//             <Modal.Header closeButton>
//               <Modal.Title>Eliminar producto</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               ¿Está seguro de eliminar el producto "{selectedProduct?.name}"?
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={() => setShowToDelete(false)}>
//                 Cancelar
//               </Button>
//               <Button variant="danger" onClick={delProduct}>
//                 Eliminar
//               </Button>
//             </Modal.Footer>
//           </Modal>
//           <div className={style.wrapper}>
//             {productList?.content.length > 0 ? (
//               <>
//                 <Table striped bordered hover>
//                   <thead>
//                     <tr>
//                       <th>Nombre</th>
//                       <th>Descripción</th>
//                       <th>Stock</th>
//                       <th>Precio</th>
//                       <th className="text-center">
//                         <FontAwesomeIcon
//                           icon={faSquarePlus}
//                           className="mx-1"
//                           style={{ cursor: "pointer" }}
//                         />
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {productList.content.map((value, idx) => (
//                       <ProductItem
//                         key={idx}
//                         product={value}
//                         index={idx}
//                         toEdit={handleToEdit}
//                         toDelete={handleToDelete}
//                       />
//                     ))}
//                   </tbody>
//                 </Table>
//                 <PaginationEx pageable={productList} goPage={goPage} />
//               </>
//             ) : (
//               <div class="d-flex justify-content-center animate__animated animate__flipInX animate__delay-2s">
//                 <Alert variant="warning" className="fs-2 text m-5">
//                   No se encontraron productos con las especificaciones ingresadas
//                   <div className="text-center mt-5">
//                     <FontAwesomeIcon icon={faFaceSadTear} size="6x" />
//                   </div>
//                 </Alert>
//               </div>
//             )}
//           </div>
//         </>
//       );
// }

// src/components/CouponList.js

// src/components/CouponList.js

// src/components/CouponList.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCoupon } from '../actions/couponActions';
import CouponItem from './CouponItem';

const CouponList = ({ coupons }) => {
  const dispatch = useDispatch();
  const [newCouponData, setNewCouponData] = useState({
    keyword: '',
    discountPercentage: '',
    active: true,
  });

  useEffect(() => {
    dispatch(fetchPostAction())
    console.log(postList) //En este caso como lo que estoy haciendo es mostrar la data cuando CARGO la pagina. hago el dispatch en useEffect, pero sino lo haria en onClick o algo asi. 
  }, [dispatch]);

  const handleAddCoupon = () => {
    // Validate form data (you can add more validation logic)
    if (!newCouponData.keyword || !newCouponData.discountPercentage) {
      alert('Please fill in all required fields.');
      return;
    }

    // Dispatch the ADD_COUPON action
    dispatch(addCoupon(newCoupon));

    // Clear form fields
    setNewCouponData({
      keyword: '',
      discountPercentage: '',
      active: true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setNewCouponData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  return (
    <div className="coupon-list-container">
      <div className="add-coupon-form">
        <input
          type="text"
          name="keyword"
          placeholder="Keyword"
          value={newCouponData.keyword}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="discountPercentage"
          placeholder="Discount Percentage"
          value={newCouponData.discountPercentage}
          onChange={handleInputChange}
        />
        <label>
          <input
            type="checkbox"
            name="active"
            checked={newCouponData.active}
            onChange={handleInputChange}
          />
          Active
        </label>
        <button onClick={handleAddCoupon}>Add Coupon</button>
      </div>
      <div className="coupon-list">
        {coupons.map((coupon) => (
          <CouponItem key={coupon.id} coupon={coupon} />
        ))}
      </div>
    </div>
  );
};

export default CouponList;

