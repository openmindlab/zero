import Logger from '@openmind/litelog';
import Inflector from '../core/inflector';

const Log = new Logger('Zero/Core/Utils/JsonDA');
const has = Object.prototype.hasOwnProperty;

const IS_SPECIAL_REGEXP = /^(sel|var|ary):(.*)$/;

function isSpecial(value) {
  const matches = value.match(IS_SPECIAL_REGEXP);
  return matches && matches.length > 1;
}
function isSelector(value) {
  const matches = value.match(IS_SPECIAL_REGEXP);
  if (matches[1] === 'sel') { return matches[2]; }
  return false;
}
function isVariable(value) {
  const matches = value.match(IS_SPECIAL_REGEXP);
  if (matches[1] === 'var') { return matches[2]; }
  return false;
}
function isArray(value) {
  const matches = value.match(IS_SPECIAL_REGEXP);
  if (matches[1] === 'ary') { return matches[2]; }
  return false;
}

const JsonDA = {

  NAME: 'JsonDa',

  data(element, key) {
    let itemdata = element[`__data_${key}`];
    if (!itemdata) {
      itemdata = this.nsData(element, key);
      if (typeof itemdata === 'undefined') {
        itemdata = {};
      }
      element[`__data_${key}`] = itemdata;
    }
    return itemdata;
  },

  /**
   *
   * @param {HTMLElement} element
   * @param {string} namespace
   */
  nsData(element, namespace = '') {
    if (!(element instanceof HTMLElement)) {
      throw new Error(`${element} is not a valid HtmlElement`);
    }

    const json = Object.assign({}, element.dataset);

    Object.keys(json).forEach((item) => {
      if (json[item] === 'true') {
        json[item] = true;
      } else if (json[item] === 'false') {
        json[item] = false;
      } else if (json[item] === 'null') {
        json[item] = null;
      } else if (json[item] === 'undefined') {
        json[item] = undefined;
      }


      if (isSpecial(json[item])) {
        let selvar;
        const value = json[item];
        if (selvar = isSelector(value)) {
          json[item] = document.querySelector(selvar).value;
        } else if (selvar = isVariable(value)) {
          value = window[selvar];
        } else if (selvar = isArray(value)) {
          // collect array from DOM following the `originalDataAttribute` as rootscope
          const children = element.querySelectorAll(selvar);
          value = [];
          for (let i_c = 0, c; c = children[i_c++];) {
            const json_da_child = JsonDA.data(c, originalDataAttribute.join('.'));
            value.push(json_da_child);
          }
        }
      }


      if (namespace !== '' && item.match(namespace)) {
        namespace.split('.').forEach((objectProperty) => {
          const newPropertyName = item.replace(objectProperty, '').toLowerCase();
          if (!has.call(json, objectProperty)) {
            Object.defineProperty(json, objectProperty, {
              writable: true,
              enumerable: true,
              value: {},
            });
          }
          if (!has.call(json[objectProperty], newPropertyName)) {
            Object.defineProperty(json[objectProperty], newPropertyName, {
              writable: true,
              enumerable: true,
              value: {},
            });
          }
          json[objectProperty][newPropertyName] = json[item];
          delete json[item];
        });
      }
    });
  },

};

export default JsonDA;
