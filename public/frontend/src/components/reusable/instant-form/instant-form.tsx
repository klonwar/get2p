import {Form} from "react-final-form";
import React, {FC} from "react";
import SendInputs from "#components/reusable/send-form/send-inputs";
import {connect} from "react-redux";
import {InstantActions} from "#src/js/redux/reducers/slices/instant-slice";
import InstantSend from "#components/reusable/instant-form/instant-send";
import {SendFormData} from "#components/reusable/send-form/send-form";
import {Token} from "#server/src/model/token";
import UKCard from "#components/reusable/uk-card/uk-card";

const mapDispatchToProps = (dispatch) => ({
  setInstantTokenString: (data: string) => dispatch(InstantActions.setToken(data))
});

interface Props extends ReturnType<typeof mapDispatchToProps> {
  formID?: string,
  onSubmit?: (values: SendFormData) => void
}

const InstantForm: FC<Props> = (props) => {
  const {
    formID = `instant-form`,
    onSubmit = () => {},
    setInstantTokenString
  } = props;

  return (
    <div className={`uk-text-center`} uk-grid={``} uk-height-match={`target: > .instant-form-block`}>
      <div className={`uk-width-1-2@m instant-form-block`}>
        <UKCard>
          <Form onSubmit={onSubmit}
                render={() => {
                  return (
                    <>
                      <SendInputs
                        formID={formID}
                        onChange={({values: newValues}) => {
                          setInstantTokenString((new Token({
                            ...newValues,
                            redirectTo: ``,
                            shortLink: false
                          })).toEncryptedString());
                        }}
                      />
                    </>
                  );
                }}/>
        </UKCard>
      </div>
      <div className={`uk-width-1-2@m instant-response-block`}>
        <UKCard className={`uk-height-1-1 uk-padding-remove`}>
          <InstantSend/>
        </UKCard>
      </div>
    </div>
  );
};


export default connect(null, mapDispatchToProps)(InstantForm);
