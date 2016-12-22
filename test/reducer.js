"use strict";

require("run-with-mocha");

const assert = require("assert");
const reducer = require("../src/reducer");

const initState = (opts) => {
  return Object.assign({
    isPlaying: false,
    bpm: 134,
    matrix: [
      [ 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, ],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ],
      [ 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, ],
      [ 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, ],
    ],
    beat: 0
  }, opts);
};

describe("reducer", () => {
  it("should handle initial state", () => {
    const actual = reducer(undefined, {});
    const expected = initState({ matrix: actual.matrix });

    assert.deepEqual(actual, expected);
  });

  it("should handle TOGGLE_PLAY", () => {
    const actual = reducer(initState(), { type: "TOGGLE_PLAY" });
    const expected = initState({ isPlaying: true });

    assert.deepEqual(actual, expected);
  });

  it("should handle CHANGE_BPM", () => {
    const actual = reducer(initState(), { type: "CHANGE_BPM", bpm: 140 });
    const expected = initState({ bpm: 140 });

    assert.deepEqual(actual, expected);
  });

  it("should handle TOGGLE_MATRIX", () => {
    const actual = reducer(initState(), { type: "TOGGLE_MATRIX", row: 2, col: 1 });
    const expected = initState();

    expected.matrix[2][1] = 1 - expected.matrix[2][1];
    assert.deepEqual(actual, expected);
  });

  it("should handle TICK", () => {
    const actual = reducer(initState(), { type: "TICK", beat: 1 });
    const expected = initState({ beat: 1 });

    assert.deepEqual(actual, expected);
  });
});
