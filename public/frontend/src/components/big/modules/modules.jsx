import React from "react";

const Modules = () => {

  const printActiveModules = () => {
    const icons = [];
    const iconCreator = (icon) => (
      <div uk-icon={`icon: ${icon}`} className={`uk-padding`}>

      </div>
    );

    for (let i = 0; i < 3; i++) {
      icons.push(iconCreator(`file-text`));
    }
    icons.push(iconCreator(`plus`));

    return icons;
  };

  return (
    <div className={`uk-padding uk-padding-remove-vertical`}>
      <div className={`uk-text-center`}>
        <div className={`uk-flex uk-flex-around module-line`}>
          {printActiveModules()}
        </div>
      </div>
    </div>
  );
};

export default Modules;
