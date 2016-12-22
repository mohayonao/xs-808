"use strict";

const WebAudioScheduler = require("web-audio-scheduler");

class Sequencer {
  constructor(audioContext, actions) {
    this.audioContext = audioContext;
    this.actions = actions;
    this.sched = new WebAudioScheduler({ context: audioContext });
    this.buffers = [];
    this.bpm = 120;
    this.matrix = [];
    this.beat = 0;
    this.sequence = this.sequence.bind(this);

    [ "CB.WAV", "CH.WAV", "SD5050.WAV", "BD0000.WAV" ].forEach((filename, index) => {
      fetchAsAudioBuffer(audioContext, `samples/${ filename }`).then((audioBuffer) => {
        this.buffers[index] = audioBuffer;
      });
    });
  }

  setState(state) {
    this.bpm = state.bpm;
    this.matrix = state.matrix;
  }

  doAction(action) {
    switch (action.type) {
    case "TOGGLE_PLAY":
      if (this.sched.state === "suspended") {
        this.start();
      } else {
        this.stop();
      }
      break;
    case "CHANGE_VISIBILITY":
      if (action.visibilityState === "visible") {
        this.sched.aheadTime = 0.1;
      } else {
        this.sched.aheadTime = 1.0;
        this.sched.process();
      }
      break;
    }
  }

  start() {
    this.beat = 0;
    this.sched.start(this.sequence);
  }

  stop() {
    this.sched.stop();
  }

  sequence({ playbackTime }) {
    const duration = (60 / this.bpm) * (4 / 8);
    const destination = this.audioContext.destination;
    const nextPlaybackTime = playbackTime + duration;

    this.matrix.forEach((track, i) => {
      if (track[this.beat] && this.buffers[i]) {
        perc(destination, playbackTime, {
          buffer: this.buffers[i], volume: 0.2
        });
      }
    });
    this.actions.tick(this.beat);

    if (this.matrix[0]) {
      this.beat = (this.beat + 1) % this.matrix[0].length;
    }
    this.sched.insert(nextPlaybackTime, this.sequence);
  }
}

function fetchAsAudioBuffer(audioContext, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";

    xhr.onload = () => {
      if (xhr.response) {
        audioContext.decodeAudioData(xhr.response, resolve, reject);
      }
    };
    xhr.onerror = reject;

    xhr.send();
  });
}

function perc(destination, playbackTime, { buffer, volume }) {
  const t0 = playbackTime;
  const audioContext = destination.context;
  const bufferSource = audioContext.createBufferSource();
  const gain = audioContext.createGain();

  bufferSource.buffer = buffer;
  bufferSource.start(t0);
  bufferSource.connect(gain);

  gain.gain.value = volume;
  gain.connect(destination);
}

module.exports = Sequencer;
