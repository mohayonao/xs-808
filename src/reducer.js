"use strict";

const initMatrix = [
  [ 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, ],
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ],
  [ 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, ],
  [ 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, ],
];
const initState = { isPlaying: false, bpm: 134, matrix: initMatrix, beat: 0 };

module.exports = (state = initState, action) => {
  switch (action.type) {
  case "TOGGLE_PLAY":
    return Object.assign({}, state, { isPlaying: !state.isPlaying });
  case "CHANGE_BPM":
    return Object.assign({}, state, { bpm: action.bpm });
  case "TOGGLE_MATRIX": {
    const matrix = JSON.parse(JSON.stringify(state.matrix));
    matrix[action.row][action.col] = 1 - matrix[action.row][action.col];
    return Object.assign({}, state, { matrix });
  }
  case "TICK":
    return Object.assign({} ,state, { beat: action.beat });
  }
  return state;
};
