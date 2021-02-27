import React, {FC} from "react";
import InstantForm from "#components/reusable/instant-form/instant-form";

const Instant: FC = () => {
  return (
    <>
      <div className={`uk-padding uk-padding-remove-vertical`}>
          <InstantForm />
      </div>
    </>
  );
};

export default Instant;
