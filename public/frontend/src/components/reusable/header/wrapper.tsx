import React from "react";
import Header from "#components/reusable/header/header";

const Wrapper: React.FC = (props) => {
  const {children} = props;
  return (
    <>
      <Header/>
      <div>
        {children}
      </div>
    </>
  );
};
export default Wrapper;
