import Logger from 'Vendor/@openmind/litelog'
import Events from 'Vendor/@openmind/zero-events'
import Broadcast from './broadcast';
import App from './app'
import JsonDa from '../utils/json_da'

let Log = new Logger('Zero/Core/Components');

let $comps = {};

export default class Components extends Events {

  static get Events() {
    return {
      Init: "component:init",
      Added: "component:added",
      Removed: "component:removed",
      Destroy: "component:destroy"
    };
  }

  static get __comps__() {
    return $comps;
  }

  get Messages() {
    return {};
  }

  get element() {
    return this.$element;
  }

  get data() {
    return JsonDa.data( this.element[0], this.Name.toLowerCase() ) || {};
  }

  static create(name, component) {

    if ( ! name ) {
      throw "name is required";
    }

    name = App.StringUtils.camelize( name );

    if ( name in Components.__comps__ ) {
      throw `${name} has already been created`
    }

    let proto = Object.getPrototypeOf( component );
    while( proto && (proto !== Components) ) {
      proto = Object.getPrototypeOf( proto );
    }

    if ( !proto ) return false;

    Object.defineProperty(Components.__comps__, name, {
      configurable: false,
      get() {
        return component;
      }
    });

    Object.defineProperty(component.prototype, "Name", {
      configurable: false,
      get() {
        return name;
      }
    });

    Log.d(`${name} has been created`);

    return component;
  }


  GRAB(msg, fn) {
    fn.__ref__ = fn.bind(this);
    Broadcast.grab( msg, fn.__ref__ );
  }

  CAST(msg, obj) {
    Broadcast.cast( msg, obj );
  }

  UNGRAB(msg, fn) {
    fn = fn && fn.__ref__;
    Broadcast.ungrab( msg, fn );
  }


  constructor(element) {
    super({});

    this.$element = App.Dom(element);

    const msgs = this.Messages;

    const react = this.react;
    const new_react = App.Manager.wrap(this, react);
    delete this.react;
    this.__defineGetter__('react', () => new_react);

    for ( const msg in msgs )
      if ( msgs.hasOwnProperty(msg) )
        this.GRAB( msg, msgs[ msg ] );

    Log.d('initializing', this);
    setTimeout( () => {
      App.Events.trigger( Components.Events.Init, this );
    }, 0);
  }

  destroy() {

    App.Manager.unwrap(this, this.react);

    for ( const msg in this.Messages )
      if ( this.Messages.hasOwnProperty(msg) )
        this.UNGRAB( msg, this.Messages[ msg ] );

    Log.d('destroyed', this, "on", this.$element);

    App.Events.trigger( Components.Events.Destroy, this );
  }

}
