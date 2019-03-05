import Events from '@openmind/zero-events'
import JsonDa from '../utils/json_da';
import StringUtils from './inflector';

class DOM {

  constructor(selector, root = document) {

    this.root = root;

    let selection = [];

    if ( selector instanceof DOM ) {
      return selector;
    } else if ( typeof selector === 'string' ) {
      selector = StringUtils.cleanString( selector );
      if ( selector.startsWith('<') ) {
        // parse HTML as new content;
        return DOM.parseHTML( selector );
      }
      const elements = root.querySelectorAll(selector);
      selection = Array.prototype.slice.call(elements, 0);
    } else if ( (selector instanceof HTMLElement) || selector === window || selector === document ) {
      this.root = selector;
      selection = [ selector ];
    } else if ( selector ) {
      // try to translate HTMLCollection/NodeList
      selection = Array.prototype.slice.call(selector, 0);
    }

    for( let i = 0, elm; elm = selection[i]; i++){
      this[i] = elm;
    }
    this.length = selection.length;

    this[Symbol.iterator] = selection[Symbol.iterator];

    return this;
  }

  static sel(selector, root) {
    return new DOM(selector, root);
  }

  static parseHTML(html) {
    const dp = new DOMParser();
    const doc = dp.parseFromString(html, 'text/html');
    return new DOM(doc.body.childNodes);
  }

  each(callback) {
    let ret = [];
    for( const elm of this ) {
      ret = ret.concat( callback(elm) );
    }
    return this;
  }

  find(selector) {
    const ret = new DOM();
    const prev = ret;
    for( const elm of this ) {
      if ( elm.nodeType === Node.TEXT_NODE ) continue;
      let sel = elm.querySelectorAll(selector);
      sel = Array.prototype.slice.call(sel, 0);
      Array.prototype.splice.apply( prev, [prev.length, 0].concat( sel ) );
    }
    return prev;
  }

  data(namespace) {
    return JsonDa.data(this[0], namespace);
  }

  parents() {
    const ret = [];
    let el = this[0];
    while( el && el.parentNode && !(el.parentNode instanceof HTMLBodyElement) ) {
      ret.push( el = el.parentNode );
    }
    return ret;
  }


  html(str) {
    if ( typeof str === 'undefined' ) {
      return this[0].innerHTML;
    } else {
      for( const elm of this ) {
        if ( elm.nodeType === Node.TEXT_NODE ) continue;
        elm.innerHTML = str;
      }
    }
    return this;
  }

  empty() {
    return this.html('');
  }

  text(str) {
    if ( typeof str === 'undefined' ) {
      return this[0].innerText;
    } else {
      for( const elm of this ) {
        if ( elm.nodeType === Node.TEXT_NODE ) continue;
        elm.innerHTML = '';
        const t = document.createTextNode( str );
        elm.appendChild( t );
      }
    }
    return this;
  }

  append( elm ) {
    if ( !(elm instanceof DOM) ) {
      elm = [elm];
    }
    for( const el of elm ) {
      this[0].appendChild( el );
    }
    return this;
  }


  appendTo(p) {
    if ( p instanceof DOM ) {
      p = p[0];
    }

    for( const el of this ) {
      p.appendChild( el );
    }
    return this;
  }


  parent() {
    return new DOM( this[0].parentNode );
  }



  remove() {
    for( const el of this ) {
      el.parentNode.removeChild( el );
    }
  }

  replaceWith(newEl) {
    if ( this.length > 0 ) {
      const el = this[0].parentNode.replaceChild(newEl, this[0]);
      return new DOM(el);
    }
    return this;
  }



  val(str) {
    if ( typeof str === 'undefined' ) {
      return this[0].value;
    } else {
      for( const elm of this ) {
        elm.value = str;
      }
    }
    return this
  }


  attr(attr, value) {
    if (this[0].nodeType === Node.TEXT_NODE) return null;
    if (typeof value === 'undefined') {
      const a = this[0].attributes[attr];
      return a ? a.value : undefined;
    }
    return this[0].setAttribute(attr, value);
  }

  removeAttr(attr) {
    for( const elm of this ) {
      if ( elm.nodeType === Node.TEXT_NODE ) continue;
      elm.removeAttribute( attr );
    }
    return this;
  }


  css(key, value) {
    if ( this.length ) {
      if ( typeof value === 'undefined' ) {
        if ( this[0].nodeType === Node.TEXT_NODE ) return null;
        const style = window.getComputedStyle( this[0] );
        return style ? style.getPropertyValue( key ) : null;
      } else {
        for( const elm of this ) {
          if ( elm.nodeType === Node.TEXT_NODE ) continue;
          elm.style.setProperty( key, value );
        }
      }
      return this;
    }
    return null;
  }


  on(event, callback, ...args) {
    for( const elm of this ) {
      Events.on(elm, event, callback, args);
    }
    return this;
  }

  one(event, callback, ...args) {
    for( const elm of this ) {
      Events.one(elm, event, callback, args);
    }
    return this;
  }

  off(event, callback) {

    for( const elm of this ) {
      Events.off(elm, event, callback);
    }
    return this;

  }

  trigger(evt, ...args) {
    for( const elm of this ) {
      Events.trigger(elm, evt, args);
    }
    return this;
  }


  triggerHandler(evt, ...args) {
    for( const elm of this ) {
      Events.trigger(elm, evt, args);
    }
    return this;
  }


  addClass(css) {
    css = css.split(' ');
    for( const elm of this ) {
      if ( elm.nodeType === Node.TEXT_NODE ) continue;
      for( const c of css ) {
        c && elm.classList.add(c);
      }
    }
    return this;
  }

  removeClass(css) {
    css = css.split(' ');
    for( const elm of this ) {
      if ( elm.nodeType === Node.TEXT_NODE ) continue;
      for( const c of css ) {
        c && elm.classList.remove(c);
      }
    }
    return this;
  }

  toggleClass(css) {
    css = css.split(' ');
    for( const elm of this ) {
      if ( elm.nodeType === Node.TEXT_NODE ) continue;
      for( const c of css ) {
        c && elm.classList.toggle(c);
      }
    }
    return this;
  }

  hasClass(css) {
    if ( this[0].nodeType === Node.TEXT_NODE ) return null;
    return this[0].classList.contains( css );
  }

}

export default DOM;
