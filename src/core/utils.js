import Logger from '@openmind/litelog'
import App from './app'

let Log = new Logger('Zero/Core/Utils');

export default {

  create(name, util) {
    let _name = '';

    if ( typeof name === 'string' ) {
      _name = name || util.NAME;
    } else if ( typeof name === 'object' ) {
      util = name;
      _name = util.NAME;
    }

    if ( ! _name ) {
      throw "name is required";
    }

    _name = App.StringUtils.camelize( _name );

    if ( _name in this ) {
      throw `${_name} has already been created`
    }

    Object.defineProperty(this, _name, {
      configurable: false,
      get() {
        return util;
      }
    });

    Log.d(`${_name} has been created`);

    return util;
  },

  init() {
    let keys = Object.getOwnPropertyNames(this);
    for( let name of keys ) {
      let util = this[name];
      if ( util.init ) {
        util.init();
      }
    }
  }

}
