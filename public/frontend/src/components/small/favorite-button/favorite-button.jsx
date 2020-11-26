import React, {useEffect, useState} from "react";
import {addToFavorite, removeFromFavorite, StorageHelper} from "#src/js/functions";
import filledStar from "#src/icons/star-filled.svg";
import emptyStar from "#src/icons/star-empty.svg";
import {FavoriteActions} from "#src/js/redux/reducers/slices/favorite-slice";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {favoriteSelector} from "#src/js/redux/selectors";

const FavoriteButton = (props) => {
  const {token, uuid, favoriteFromStorage, favorite} = props;
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(favorite?.[token] || favorite?.[uuid]);
  }, [favorite, token, uuid]);

  return (
    <button className={`uk-padding-small`} onClick={() => {
      // setFavorite(!isFavorite);
      if (favorite?.[token] || favorite?.[uuid]) {
        removeFromFavorite({token, uuid}, () => favoriteFromStorage());
      } else {
        addToFavorite({token, uuid}, () => favoriteFromStorage());
      }
    }} uk-icon={``}>
      <img alt={`favorite`} className={`uk-icon-image ${(active) ? `` : `uk-hidden`}`} src={filledStar} uk-svg={``} />
      <img alt={`favorite`} className={`uk-icon-image ${(active) ? `uk-hidden` : ``}`} src={emptyStar} uk-svg={``} />
    </button>
  );
};

FavoriteButton.propTypes = {
  token: PropTypes.string,
  uuid: PropTypes.string,
  favoriteFromStorage: PropTypes.func.isRequired,
  favorite: PropTypes.object
};

const mapStateToProps = (state) => ({
  favorite: favoriteSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  favoriteFromStorage: () => dispatch(FavoriteActions.favoriteFromStorage(undefined))
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
