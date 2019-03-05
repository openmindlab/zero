import Logger from '@openmind/litelog';
import Events from '@openmind/zero-events';
import App from './app';
import Utils from './utils';
import Components from './components';
import Pages from './pages';
import StateManager from './react';
import Broadcast from './broadcast';

import JsonDa from '../utils/json_da';
import Device from '../utils/device';
import Ajax from '../utils/ajax';

const Log = new Logger('Zero/Core');

const events = new Events({});

Object.defineProperties(App, {
  Utils: { value: Utils, writable: false },
  Components: { value: Components, writable: false },
  Pages: { value: Pages, writable: false },
  Events: { value: events, writable: false },
  _Broadcast: { value: Broadcast, writable: false }
});


function InitComponents(main_element, skip_self) {
  let c_elements = Array.prototype.slice.call(main_element.querySelectorAll("[data-component]"), 0);
  if ( !skip_self ) {
    c_elements.unshift(main_element);
  }
  for( let i = c_elements.length - 1, element; element = c_elements[ i-- ]; ){
    InitSingleComponent(element);
  }
}

function InitSingleComponent(element) {
  if (element.__boilerplate__ === true) {
    return;
  }
  let comp_names = element.dataset ? element.dataset.component : undefined;
  if (!comp_names) {
    return;
  }
  comp_names = comp_names.split(',');
  for (let comp_name of comp_names) {
    comp_name = App.StringUtils.camelize(comp_name.trim());
    if (!(comp_name && comp_name in Components.__comps__)) continue;
    let component = Components.__comps__[comp_name];
    element.__boilerplate__ = true;
    element.dataset.boilerplateActive = 'true';
    let c = new component(element);
    element[`comp:${comp_name}`] = c;
    let arr_comps = element['boiler:components'] || [];
    arr_comps.push(c);
    element['boiler:components'] = arr_comps;
  }
}

function InitComponents(main_element, skip_self) {
  // skip #text element
  if ( main_element.nodeType === Node.TEXT_NODE ) return;
  let c_elements = Array.prototype.slice.call(main_element.querySelectorAll("[data-component]"), 0);
  if ( !skip_self ) {
    c_elements.unshift(main_element);
  }
  for(let i = c_elements.length - 1, element; (element = c_elements[i--]); ) {
    InitSingleComponent(element);
  }
}

function DestroyComponents(main_element, skip_self, skip_destroy) {
  // skip #text element
  if ( main_element.nodeType === Node.TEXT_NODE ) return;
  let c_elements = Array.prototype.slice.call(
    main_element.querySelectorAll('[data-component][data-boilerplate-active]'),
    0
  );
  if (!skip_self) {
    c_elements.unshift(main_element);
  }
  for (let i = c_elements.length - 1, element; (element = c_elements[i--]); ) {
    DestroySingleComponent(element, skip_destroy);
  }
}

function DestroySingleComponent(element, skip_destroy) {
  // default: remove data-attribute (in case of cloneNode)
  if (element.dataset) {
    delete element.dataset.boilerplateActive;
  }

  if (element.__boilerplate__ === true) {
    let arr_comps = element['boiler:components'] || [];
    for (let c of arr_comps) {
      !skip_destroy && c.destroy();
      delete element[`comp:${c.Name}`];
    }

    delete element.__boilerplate__;
    delete element['boiler:components'];
  }
}

function InitPages() {
  let dependsOn = App.Body[0].dataset.include;
  if (dependsOn) {
    dependsOn = dependsOn.split(';');
    Log.log('Required dependencies:', dependsOn);
    for (let dep of dependsOn) {
      dep = App.StringUtils.camelize(dep.trim());

      Log.info('loading dependency:', dep);
      let page = Pages[dep];
      if (page) {
        new page();
      } else {
        Log.warn("Dependencies '%s' not resolved:", dep);
      }
    }
  }

  let Page = null;
  let ctrl = App.Body[0].dataset.controller;

  if (ctrl) {
    ctrl = App.StringUtils.camelize(ctrl);

    if ((Page = Pages[ctrl])) {
      Log.info('Asking controller to initialize:', ctrl);
      new Page();
    } else {
      Log.warn('No page defined for:', ctrl);
    }
  } else {
    Log.warn('No controller defined');
  }
}

