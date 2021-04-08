import React from "react";
import {Helmet} from "react-helmet";
import {APPLICATION_NAME} from "#src/config";

interface Props {
  title?: string;
  description?: string;
}

const DescriptionHelmet: React.FC<Props> = (props) => {
  const {title, description} = props;

  const titleWithPostfix = (title) ? `${title} | ${APPLICATION_NAME}` : APPLICATION_NAME;

  return (
    <Helmet>
      <title>{titleWithPostfix}</title>
      <meta property={`og:title`} content={titleWithPostfix}/>

      <meta name={`description`} content={description}/>
      <meta property={`og:description`} content={description}/>
    </Helmet>
  );
};

export default DescriptionHelmet;