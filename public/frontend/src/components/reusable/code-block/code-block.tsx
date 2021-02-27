import React, {useEffect, useState} from "react";
import {highlightJSON} from "#src/js/functions";
import {useSelector} from "react-redux";
import {darkThemeSettingSelector} from "#src/js/redux/selectors";
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/github.css';

hljs.registerLanguage(`json`, json);
hljs.registerLanguage(`xml`, xml);
hljs.registerLanguage(`javascript`, javascript);

interface Props {
  code: string,
}

const CodeBlock: React.FC<Props> = (props) => {
  const {code = ``} = props;

  const [highlightedCode, setHighlightedCode] = useState<string>(undefined);
  const darkTheme = useSelector(darkThemeSettingSelector);

  useEffect(() => {
    setHighlightedCode(hljs.highlightAuto(code).value);
  }, [code]);

  return (
    <pre className={`code-block ${(darkTheme) ? `uk-light` : `uk-dark`}`} style={{userSelect: `text`}}>
        <span dangerouslySetInnerHTML={{__html: highlightedCode}}/>
    </pre>
  );
};

export default CodeBlock;