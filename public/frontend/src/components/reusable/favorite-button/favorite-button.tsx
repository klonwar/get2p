import React, {useEffect, useState} from "react";
import filledStar from "#src/icons/star-filled.svg";
import emptyStar from "#src/icons/star-empty.svg";
import {connect} from "react-redux";
import {favoriteSelector} from "#src/js/redux/selectors";
import {FavoriteActions, TokenUuidPair} from "#src/js/redux/reducers/slices/favorite-slice";
import isUndefined from "#src/js/core/functions/is-undefined";

const mapStateToProps = (state) => ({
  favorite: favoriteSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  addToFavorite: (data: TokenUuidPair) => dispatch(FavoriteActions.addToFavorite(data)),
  removeFromFavorite: (data: TokenUuidPair) => dispatch(FavoriteActions.removeFromFavorite(data)),
});

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
  tokenString: string,
  uuid: string
}

const FavoriteButton: React.FC<Props> = (props) => {
  const {tokenString, uuid, addToFavorite, removeFromFavorite, favorite} = props;
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(!isUndefined(favorite?.[tokenString]) || !isUndefined(favorite?.[uuid]));
  }, [favorite, tokenString, uuid]);

  return (
    <button className={`uk-link uk-padding-small`} onClick={() => {
      if (active) {
        removeFromFavorite({tokenString, uuid});
      } else {
        addToFavorite({tokenString, uuid});
      }
    }} uk-icon={``}>
      <img alt={`favorite`} className={`uk-icon-image ${(active) ? `` : `uk-hidden`}`} src={filledStar} uk-svg={``}/>
      <img alt={`favorite`} className={`uk-icon-image ${(active) ? `uk-hidden` : ``}`} src={emptyStar} uk-svg={``}/>
    </button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
