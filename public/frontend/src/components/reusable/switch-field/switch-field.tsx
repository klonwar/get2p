import React, {useCallback} from "react";
import {Field, useField, useForm} from "react-final-form";

interface SwitchButtonProps extends Props {
  placeholder: string
}

const SwitchButton: React.FC<SwitchButtonProps> = (props) => {
  const {name, className, placeholder, options} = props;
  const radioFields = useField(name);
  const form = useForm();

  const getCurrentOption = () => {
    return options.find((item) => item.value === radioFields.input.value);
  };

  const getNextOption = () => {
    const currentIndex = options.findIndex((item) => item.value === radioFields.input.value);
    return options[(currentIndex + 1) % options.length];
  };

  return (
    <button
      className={`${className} uk-position-relative uk-height-auto uk-flex uk-flex-middle uk-flex-center uk-button uk-button-secondary uk-padding-remove uk-margin-small-right`}
      onClick={() => form.change(name, getNextOption().value)} type={`button`}>
      <div>
        <span uk-icon={`icon: chevron-left`}/>
        <span className={`uk-invisible`}>{placeholder}</span>
        <span uk-icon={`icon: chevron-right`}/>
      </div>
      <div className={`uk-position-center`}>
        <span>{getCurrentOption().label || getCurrentOption().value}</span>
      </div>
    </button>
  );
};

interface SwitchOptions {
  label?: string,
  value: string
}

interface Props {
  options: Array<SwitchOptions>
  name: string,
  className?: string,
}

const SwitchField: React.FC<Props> = (props) => {
  const {
    options,
    name,
    className = ``
  } = props;

  const getLongestLabel = useCallback(() => {
    let longest = ``;
    for (const item of options) {
      if (item.label?.length > longest.length) {
        longest = item.label;
      } else if (item.value.length > longest.length) {
        longest = item.value;
      }
    }
    return longest;
  }, [options]);

  return (
    <>
      <div className={`uk-hidden`}>
        {options.map((item) => (
          <span key={`${name}_${item.value}`}>
            <Field
              name={name}
              component={`input`}
              type={`radio`}
              value={item.value}
              initialValue={item.value}
            />
            <label>{item.label || item.value}</label>
          </span>
        ))}
      </div>

      <SwitchButton name={name} placeholder={getLongestLabel()} className={className} options={options}/>
    </>
  );
};

export default SwitchField;
