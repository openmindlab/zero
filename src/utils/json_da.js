const has = Object.prototype.hasOwnProperty;

function isSpecial(value) {
  return value.match(/^(sel|var|ary):(.+)$/);
}
/**
 * Returns the HtmlElement data attributes as object
 * If a key is given it will group each data with keys
 * @example
 * <div data-foo-name="foo" data-foo-age="16">Foo</div>
 */
const JsonDA = {

  NAME: 'JsonDa',

  /**
   *
   * @param {HtmlElement} element the HtmlElement
   * @param {string} key
   * @returns {object}
   */
  data(element, key) {
    if (!has.call(element, `__data_${key}`)) {
      const itemdata = this.nsData(element, key);
      Object.defineProperty(element, `__data_${key}`, {
        enumerable: true,
        value: itemdata,
      });
    }
    return element[`__data_${key}`];
  },

  /**
   *
   * @param {HTMLElement} element
   * @param {string} namespace
   * @returns {object}
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

      const specialValues = isSpecial(json[item]);
      if (specialValues) {
        switch (specialValues[1]) {
          case 'sel':
            json[item] = document.querySelector(specialValues[2]).value;
            break;
          case 'var':
            json[item] = window[specialValues[2]];
            break;
          case 'ary':

            break;
          default:
        }
        /* if (selvar = isSelector(value)) {
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
        } */
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
      return json;
    });
  },

};

export default JsonDA;
