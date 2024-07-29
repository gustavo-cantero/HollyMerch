import React from 'react';

const CouponItem = ({ coupon }) => {
  return (
    <div className="coupon-item">
      <h3>{coupon.keyword}</h3>
      <p>Discount: {coupon.discountPercentage}%</p>
      <p>{coupon.active ? 'Active' : 'Inactive'}</p>
      {/* Add edit and delete buttons here */}
    </div>
  );
};

export default CouponItem;
