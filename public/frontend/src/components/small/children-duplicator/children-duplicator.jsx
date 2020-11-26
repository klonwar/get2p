import PropTypes from "prop-types";
import React from "react";

const ChildrenDuplicator = ({children, firstProps, secondProps}) => (
  <>
    <div {...firstProps}>
      {children}
    </div>
    <div {...secondProps}>
      {children}
    </div>
  </>
);

ChildrenDuplicator.propTypes = {
  children: PropTypes.node,
  firstProps: PropTypes.object,
  secondProps: PropTypes.object,
};

export default ChildrenDuplicator;