const WRAP = function wrap() {
  const wrap_fn = [
    'before',
    'after',
    'append',
    'appendChild',
    'prepend',
    'insertBefore',
    'insertAfter'
  ];
  const destroy_fn = ['remove', 'removeChild'];

  for (const fn of wrap_fn) {
    if (fn in HTMLElement.prototype) {
      const oldfn = HTMLElement.prototype[fn];
      HTMLElement.prototype[fn] = function() {
        const args = Array.prototype.slice.call(arguments, 0);
        let elms = [];
        for (let arg of args) {
          if (arg instanceof DocumentFragment) {
            for (let e of arg.childNodes) {
              elms.push(e);
            }
          } else if (arg instanceof HTMLElement) {
            elms.push(arg);
          }
        }
        const ret = oldfn.apply(this, args);
        for (const el of elms) {
          InitComponents(el);
        }
        return ret;
      };
    }
  }

  for (const fn of destroy_fn) {
    if (fn in HTMLElement.prototype) {
      const oldfn = HTMLElement.prototype[fn];
      HTMLElement.prototype[fn] = function() {
        const elms = Array.prototype.slice.call(arguments, 0);
        const ret = oldfn.apply(this, elms);
        if (fn === 'removeChild') {
          DestroyComponents(elms[0]);
        } else {
          DestroyComponents(this);
        }
        return ret;
      };
    }
  }

  // const oldClone = HTMLElement.prototype.cloneNode;
  // HTMLElement.prototype.cloneNode = function(bool) {
  //   const ret = oldClone.apply( this, arguments );
  //   DestroyComponents(ret, false, true);
  //   return ret;
  // };
  const oldReplaceWith = Element.prototype.replaceWith;
  Element.prototype.replaceWith = function() {
    const elms = Array.prototype.slice.call(arguments, 0);
    for( const el of elms ) {
      DestroyComponents(el);
    }
    DestroyComponents(this);
    const ret = oldReplaceWith.apply(this, arguments);
    for( const el of elms ) {
      InitComponents(el);
    }
    return ret;
  };

  const oldReplaceChild = Element.prototype.replaceChild;
  Element.prototype.replaceChild = function(newEl, oldEl) {
    DestroyComponents(oldEl);
    const ret = oldReplaceChild.apply(this, arguments);
    InitComponents(newEl);
    return ret;
  };

  const innerHTMLset = HTMLElement.prototype.__lookupSetter__('innerHTML');
  const innerHTMLget = HTMLElement.prototype.__lookupGetter__('innerHTML');
  HTMLElement.prototype.__defineSetter__('innerHTML', function(value) {
    DestroyComponents(this, true);
    let ret = innerHTMLset.call(this, value);
    InitComponents(this, true);
    return ret;
  });

  HTMLElement.prototype.__defineGetter__('innerHTML', innerHTMLget);
};

WRAP();

App.start = state => {
  const _state = Object.assign({}, state);

  const manager = new StateManager(_state);

  Object.defineProperties(App, {
    Manager: {
      configurable: false,
      enumerable: true,
      get: function g() {
        return manager;
      }
    },
    $state: {
      configurable: false,
      enumerable: true,
      get: function g() {
        return manager.state.ref;
      }
    }
  });

  manager.state.bind();

  Utils.init();
  InitComponents(App.Body[0]);
  InitPages();

  setTimeout(() => {
    App.Events.trigger(App.EVENT_READY);
  }, 0);

  App.Window.on('unload.app', () => {
    DestroyComponents(App.Body[0]);
    App.Events.trigger(App.EVENT_END);
  });

  Broadcast.start();

  App.start = () => {
    throw new Error('App has been already started');
  };

  return App;
};

Utils.create(JsonDa);
Utils.create(Device);

export { App as Zero, Logger, Utils, Pages, Components, Ajax };
