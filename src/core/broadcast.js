import Logger from 'Vendor/@openmind/litelog'
import Events from 'Vendor/@openmind/zero-events'
let Log = new Logger('Zero/Core/Broadcast');

let _started_ = false;
let _stack_ = [];
let _fake_broadcast_ = new Events({});

const Broadcast = Object.create({

  cast(msg, obj) {
    if ( !_started_) {
      _stack_.push({msg: msg, obj: obj});
    } else {
      Log.d("casting", msg);
      // New process in order to avoid duplicate setting properties in React mode
      setTimeout(() => {
        _fake_broadcast_.trigger(`msg:${msg}`, obj);
      }, 0);
    }
  },

  grab(msg, callback) {
    Log.d("grabbing", msg);
    const handler = (obj) => {
      obj = obj || {};
      obj.__msg__ = msg;
      callback( obj )
    };
    _fake_broadcast_.on(`msg:${msg}`, handler);
  },

  ungrab(msg, callback) {
    Log.d("ungrabbing", msg);
    _fake_broadcast_.off(`msg:${msg}`, callback);
  },

  start() {
    _started_ = true;
    while( _stack_.length > 0 ) {
      const st = _stack_.shift();
      this.cast(st.msg, st.obj);
    }
  }

});

export default Broadcast;
