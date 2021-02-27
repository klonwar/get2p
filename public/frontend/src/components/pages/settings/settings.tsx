import React from "react";
import SettingsForm from "./settings-form";

const Settings: React.FC = () => {
  return (
    <div className={`uk-padding uk-padding-remove-vertical`}>
      <div className={`uk-text-center uk-flex uk-flex-center`}>


        <SettingsForm/>

      </div>
    </div>
  );
};

export default Settings;