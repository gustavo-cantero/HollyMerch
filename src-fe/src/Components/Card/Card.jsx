import style from "./Card.module.css";

// const Card = () => {
//   return (
//     <>
//       <h1 className={style.logo}>Soy una Card</h1>
//       <h2>Nombre: Roberta</h2>
//       <p1>Mail: tuvieja@tuvieja.com</p1>
//     </>
//   );
// };

const Card = ({ id, total, itemsQty, user }) => {
  return (
    <>
      <h4>{id}</h4>
      <h3>{total}</h3>
      <p>{itemsQty}</p>
      <p>{user}</p>
    </>
  );
};

export default Card; //Gracias a esto cualquiera puede ver el componente.
