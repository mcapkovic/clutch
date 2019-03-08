import React, { Component } from "react";
import clutch2 from "../assets/clutch2.svg";
import "./App.css";
import ValueInputField from "./ValueInputField";
import HistoryOverlay from "./HistoryOverlay";

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

function findEmptyFields(fieldsArray){
  console.log(fieldsArray)
  return fieldsArray.filter(field => field === "").length
}

function findResultField(alpha, betha, inputA, inputD){
  
  !alpha && document.getElementById("alpha").classList.add("result-field");
  !betha && document.getElementById("bethaInput").classList.add("result-field");
  !inputA && document.getElementById("inputA").classList.add("result-field");
  !inputD && document.getElementById("inputD").classList.add("result-field");
}

function removeResultStyle(){
  document.getElementById("alpha").classList.remove("result-field");
  document.getElementById("bethaInput").classList.remove("result-field");
  document.getElementById("inputA").classList.remove("result-field");
  document.getElementById("inputD").classList.remove("result-field");
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
    this.handleClearClick = this.handleClearClick.bind(this);
  }

  handleHistoryClick() {
    document.getElementById("history").classList.toggle("history-open");
  }

  async handleInputChange(event) {
    let { name, value } = event.target;
    await this.setState({ [name]: value });
    let { alpha, betha, inputA, inputD} = this.state;

    const emptyFieldsCount = findEmptyFields([alpha, betha, inputA, inputD]);
    console.log(emptyFieldsCount)
    emptyFieldsCount === 1 && findResultField(alpha, betha, inputA, inputD);
    emptyFieldsCount > 1 && removeResultStyle();

    // this.state.inputA
    //   ? document.getElementById("bethaInput").classList.add("result-field")
    //   : document.getElementById("bethaInput").classList.remove("result-field");
  }

  handleClearClick(event) {
    event.target.value = '';
    this.handleInputChange(event);
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
        <ValueInputField
          id="inputD"
          name="inputD"
          label="D - priemer"
          value={this.state.inputD}
          onChange={this.handleInputChange}
          onClearClick={this.handleClearClick}
        />

        <ValueInputField
          id="inputA"
          name="inputA"
          label="a - zvysla vzdialenost"
          value={this.state.inputA}
          onChange={this.handleInputChange}
          onClearClick={this.handleClearClick}
        />

        <ValueInputField
          id="alpha"
          name="alpha"
          label="α - uhol rampy"
          value={this.state.alpha}
          onChange={this.handleInputChange}
          onClearClick={this.handleClearClick}
        />

        <ValueInputField
          id="bethaInput"
          name="betha"
          label="β - uhol pootocenia"
          value={this.state.betha}
          onChange={this.handleInputChange}
          onClearClick={this.handleClearClick}
          // isDisabled={this.state.inputA}
        />

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

        <div className="margin-top-big center-text">
          <img src={clutch2} className="App-logo" alt="logo" />
        </div>


        <HistoryOverlay 
          handleHistoryClick={this.handleHistoryClick}
          history={this.state.history}
        />

      </div>
    );
  }
}

export default App;
