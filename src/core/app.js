import Logger from '@openmind/litelog'
import Inflector from "./inflector"
import DOM from './dom'

let Log = new Logger('Zero/Core/App');

let
  Dom,
  Window,
  Document,
  Html,
  Head,
  Body,
  HtmlBody;

const object = {};

Object.defineProperties(object, {
  EVENT_READY: { value: 'app:ready', writable: false},
  EVENT_END: { value: 'app:end', writable: false},

  StringUtils: { value: Inflector, writable: false },

  Window: { get: function() { return Window} },
  Document: { get: function() { return Document} },
  Html: { get: function() { return Html} },
  Head: { get: function() { return Head} },
  Body: { get: function() { return Body} },
  HtmlBody: { get: function() { return HtmlBody} },

  VERSION: {value: process.env.VERSION},

  Dom: {
    get: function() {return Dom;},
    set: function(s){
      Dom = s;
      Window = Dom(window);
      Document = Dom(document);
      Html = Dom(document.documentElement);
      Head = Dom(document.head);
      Body = Dom(document.body);
      HtmlBody = Dom('html, body');
    }
  }

});


object.Dom = DOM.sel;
object.Dom.parse = DOM.parseHTML;

export default object;
