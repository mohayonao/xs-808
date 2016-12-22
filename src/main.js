"use strict";

const React = require("react");
const ReactDOM  = require("react-dom");
const { createStore, bindActionCreators } = require("redux");
const { Provider, connect } = require("react-redux");
const App = require("./App");
const Sequencer = require("./Sequencer");
const reducer = require("./reducer");
const actionCreators = require("./actions");

window.AudioContext = window.AudioContext || window.webkitAudioContext;

window.addEventListener("DOMContentLoaded", () => {
  const store = createStore(reducer);
  const actions = bindActionCreators(actionCreators, store.dispatch);
  const Container = connect(state => state)(App);
  const audioContext = new AudioContext();
  const sequencer = new Sequencer(audioContext);

  ReactDOM.render(
    <Provider store={ store }>
      <Container actions={ actions }/>
    </Provider>
  , document.getElementById("app"));
});
