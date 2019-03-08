import Logger from '@openmind/litelog';

const Log = new Logger('ZeroReact');
const LogFn = new Logger('ZeroReact/FN');
const LogPr = new Logger('ZeroReact/PR');

let currentFn = null;

const SupportedTypes = ['boolean', 'number', 'string', 'any', 'array'];

const Types = (v) => {
  if (v instanceof Array) {
    return 'array';
  }
  const to = typeof (v === null ? undefined : v);
  return (to === 'undefined') ? 'any' : to;
};

Types.isSupported = type => SupportedTypes.indexOf(type) !== -1;


class BindFunction {
  constructor(name) {
    this.name = name;
  }


  wrap(component, fn) {
    const self = this;

    const FN = this.execute = fn.bind(component);

    return function () {
      currentFn = self;

      LogFn.debug('Invoking react function', self.name);

      const ret = FN.apply(component, arguments);

      currentFn = null;

      return ret;
    };
  }


  execute() {
    // placeholder
  }
}


class BindProperty {
  constructor(name, value) {
    this.name = name;
    this.originalValue = value;
    this.currentValue = value;
    this.originalType = Types(value);

    this.reactFn = [];

    this.isRan = false;

    if (!Types.isSupported(this.originalType)) {
      throw `Unsupported type for object '${this.originalType}'`;
    }
  }


  proxyGet() {
    if (currentFn) {
      if (this.reactFn.indexOf(currentFn) === -1) {
        this.reactFn.push(currentFn);
      }
    }

    return this.currentValue;
  }


  proxySet(value) {
    if (value !== this.currentValue) {
      const currentType = Types(value);
      if (!Types.isSupported(currentType) && this.originalType !== 'any') {
        throw `Unsupported type! Expected '${this.originalType}', got '${currentType}' for property '${this.name}'`;
      }

      this.currentValue = value;

      this.arrFn = this.arrFn && this.arrFn.length > 0 ? this.arrFn : this.reactFn.slice(0);

      this.trigger(this.arrFn);
    } else {
      // do nothing
    }
  }


  trigger(arr) {
    let fn;

    if (this.isRan) return;

    this.isRan = true;
    while (fn = arr.shift()) {
      fn.execute();
    }
    this.isRan = false;
  }
}


class StateManager {
  constructor(state) {
    const _state = new State(state);
    this.__defineGetter__('state', () => _state);
  }

  wrap(component, reacts = {}) {
    const keys = Object.keys(reacts);
    for (const key of keys) {
      const bind = new BindFunction(key);

      component[key] = bind.wrap(component, reacts[key]);

      delete reacts[key];
      Object.defineProperty(reacts, key, {
        enumerable: true,
        get: () => bind,
      });
    }

    return reacts;
  }


  unwrap(component, reacts = {}) {
    const reacts_keys = Object.keys(reacts);
    for (const react_k of reacts_keys) {
      const fn = reacts[react_k];
      if (fn && fn instanceof BindFunction) {
        this.state.unbind(fn);
      }
    }
  }
}


class State {
  constructor(state) {
    this.state = state;
    this.ref = {};
    this.binds = [];
  }


  bind() {
    this.wrapKeys(this.ref, this.state);
  }

  unbind(fn) {
    for (const bind of this.binds) {
      const { reactFn } = bind;
      for (let i = reactFn.length - 1, reactfn; reactfn = reactFn[i]; i--) {
        if (!fn || reactfn === fn) {
          reactFn.splice(i, 1);
        }
      }
    }
  }

  wrapKeys(ref, object) {
    const keys = Object.keys(object);

    for (const key of keys) {
      const result = object[key];

      const type = Types(result);
      if (type === 'function') {
        throw `Cannot bind function ${key}`;
      }

      if (Types.isSupported(type) || result === null) {
        const bind = new BindProperty(key, result);
        this.binds.push(bind);

        Object.defineProperty(ref, key, {
          configurable: false,
          enumerable: true,
          get: bind.proxyGet.bind(bind),
          set: bind.proxySet.bind(bind),
        });
      } else if (!(result instanceof Array)) {
        // Object
        const subref = {};
        this.wrapKeys(subref, result);
        ref.__defineGetter__(key, () => subref);
      }
    }
  }
}

export default StateManager;
