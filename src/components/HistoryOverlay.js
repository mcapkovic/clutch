import React from "react";

function HistoryOverlay(props) {
  return (
    <div className="overlay" id="history">
      <button
        className="my-button crt-text-shadow"
        onClick={props.handleHistoryClick}
      >
        History
      </button>
      <ul className="crt-text-shadow center-text">
        {props.history.map(calculation => (
          <li>
            <ul className="margin-top-small">
              <li>{`α: ${calculation.alpha}`}</li>
              <li>{`β: ${calculation.betha}`}</li>
              <li>{`D: ${calculation.inputD}`}</li>
              <li>{`A: ${calculation.inputA}`}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryOverlay;
