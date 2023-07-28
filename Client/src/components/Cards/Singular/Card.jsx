import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { addFavorite, deleteFavorite } from "../../../redux/actions/actions";
// import { connect } from "react-redux";

export default function Card({
  name,
  species,
  onClose,
  gender,
  status,
  origin,
  image,
  id,
}) {
  //   console.log(props, "props"); cardInfo

  const dispatch = useDispatch(); // CREO UN DISPATCH
  const favorites = useSelector((state) => state.favorites); // ME TRAIGO "favorites" DEL GLOBAL 

  const [isFav, setIsFav] = useState(false);

  function handleClick() {
    //despachar el objeto de la accion
    if (isFav) {
      setIsFav(false);
      dispatch(deleteFavorite(id));
    } else {
      setIsFav(true);
      dispatch(
        addFavorite({
          name,
          species,
          onClose,
          gender,
          status,
          origin,
          image,
          id,
        })
      );
    }
  }

  useEffect(() => {
    // [{1} {3}]
    // {1 ❤️} {2🤍} {3❤️} {44🤍} {66🤍}
    favorites.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [favorites]);

  return (
    <div className={style.cardContainer}>

      {isFav ? (
        <button className={style.favButton} onClick={handleClick}>❤️</button>
      ) : (
        <button className={style.favButton} onClick={handleClick}>🤍</button>
      )}



      <h2 className={style.cardInfo}>{name}</h2>

      <Link to={`/detail/${id}`}>
        <img className={style.cardImage} src={image} alt={name} />
      </Link>


      {onClose ? (
        <button className={style.closeButton} onClick={() => onClose(id)}>
          X
        </button>
      ) : null}


    </div>
  );
}

// export function mapDispatchToProps(dispatch) {
// //   return {
//     addFavorite: function (character) {
//       // enviando una accion al reducer
//       // const objAction = addFavorite(character)
//       dispatch(addFavorite(character));
//     },
//     removeFavorites: function (id) {
//       dispatch(deleteFavorite(id));
//     },
//   };
// }

// export function mapStateToProps(globalState) {
//   return {
//     favorites: globalState.favorites,
//   };
// }

// voy a enviar nuevas props
// connect("recibo estado" , "despacho acciones")
// export default connect(mapStateToProps, { addFavorite, deleteFavorite })(Card);
