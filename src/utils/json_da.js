import Logger from '@openmind/litelog'
import Utils from '../core/utils'


let Log = new Logger("Zero/Core/Utils/JsonDA");


let IS_SPECIAL_REGEXP = /^(sel|var|ary):(.*)$/;

function isSpecial(value) {
  var matches = value.match( IS_SPECIAL_REGEXP );
  return matches && matches.length > 1;
}
function isSelector( value ){
  var matches = value.match( IS_SPECIAL_REGEXP );
  if ( matches[1] == "sel" )
    return matches[2];
}
function isVariable( value ){
  var matches = value.match( IS_SPECIAL_REGEXP );
  if ( matches[1] == "var" )
    return matches[2];
}
function isArray( value ){
  var matches = value.match( IS_SPECIAL_REGEXP );
  if ( matches[1] == "ary" )
    return matches[2];
}


export default {

  NAME: 'JsonDa',

  data(el, key) {
    let itemdata = el[`__data_${key}`];
    if ( !itemdata ) {
      itemdata = this.nsData(el, key);
      if ( typeof itemdata === 'undefined') {
        itemdata = {};
      }
      el[`__data_${key}`] = itemdata;
    }
    return itemdata;
  },


  nsData(el, namespace) {
    let json = {};

    if ( !el || !el.attributes ) {
      Log.error("'el' is not a valid HTML element");
      return json;
    }


    for ( const attr of el.attributes ) {
      let
        attr_name = attr.name,
        value = attr.value;
      if ( attr_name.indexOf( "data-" ) == 0 ) {
        // found a data- attribute
        let
          names = attr_name.split("-").slice(1),
          obj = json,
          name,
          original_data_attribute = [];


        while( name = names.shift() ) {

          // trasformation in camelCase
          let nn = name.split( /(?=_)_/ );
          for( let z = 1, _nn; _nn = nn[ z++ ]; ) {
            if ( ! _nn ) {
              nn[ z ] = "_";

            } else {
              _nn = _nn.substring(0, 1).toUpperCase() + _nn.substring(1);
              nn[ z - 1 ] = _nn;
            }
          }
          name = nn.join("");

          original_data_attribute.push( name );

          if ( ! names.length ) {
            // last element, we have to calculate its value
            obj[ name ] = (function(){
              // check special attribute
              let selvar;
              if ( isSpecial(value) ) {
                if ( selvar = isSelector(value) ) {
                  value = document.querySelector( selvar ).value;
                } else if ( selvar = isVariable(value) ) {
                  value = window[ selvar ];
                } else if ( selvar = isArray(value) ) {
                  // collect array from DOM following the `original_data_attribute` as rootscope
                  let children = el.querySelectorAll( selvar );
                  value = [];
                  for( let i_c = 0, c; c = children[i_c++]; ){
                    let json_da_child = JsonDA.data( c, original_data_attribute.join(".") );
                    value.push( json_da_child );
                  }
                }
              }

              if ( value == "true" ) {
                value = true;
              } else if ( value == "false" ) {
                value = false;
              } else if ( value == "null" ) {
                value = null;
              } else if ( value == "undefined" ) {
                value = undefined;
              }

              if ( typeof value === "string" && value !== '' && (value == '0' || (value.startsWith('0.') || value.charAt(0) != "0")) ) {
                // try to convert into Number
                let int_value = Number(value);
                value = isNaN(int_value) ? value : int_value;
              }

              return typeof obj[ name ] !== "object" ? value : obj[ name ];
            })();
          } else {
            // create a temporary object to store data
            obj[ name ] = typeof obj[ name ] !== "object" ? {} : obj[ name ];
            obj = obj[ name ];
          }
        }
      }
    }


    return namespace ? (function(){
      let keys = namespace.split("."), k, o = json;
      while (o && (k = keys.shift()) ){
        o = o[k];
      }
      while( keys.length > 1 && (k = keys.shift()) ) {
        o = o[k] = {};
      }
      return o;
    })() : json;

  }

};
