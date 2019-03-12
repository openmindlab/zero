import Logger from '@openmind/litelog';
import Events from '@openmind/zero-events';

const has = Object.prototype.hasOwnProperty;
let started = false;
const stack = [];
const applicationBroadcast = new Events({});
/**
 * Create a Broadcast object to dispatch/listen messages through the application
 */
const Broadcast = {
  /**
   *
   * @param {string} msg
   * @param {object} obj
   * @param {boolean} immediate
   */
  cast(msg, obj, immediate) {
    if (!started) {
      stack.push({
        msg,
        obj,
        immediate,
      });
    } else if (immediate) {
      applicationBroadcast.trigger(`msg:${msg}`, obj);
    } else {
      setTimeout(() => {
        applicationBroadcast.trigger(`msg:${msg}`, obj);
      }, 0);
    }
  },
  /**
   *
   * @param {string} msg
   * @param {Function} callback
   */
  grab(msg, callback) {
    /* callback.__Ref__ = (obj) => {
      obj = obj || {};
      obj.__msg__ = msg;
      callback(obj);
    }; */
    if (!has.call(callback, '__msg__')) {
      Object.defineProperty(callback, '__msg__', {
        value: msg,
        enumerable: true,
      });
    }
    applicationBroadcast.on(`msg:${msg}`, callback);
  },
  /**
   *
   * @param {string} msg
   * @param {Function} callback
   */
  ungrab(msg, callback) {
    applicationBroadcast.off(`msg:${msg}`, callback);
  },
  /**
   *
   */
  start() {
    started = true;
    while (stack.length > 0) {
      const st = stack.shift();
      this.cast(st.msg, st.obj, st.immediate);
    }
  },

};

export default Broadcast;
