import React, { Component } from "react";
import logo from "./logo.svg";
import clutch from "./clutch.svg";
import clutch2 from "./clutch2.svg";
import "./App.css";
import InputData from "./InputData";

function calculateMissing(inputAlpha, inputBetha, inputD, inputA) {
  let alpha;
  let betha;
  if (inputAlpha) {
    alpha = inputAlpha;
    betha =
      (360 * inputA) /
      (Math.PI * inputD * Math.tan((inputAlpha * Math.PI) / 180));
  }
  // else if(inputBetha){
  //   alpha = (360 * inputD * inputBetha * Math.tan(alpha))/360;
  //   betha = inputBetha;
  // }
  return { alpha, betha };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alpha: "",
      betha: "",
      inputD: "",
      inputA: "",
      history: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);

    this.handleCalculateClick = this.handleCalculateClick.bind(this);
  }

  handleHistoryClick() {
    document.getElementById("history").classList.toggle("history-open");
  }

  async handleInputChange(event) {
    let { name, value } = event.target;
    await this.setState({ [name]: value });

    this.state.inputA
      ? document.getElementById("bethaInput").classList.add("result-field")
      : document.getElementById("bethaInput").classList.remove("result-field");
  }

  handleCalculateClick() {
    let {
      alpha: inputAlpha,
      betha: inputBetha,
      inputD,
      inputA,
      history
    } = this.state;

    let { alpha, betha } = calculateMissing(
      Number(inputAlpha),
      Number(inputBetha),
      Number(inputD),
      Number(inputA)
    );

    let newHistory = history;
    newHistory.unshift({ alpha, betha, inputD, inputA });
    newHistory.length > 5 && newHistory.pop();

    this.setState({
      alpha,
      betha,
      history: newHistory
    });
  }

  render() {
    return (
      <div className="App">
        <InputData
          id="inputD"
          label="D - priemer"
          value={this.state.inputD}
          onChange={this.handleInputChange}
        />

        {/* <label htmlFor="inputD">D - priemer</label>
        <div className="inputAddOn">
          <input
            className="crt-text-shadow input-field"
            name="inputD"
            type="number"
            autoComplete="off"
            id="inputD"
            value={this.state.inputD}
            onChange={this.handleInputChange}
          />
          <button class="my-button clear-field-button button-effect">clear</button>
        </div> */}

        <InputData
          id="inputA"
          label="a - zvysla vzdialenost"
          value={this.state.inputA}
          onChange={this.handleInputChange}
        />

        {/* <label htmlFor="inputA">a - zvysla vzdialenost</label>
        <input
          className="crt-text-shadow input-field"
          name="inputA"
          type="number"
          autoComplete="off"
          id="inputA"
          value={this.state.inputA}
          onChange={this.handleInputChange}
        /> */}

        <InputData
          id="alpha"
          label="α - uhol rampy"
          value={this.state.alpha}
          onChange={this.handleInputChange}
        />

        {/* <label htmlFor="alpha">α - uhol rampy</label>
        <input
          className="crt-text-shadow input-field"
          name="alpha"
          type="number"
          autoComplete="off"
          id="alpha"
          value={this.state.alpha}
          onChange={this.handleInputChange}
        /> */}

        <InputData
          id="bethaInput"
          label="β - uhol pootocenia"
          value={this.state.betha}
          onChange={this.handleInputChange}
        />

        {/* <label htmlFor="bethaInput">β - uhol pootocenia</label>
        <input
          disabled={this.state.inputA}
          className="crt-text-shadow input-field"
          name="betha"
          type="number"
          autoComplete="off"
          id="bethaInput"
          value={this.state.betha}
          onChange={this.handleInputChange}
        /> */}

        <button
          className="my-button margin-top-small button-effect crt-text-shadow"
          onClick={this.handleCalculateClick}
        >
          Calculate
        </button>

        <button
          className="my-button margin-top-small crt-text-shadow"
          onClick={this.handleHistoryClick}
        >
          History
        </button>

        <img src={clutch2} className="App-logo" alt="logo" />
        <div className="overlay" id="history">
          <button
            className="my-button crt-text-shadow"
            onClick={this.handleHistoryClick}
          >
            History
          </button>
          <ul className="crt-text-shadow">
            {this.state.history.map(calculation => (
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
      </div>
    );
  }
}

export default App;
