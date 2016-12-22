"use strict";

require("run-with-mocha");

const assert = require("assert");
const actions = require("../src/actions");

describe("actions", () => {
  it("togglePlay should create TOGGLE_PLAY action", () => {
    assert.deepEqual(actions.togglePlay(), { type: "TOGGLE_PLAY" });
  });

  it("changeBPM should create CHANGE_BPM action", () => {
    assert.deepEqual(actions.changeBPM(140), { type: "CHANGE_BPM", bpm: 140 });
  });

  it("toggleMatrix should create TOGGLE_MATRIX action", () => {
    assert.deepEqual(actions.toggleMatrix(1, 2), { type: "TOGGLE_MATRIX", row: 1, col: 2 });
  });

  it("tick should create TICK action", () => {
    assert.deepEqual(actions.tick(1), { type: "TICK", beat: 1 });
  });

  it("changeVisibility should create CHANGE_VISIBILITY action", () => {
    assert.deepEqual(actions.changeVisibility("visible"), { type: "CHANGE_VISIBILITY", visibilityState: "visible" });
  });
});
