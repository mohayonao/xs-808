"use strict";

const React = require("react");

class App extends React.Component {
  render() {
    const { actions, bpm } = this.props;
    const changeBPM = e => actions.changeBPM(+e.target.value);

    return (
      <div>
        <button onClick={ actions.togglePlay }>start</button>
        <div>
          BPM: <input type="range" value={ bpm } min="80" max="200" onChange={ changeBPM }/>
        </div>
        { this.renderMatrix() }
      </div>
    );
  }

  renderMatrix() {
    const { actions, isPlaying, matrix, beat } = this.props;
    const matrixElem = matrix.map((track, i) => {
      const trackElem = track.map((value, j) => {
        const style = { color: isPlaying && (beat === j) ? "red" : "black" };
        const toggleMatrix = () => actions.toggleMatrix(i, j);

        return (
          <span key={ j } style={ style } onClick={ toggleMatrix }>{ value ? "■" : "□" }</span>
        );
      });
      return (
        <div key={ i }>{ trackElem }</div>
      );
    });

    return (
      <div>{ matrixElem }</div>
    );
  }
}

App.propTypes = {
  actions  : React.PropTypes.object.isRequired,
  bpm      : React.PropTypes.number.isRequired,
  matrix   : React.PropTypes.array.isRequired,
  isPlaying: React.PropTypes.bool.isRequired,
  beat     : React.PropTypes.number.isRequired,
};

module.exports = App;
