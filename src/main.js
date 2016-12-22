"use strict";

const React = require("react");
const ReactDOM  = require("react-dom");
const { createStore, applyMiddleware, bindActionCreators } = require("redux");
const { Provider, connect } = require("react-redux");
const App = require("./App");
const Sequencer = require("./Sequencer");
const reducer = require("./reducer");
const actionCreators = require("./actions");

window.AudioContext = window.AudioContext || window.webkitAudioContext;

const inject = func => () => next => action => next(func(action) || action);

window.addEventListener("DOMContentLoaded", () => {
  const store = createStore(reducer, applyMiddleware(inject(audioHandler)));
  const actions = bindActionCreators(actionCreators, store.dispatch);
  const Container = connect(state => state)(App);
  const audioContext = new AudioContext();
  const sequencer = new Sequencer(audioContext, actions);

  function audioHandler(action) {
    sequencer.doAction(action);
  }

  sequencer.setState(store.getState());

  store.subscribe(() => {
    sequencer.setState(store.getState());
  });

  ReactDOM.render(
    <Provider store={ store }>
      <Container actions={ actions }/>
    </Provider>
  , document.getElementById("app"));
});
