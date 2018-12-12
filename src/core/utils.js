import Logger from 'Vendor/@openmind/litelog'
import App from './app'

let Log = new Logger('Zero/Core/Utils');

export default {

  create(name, util) {
    if ( ! name ) {
      throw "name is required";
    }

    name = App.StringUtils.camelize( name );

    if ( name in this ) {
      throw `${name} has already been created`
    }

    Object.defineProperty(this, name, {
      configurable: false,
      get() {
        return util;
      }
    });

    Log.d(`${name} has been created`);

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
