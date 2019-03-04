import React from "react";

function InputData(props){
    return(
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            <div className="inputAddOn">
            <input
                className="crt-text-shadow input-field"
                name={props.id}
                type="number"
                autoComplete="off"
                id={props.id}
                value={props.value}
                onChange={props.onChange}
            />
            <button class="my-button clear-field-button button-effect">clear</button>
            </div>
        </div>
    )
}

export default InputData;