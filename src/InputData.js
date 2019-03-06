import React from "react";

function InputData(props) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <div className="inputAddOn">
        <input
          className="crt-text-shadow input-field flex-big"
          disabled={props.isDisabled}
          name={props.name}
          type="number"
          autoComplete="off"
          id={props.id}
          value={props.value}
          onChange={props.onChange}
        />
        <button
          name={props.name}
          class="my-button clear-field-button button-effect flex-small"
          onClick={props.onClearClick}
        >
          clear
        </button>
      </div>
    </div>
  );
}

export default InputData;
