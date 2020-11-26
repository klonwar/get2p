import PropTypes from "prop-types";
import React from "react";
import FlexGroup from "#components/small/flex-group/flex-group";
import ChildrenDuplicator from "#components/small/children-duplicator/children-duplicator";

const FlexM = (props) => (
  <FlexGroup>
    <ChildrenDuplicator
      firstProps={{
        "className": `uk-flex uk-width-1-1 uk-flex-between  uk-flex-wrap uk-visible@m`,
        "uk-margin": `margin: uk-margin-top`
      }}
      secondProps={{
        "className": `uk-text-right uk-flex uk-flex-column  uk-hidden@m`,
        "uk-margin": `margin: uk-margin-top`
      }}
      {...props}
    />
  </FlexGroup>
);

FlexM.propTypes = {
  children: PropTypes.node
};

export default FlexM;
