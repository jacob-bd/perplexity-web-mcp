/**
 * @fileoverview StreamingWorkletProcessor, the AudioWorkletProcessor
 * for the Google text-to-speech extension.
 *
 * An AudioWorkletProcessor runs in the audio thread, it can only communicate
 * with the rest of the extension via message-passing.
 *
 * The design is very simple: It listens for just two commands from the
 * corresponding AudioWorkletNode's message port: 'addBuffer' gets a single
 * buffer of mono float32 audio samples, in exactly the length expected
 * by AudioWorkletProcessor.process, and adds it to a queue. 'clearBuffers'
 * clears the queue. Then, every time |process| is called, it just shifts
 * the front of the queue and outputs it.
 */
class StreamingWorkletProcessor extends AudioWorkletProcessor {
  constructor() {
    super();

    this.port.onmessage = this.onEvent.bind(this);

    // TODO: add type annotations
    this.buffers_ = [];
    this.active_ = false;
    this.first_ = true;
    this.id_ = 0;
  }

  /**
   * Implement process() from the AudioWorkletProcessor interface.
   * TODO: find externs so we can use @override.
   * @param {!object} inputs Unimportant here since we only do audio output.
   * @param {!object} outputs sequence<sequence<Float32Array>> the output
   *     audio buffer that is to be consumed by the user agent.
   * @return {boolean} True to keep processing audio.
   */
  process(inputs, outputs) {
    if (!this.active_) {
      return true;
    }

    if (this.buffers_.length == 0) {
      this.active_ = false;
      this.port.postMessage({id: this.id_, type: 'empty'});
      return true;
    }

    let buffer = this.buffers_.shift();
    let output = outputs[0];
    if (this.first_) {
      this.first_ = false;
    }
    for (let channel = 0; channel < output.length; ++channel)
      output[channel].set(buffer);

    return true;
  }

  /**
   * Handle events sent to our message port.
   * @param {!DOMEvent} event The incoming event.
   */
  onEvent(event) {
    switch (event.data.command) {
      case 'addBuffer':
        this.id_ = event.data.id;
        this.active_ = true;
        this.buffers_.push(event.data.buffer);
        break;
      case 'clearBuffers':
        this.id_ = 0;
        this.active_ = false;
        this.buffers_.length = 0;
        break;
    }
  }
}

registerProcessor('streaming-worklet-processor', StreamingWorkletProcessor);
