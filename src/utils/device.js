import Logger from '@openmind/litelog'
import App from '../core/app'

let Log = new Logger("Zero/Core/Utils/Device");


let _has_mouse = false;


function onTouchStart(object, e) {
  object.start = true;
  object.end = false;
}

function onTouchMove(object, e) {
  object.move = true;
  object.end = false;
}

function onTouchEnd(object, callback, e) {

  if ( object.start && !object.move ) {
    callback(e);
  }
  object.start = object.move = false;
  object.end = true;
}

export default {

  NAME: 'Device',

  hasMouse() {
    return _has_mouse;
  },


  onTap(el, callback, namespace) {

    namespace = namespace ? `.${namespace}` : '';

    const object = {
      start: false,
      move: false,
      end: false
    };

    App.Dom(el).on(`touchstart${namespace}`, onTouchStart.bind(el, object) );
    App.Dom(el).on(`touchmove${namespace}`, onTouchMove.bind(el, object) );
    App.Dom(el).on(`touchend${namespace}`, onTouchEnd.bind(el, object, callback) );

  },

  offTap(el, namespace) {
    namespace = namespace ? `.${namespace}` : '';
    App.Dom(el).off(`touchstart${namespace}`, onTouchStart );
    App.Dom(el).off(`touchmove${namespace}`, onTouchMove );
    App.Dom(el).off(`touchend${namespace}`, onTouchEnd );
  },


  getMouseWheelEventName: function(){
    var prefix = '';
    var _addEventListener;

    if (window.addEventListener){
        _addEventListener = "addEventListener";
    }else{
        _addEventListener = "attachEvent";
        prefix = 'on';
    }

     // detect available wheel event
    var support = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support "wheel"
        document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
        'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox


    if(support == 'DOMMouseScroll'){
      return prefix + 'MozMousePixelScroll';
    }
    //handle MozMousePixelScroll in older Firefox
    else{
      return prefix + support;
    }
  },


  init() {
    function mouseOver() {
      _has_mouse = true;
      App.Dom(window).off('mouseover', mouseOver);
    }
    App.Dom(window).on('mouseover', mouseOver);
  }

}
