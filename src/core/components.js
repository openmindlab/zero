import Events from '@openmind/zero-events';
import Broadcast from './broadcast';
import App from './app';
import JsonDa from '../utils/json_da';


const has = Object.prototype.hasOwnProperty;

const $comps = {};

export default class Components extends Events {
  static get Events() {
    return {
      Init: 'component:init',
      Added: 'component:added',
      Removed: 'component:removed',
      Destroy: 'component:destroy',
    };
  }

  static get __comps__() {
    return $comps;
  }

  get Messages() {
    return this.messages;
  }

  get data() {
    return JsonDa.data(this.eventTarget, this.Name.toLowerCase()) || {};
  }

  static create(name, component) {
    if (!name) {
      throw new Error('name is required');
    }

    name = App.StringUtils.camelize(name);

    if (name in Components.__comps__) {
      throw new Error(`${name} has already been created`);
    }


    let proto = component.prototype;
    while (proto && !Components.prototype.isPrototypeOf(proto)) {
      proto = proto.prototype;
    }

    if (!proto) {
      return false;
    }

    Object.defineProperty(Components.__comps__, name, {
      configurable: false,
      get() {
        return component;
      },
    });

    Object.defineProperty(component.prototype, 'Name', {
      configurable: false,
      get() {
        return name;
      },
    });
    return component;
  }


  GRAB(message, callback) {
    callback.__Ref__ = callback.bind(this);
    Broadcast.grab(message, callback.__Ref__);
  }

  CAST(message, obj, immediate) {
    Broadcast.cast(message, obj, immediate);
  }

  UNGRAB(message, callback) {
    callback = callback && callback.__Ref__;
    Broadcast.ungrab(message, callback);
  }


  constructor(element) {
    super(element);
    this.$element = App.Dom(element);
    const {
      react,
    } = this;
    const newReact = App.Manager.wrap(this, react);
    delete this.react;
    Object.defineProperty(this, 'react', {
      value: () => newReact,
      enumerable: true,
    });
    Object.keys(this.Messages).forEach((message) => {
      if (has.call(this.Messages, message)) {
        this.GRAB(message, this.Messages[message]);
      }
    });
    App.Events.trigger(Components.Events.Init, this);
  }

  destroy() {
    App.Manager.unwrap(this, this.react);
    Object.keys(this.Messages).forEach((message) => {
      if (has.call(this.Messages, message)) {
        this.UNGRAB(message, this.Messages[message]);
      }
    });
    App.Events.trigger(Components.Events.Destroy, this);
  }
}
