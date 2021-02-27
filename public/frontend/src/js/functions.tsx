import InputHint from "#components/reusable/input-hint/input-hint";
import React from "react";
import {FieldRenderProps} from "react-final-form";


export const highlightJSON = (jsonString: string): string => {
  jsonString = jsonString.replace(/&/g, `&amp;`).replace(/</g, `&lt;`).replace(/>/g, `&gt;`);
  return jsonString.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
    let cls = `json-number`;
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = `json-key`;
      } else {
        cls = `json-string`;
      }
    } else if (/true|false/.test(match)) {
      cls = `json-boolean`;
    } else if (/null/.test(match)) {
      cls = `json-null`;
    }
    return `<span class="${cls}">${match}</span>`;
  });
};


export const createInput = (data: FieldRenderProps<string>): JSX.Element => {
  const {autofocus = false, input, icon, disabled = false, placeholder = ``, textarea = false, className = ``} = data;
  const instError = data.meta.error && data.meta.modified;
  const submError = (data.meta.submitError || data.meta.submitFailed) && !data.meta.active;

  const errorText = data.meta.error || ``;
  const error = (instError || submError) && errorText;

  const chooseTextarea = () => (textarea)
    ? (
      <>
        <textarea rows={textarea} {...input} autoFocus={autofocus} disabled={disabled} placeholder={placeholder}
                  className={`uk-input${(error) ? ` uk-form-danger` : ``}${(className) ? ` ${className}` : ``}`}/>
        {(error) ? (
          <InputHint className={`uk-position-center-right`} text={errorText}/>
        ) : undefined}
      </>
    ) : (
      <>
        <input {...input} autoFocus={autofocus} disabled={disabled} placeholder={placeholder}
               className={`uk-input${(error) ? ` uk-form-danger` : ``}${(className) ? ` ${className}` : ``}`}/>
        {(error) ? (
          <InputHint className={`uk-position-center-right`} text={errorText}/>
        ) : undefined}
      </>
    );
  return (
    <div>
      <div className={`uk-inline uk-width-1-1 `}>
        <span className={`uk-form-icon`} uk-icon={`icon: ${icon}`}/>
        {chooseTextarea()}
      </div>
    </div>
  );
};
