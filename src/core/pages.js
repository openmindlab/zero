import Logger from 'Vendor/@openmind/litelog'
import Events from 'Vendor/@openmind/zero-events'
import Broadcast from './broadcast';
import App from './app'

let Log = new Logger('Zero/Core/Pages');

export default class Pages extends Events {

  static get Events() {
    return {
      Init: "page:init",
      Destroy: "page:destroy"
    };
  }


  static create(name, page) {

    if ( ! name ) {
      throw "name is required";
    }

    if ( name in Pages ) {
      throw `${name} has already been created`
    }

    name = App.StringUtils.camelize( name );

    let proto = Object.getPrototypeOf( page );
    while( proto && (proto !== Pages) ) {
      proto = Object.getPrototypeOf( proto );
    }

    if ( !proto ) return false;

    Object.defineProperty(Pages, name, {
      configurable: false,
      get() {
        return page;
      }
    });

    Log.d(`${name} has been created`);

    return page;
  }


  GRAB(msg, fn) {
    fn.__ref__ = fn.bind(this);
    Broadcast.grab( msg, fn.__ref__ );
  }

  CAST(msg, obj, immediate) {
    Broadcast.cast( msg, obj, immediate );
  }

  UNGRAB(msg, fn) {
    fn = fn && fn.__ref__;
    Broadcast.ungrab( msg, fn );
  }

  constructor() {
    super({});
    Log.d('initializing', this);
    setTimeout( () => {
      App.Events.trigger( Pages.Events.Init, this );
    }, 1);
  }

}
