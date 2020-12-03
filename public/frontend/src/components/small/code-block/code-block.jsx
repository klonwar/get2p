import React from "react";
import PropTypes from "prop-types";
import {highlightJSON} from "#src/js/functions";

const CodeBlock = (props) => {
  const {code = ``} = props;

  let highlightedCode;
  try {
    highlightedCode = JSON.stringify(JSON.parse(code), null, 2);
  } catch (e) {
    highlightedCode = code;
  }
  if (highlightedCode) {
    highlightedCode = highlightJSON(highlightedCode);
  }

  return (
    <pre className={`code-block`} style={{userSelect: `text`}} dangerouslySetInnerHTML={{__html: highlightedCode}} />
  );
};

CodeBlock.propTypes = {
  code: PropTypes.string
};

export default CodeBlock;