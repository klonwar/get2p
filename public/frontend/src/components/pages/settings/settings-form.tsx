import React from "react";
import {Field, Form, withTypes} from "react-final-form";
import {settingsSelector} from "#src/js/redux/selectors";
import {connect} from "react-redux";
import {SettingsActions, SettingsList} from "#src/js/redux/reducers/slices/settings-slice";
import InvertibleCard from "#components/reusable/uk-card/uk-card";

const mapStateToProps = (state) => ({
  settings: settingsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  setSettings: (newSettings: SettingsList) => dispatch(SettingsActions.setSettings(newSettings))
});

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps>{
  formID?: string
}

const SettingsForm: React.FC<Props> = (props) => {
  const {
    formID = `settings-form`,
    settings,
    setSettings,
  } = props;

  const {FormSpy} = withTypes<SettingsList>();

  return (
    <div className={`uk-width-1-2@m`}>
      <InvertibleCard>
        <div className={`uk-card-title uk-position-relative uk-h3`}>
          <span>Настройки</span>
        </div>
        <Form onSubmit={() => {}}
              initialValues={settings}
              render={({handleSubmit}) => {
                return (
                  <form onSubmit={handleSubmit} id={formID} uk-margin={``}>
                    <FormSpy subscription={{values: true}} onChange={(state) => {
                      setSettings(state.values);
                    }}/>
                    <div>
                      <label>
                        <Field name={`accordionAlwaysOpened`}
                               component={`input`}
                               type={`checkbox`}
                               className={`uk-checkbox`}/>
                        <span>{` `}Дополнительные параметры запроса всегда открыты</span>
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field name={`darkTheme`}
                               component={`input`}
                               type={`checkbox`}
                               className={`uk-checkbox`}/>
                        <span>{` `}Темная тема</span>
                      </label>
                    </div>
                  </form>
                );
              }}/>
      </InvertibleCard>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm);