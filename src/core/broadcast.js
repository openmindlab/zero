import Logger from '@openmind/litelog';
import Events from '@openmind/zero-events';

const Log = new Logger('Zero/Core/Broadcast');

let started = false;
const stack = [];
const applicationBroadcast = new Events({});
/**
 * Create a Broadcast object to dispatch/listen messages through the application
 */
const Broadcast = Object.create({
  /**
   *
   * @param {string} msg
   * @param {object} obj
   * @param {boolean} immediate
   */
  cast(msg, obj, immediate) {
    if (!started) {
      stack.push({ msg, obj, immediate });
    } else {
      Log.d('casting', msg);
      // New process in order to avoid duplicate setting properties in React mode
      if (immediate) {
        applicationBroadcast.trigger(`msg:${msg}`, obj);
      } else {
        setTimeout(() => {
          applicationBroadcast.trigger(`msg:${msg}`, obj);
        }, 0);
      }
    }
  },
  /**
   *
   * @param {string} msg
   * @param {Function} callback
   */
  grab(msg, callback) {
    Log.d('grabbing', msg);
    callback.__Ref__ = (obj) => {
      obj = obj || {};
      obj.__msg__ = msg;
      callback(obj);
    };
    applicationBroadcast.on(`msg:${msg}`, callback.__Ref__);
  },
  /**
   *
   * @param {string} msg
   * @param {Function} callback
   */
  ungrab(msg, callback) {
    Log.d('ungrabbing', msg);
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

});

export default Broadcast;
