import Inflector from '../utils/inflector';
import DOM from './dom';

let Dom;
let Window;
let Document;
let Html;
let Head;
let Body;
let HtmlBody;

const object = {};

Object.defineProperties(object, {
  EVENT_READY: {
    value: 'app:ready',
    writable: false,
  },
  EVENT_END: {
    value: 'app:end',
    writable: false,
  },

  StringUtils: {
    value: Inflector,
    writable: false,
  },

  Window: {
    get() {
      return Window;
    },
  },
  Document: {
    get() {
      return Document;
    },
  },
  Html: {
    get() {
      return Html;
    },
  },
  Head: {
    get() {
      return Head;
    },
  },
  Body: {
    get() {
      return Body;
    },
  },
  HtmlBody: {
    get() {
      return HtmlBody;
    },
  },

  VERSION: {
    value: process.env.VERSION,
  },

  Dom: {
    get() {
      return Dom;
    },
    set(s) {
      Dom = s;
      Window = Dom(window);
      Document = Dom(document);
      Html = Dom(document.documentElement);
      Head = Dom(document.head);
      Body = Dom(document.body);
      HtmlBody = Dom('html, body');
    },
  },

});


object.Dom = DOM.sel;
object.Dom.parse = DOM.parseHTML;

export default object;
