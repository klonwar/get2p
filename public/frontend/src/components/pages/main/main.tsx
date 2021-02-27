import React, {FC} from "react";
import {connect} from "react-redux";
import {uuidRequestPendingSelector,} from "#src/js/redux/selectors";
import OverlaySpinner from "#components/reusable/spinner-wrapper/overlay-spinner";
import FavoriteList from "#components/pages/main/favorite-list";
import MainForm from "#components/reusable/main-form/main-form";

const mapStateToProps = (state) => ({
  uuidRequestPending: uuidRequestPendingSelector(state),
});

interface Props extends ReturnType<typeof mapStateToProps> {
}

const Main: FC<Props> = (props) => {
  const {
    uuidRequestPending,
  } = props;

  return (
    <>
      <div className={`uk-padding uk-padding-remove-vertical`}>
        <div className={`uk-text-center`} uk-grid={``}>
          <FavoriteList/>
          <MainForm/>
        </div>
      </div>
      <OverlaySpinner
        style={uuidRequestPending ? {} : {opacity: `0`, zIndex: -1}}
      />
    </>
  );
};

export default connect(mapStateToProps)(Main);
