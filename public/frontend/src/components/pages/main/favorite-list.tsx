import React, {FC} from "react";
import {faviconsSelector, favoriteSelector} from "#src/js/redux/selectors";
import {FavoriteActions, TokenUuidPair} from "#src/js/redux/reducers/slices/favorite-slice";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const mapStateToProps = (state) => ({
  favorite: favoriteSelector(state),
  favicons: faviconsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  removeFromFavorite: (data: TokenUuidPair) => dispatch(FavoriteActions.removeFromFavorite(data)),
});

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
}

const FavoriteList: FC<Props> = (props) => {
  const {favorite, favicons} = props;
  const {removeFromFavorite} = props;

  if (!favorite || Object.keys(favorite).length === 0) {
    // Пустое место для центрирования, если избранного нет
    return <div className={`uk-width-1-4@m uk-visible@s`}/>;
  }

  const renderFavoriteList = (): JSX.Element => (
    <>
      {Object.keys(favorite).map((key) => (
        <Link
          to={favorite[key].link}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest(`.red-closing-sign`)) {
              e.preventDefault();
            }
          }}
          key={key}
          className={`uk-flex uk-flex-middle uk-card uk-card-body uk-card-default uk-card-small uk-card-hover uk-text-left card-link uk-link-reset`}>
          <img
            alt={``}
            className={`uk-icon-image`}
            src={favicons[favorite[key].domain]?.data}
          />
          <div
            className={`uk-width-expand uk-text-left uk-flex uk-flex-center uk-padding-small uk-padding-remove-vertical`}>
            <div className={`uk-flex uk-flex-column uk-width-1-1`}>
              <span className={` favorite-label`}>{favorite[key].name}</span>
              <div>
                {favorite[key].labels.map((item) => (
                  <span
                    key={item.text}
                    className={`uk-margin-small-right uk-label ${item.className}`}>
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <span
            className={`red-closing-sign`}
            uk-icon={`icon: close`}
            onClick={() => {
              removeFromFavorite({tokenString: key});
            }}
          />
        </Link>
      ))}
    </>
  );

  return (
    <>
      <div className={`uk-width-1-4@m uk-visible@s`} uk-margin={``}>
        <div className={`uk-card uk-card-body uk-card-default uk-text-left`}>
          <h3 className={`uk-card-title`}>Избранное</h3>
        </div>
        <div uk-margin={``}>
          {renderFavoriteList()}
        </div>

      </div>
      <ul className={`uk-width-1-4@m uk-hidden@s`} uk-margin={``}
          uk-accordion={``}>
        <li>
          <div
            className={`uk-accordion-title uk-card uk-card-body uk-card-default uk-card-small uk-card-title uk-card-hover uk-text-left uk-h3 uk-margin-remove`}
            style={{color: `#333`}}>
            Избранное
          </div>

          <div className={`uk-accordion-content`}>
            {renderFavoriteList()}
          </div>
        </li>
      </ul>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteList);