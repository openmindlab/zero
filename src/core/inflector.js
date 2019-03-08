import Logger from '@openmind/litelog';

const Log = new Logger('Zero/Core/Inflector');

export default {

  uncountableWords: [
    'equipment', 'information', 'rice', 'money', 'species', 'series',
    'fish', 'sheep', 'moose', 'deer', 'news',
  ],


  pluralRules: [
    [new RegExp('(m)an$', 'gi'), '$1en'],
    [new RegExp('(pe)rson$', 'gi'), '$1ople'],
    [new RegExp('(child)$', 'gi'), '$1ren'],
    [new RegExp('^(ox)$', 'gi'), '$1en'],
    [new RegExp('(ax|test)is$', 'gi'), '$1es'],
    [new RegExp('(octop|vir)us$', 'gi'), '$1i'],
    [new RegExp('(alias|status)$', 'gi'), '$1es'],
    [new RegExp('(bu)s$', 'gi'), '$1ses'],
    [new RegExp('(buffal|tomat|potat)o$', 'gi'), '$1oes'],
    [new RegExp('([ti])um$', 'gi'), '$1a'],
    [new RegExp('sis$', 'gi'), 'ses'],
    [new RegExp('(?:([^f])fe|([lr])f)$', 'gi'), '$1$2ves'],
    [new RegExp('(hive)$', 'gi'), '$1s'],
    [new RegExp('([^aeiouy]|qu)y$', 'gi'), '$1ies'],
    [new RegExp('(x|ch|ss|sh)$', 'gi'), '$1es'],
    [new RegExp('(matr|vert|ind)ix|ex$', 'gi'), '$1ices'],
    [new RegExp('([m|l])ouse$', 'gi'), '$1ice'],
    [new RegExp('(quiz)$', 'gi'), '$1zes'],
    [new RegExp('s$', 'gi'), 's'],
    [new RegExp('$', 'gi'), 's'],
  ],

  singularRules: [
    [new RegExp('(m)en$', 'gi'), '$1an'],
    [new RegExp('(pe)ople$', 'gi'), '$1rson'],
    [new RegExp('(child)ren$', 'gi'), '$1'],
    [new RegExp('([ti])a$', 'gi'), '$1um'],
    [new RegExp('((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$', 'gi'), '$1$2sis'],
    [new RegExp('(hive)s$', 'gi'), '$1'],
    [new RegExp('(tive)s$', 'gi'), '$1'],
    [new RegExp('(curve)s$', 'gi'), '$1'],
    [new RegExp('([lr])ves$', 'gi'), '$1f'],
    [new RegExp('([^fo])ves$', 'gi'), '$1fe'],
    [new RegExp('([^aeiouy]|qu)ies$', 'gi'), '$1y'],
    [new RegExp('(s)eries$', 'gi'), '$1eries'],
    [new RegExp('(m)ovies$', 'gi'), '$1ovie'],
    [new RegExp('(x|ch|ss|sh)es$', 'gi'), '$1'],
    [new RegExp('([m|l])ice$', 'gi'), '$1ouse'],
    [new RegExp('(bus)es$', 'gi'), '$1'],
    [new RegExp('(o)es$', 'gi'), '$1'],
    [new RegExp('(shoe)s$', 'gi'), '$1'],
    [new RegExp('(cris|ax|test)es$', 'gi'), '$1is'],
    [new RegExp('(octop|vir)i$', 'gi'), '$1us'],
    [new RegExp('(alias|status)es$', 'gi'), '$1'],
    [new RegExp('^(ox)en', 'gi'), '$1'],
    [new RegExp('(vert|ind)ices$', 'gi'), '$1ex'],
    [new RegExp('(matr)ices$', 'gi'), '$1ix'],
    [new RegExp('(quiz)zes$', 'gi'), '$1'],
    [new RegExp('s$', 'gi'), ''],
  ],

  nonTitlecasedWords: [
    'and', 'or', 'nor', 'a', 'an', 'the', 'so', 'but', 'to', 'of', 'at',
    'by', 'from', 'into', 'on', 'onto', 'off', 'out', 'in', 'over',
    'with', 'for',
  ],

  idSuffix: new RegExp('(_ids|_id)$', 'g'),
  underbar: new RegExp('_', 'g'),
  spaceOrUnderbar: new RegExp('[\ _]', 'g'),
  uppercase: new RegExp('([A-Z])', 'g'),
  underbarPrefix: new RegExp('^_'),

  applyRules(str, rules, skip, override) {
    if (override) {
      str = override;
    } else {
      const ignore = (skip.indexOf(str.toLowerCase()) > -1);
      if (!ignore) {
        for (let x = 0; x < rules.length; x++) {
          if (str.match(rules[x][0])) {
            str = str.replace(rules[x][0], rules[x][1]);
            break;
          }
        }
      }
    }
    return str;
  },


  /* Remove spaces and new-lines from string */
  cleanString(str) {
    return str.replace(/(^\s+|\s+$|\n)/gim, '');
  },


  /*
  Inflector.pluralize('person')           -> 'people'
  Inflector.pluralize('octopus')          -> 'octopi'
  Inflector.pluralize('Hat')              -> 'Hats'
  Inflector.pluralize('person', 'guys')   -> 'guys'
  */
  pluralize(str, plural) {
    return this.applyRules(
      str,
      this.pluralRules,
      this.uncountableWords,
      plural,
    );
  },

  /*
  Inflector.singularize('person')         -> 'person'
  Inflector.singularize('octopi')         -> 'octopus'
  Inflector.singularize('hats')           -> 'hat'
  Inflector.singularize('guys', 'person') -> 'person'
  */
  singularize(str, singular) {
    return this.applyRules(
      str,
      this.singularRules,
      this.uncountableWords,
      singular,
    );
  },

  /*
  Inflector.camelize('message_properties')        -> 'MessageProperties'
  Inflector.camelize('message_properties', true)  -> 'messageProperties'
  */
  camelize(str, lowFirstLetter) {
    // var str = str.toLowerCase();
    const str_path = str.split('/');
    for (let i = 0; i < str_path.length; i++) {
      const str_arr = str_path[i].split('_');
      const initX = ((lowFirstLetter && i + 1 === str_path.length) ? (1) : (0));
      for (let x = initX; x < str_arr.length; x++) {
        str_arr[x] = str_arr[x].charAt(0).toUpperCase() + str_arr[x].substring(1);
      }
      str_path[i] = str_arr.join('');
    }
    str = str_path.join('::');

    // fix
    if (lowFirstLetter === true) {
      const first = str.charAt(0).toLowerCase();
      const last = str.slice(1);
      str = first + last;
    }

    return str;
  },

  /*
  Inflector.underscore('MessageProperties')       -> 'message_properties'
  Inflector.underscore('messageProperties')       -> 'message_properties'
  */
  underscore(str) {
    const str_path = str.split('::');
    for (let i = 0; i < str_path.length; i++) {
      str_path[i] = str_path[i].replace(this.uppercase, '_$1');
      str_path[i] = str_path[i].replace(this.underbarPrefix, '');
    }
    str = str_path.join('/').toLowerCase();
    return str;
  },

  /*
  Inflector.humanize('message_properties')        -> 'Message properties'
  Inflector.humanize('message_properties')        -> 'message properties'
  */
  humanize(str, lowFirstLetter) {
    var str = str.toLowerCase();
    str = str.replace(this.idSuffix, '');
    str = str.replace(this.underbar, ' ');
    if (!lowFirstLetter) {
      str = this.capitalize(str);
    }
    return str;
  },

  /*
  Inflector.capitalize('message_properties')      -> 'Message_properties'
  Inflector.capitalize('message properties')      -> 'Message properties'
  */
  capitalize(str) {
    var str = str.toLowerCase();
    str = str.substring(0, 1).toUpperCase() + str.substring(1);
    return str;
  },

  /*
  Inflector.dasherize('message_properties')       -> 'message-properties'
  Inflector.dasherize('message properties')       -> 'message-properties'
  */
  dasherize(str) {
    str = str.replace(this.spaceOrUnderbar, '-');
    return str;
  },

  /*
  Inflector.camel2words('message_properties')         -> 'Message Properties'
  Inflector.camel2words('message properties')         -> 'Message Properties'
  Inflactor.camel2words('Message_propertyId', true)   -> 'Message Properties Id'
  */
  camel2words(str, allFirstUpper) {
    // var str = str.toLowerCase();
    if (allFirstUpper === true) {
      str = this.camelize(str);
      str = this.underscore(str);
    } else {
      str = str.toLowerCase();
    }

    str = str.replace(this.underbar, ' ');
    const str_arr = str.split(' ');
    for (let x = 0; x < str_arr.length; x++) {
      const d = str_arr[x].split('-');
      for (let i = 0; i < d.length; i++) {
        if (this.nonTitlecasedWords.indexOf(d[i].toLowerCase()) < 0) {
          d[i] = this.capitalize(d[i]);
        }
      }
      str_arr[x] = d.join('-');
    }
    str = str_arr.join(' ');
    str = str.substring(0, 1).toUpperCase() + str.substring(1);
    return str;
  },

  /*
  Inflector.demodulize('Message::Bus::Properties')    -> 'Properties'
  */
  demodulize(str) {
    const str_arr = str.split('::');
    str = str_arr[str_arr.length - 1];
    return str;
  },

  /*
  Inflector.tableize('MessageBusProperty')    -> 'message_bus_properties'
  */
  tableize(str) {
    str = this.pluralize(this.underscore(str));
    return str;
  },

  /*
  Inflector.classify('message_bus_properties')    -> 'MessageBusProperty'
  */
  classify(str) {
    str = this.singularize(this.camelize(str));
    return str;
  },

  /*
  Inflector.foreignKey('MessageBusProperty')       -> 'message_bus_property_id'
  Inflector.foreignKey('MessageBusProperty', true) -> 'message_bus_propertyid'
  */
  foreignKey(str, dropIdUbar) {
    str = `${this.underscore(this.demodulize(str)) + ((dropIdUbar) ? ('') : ('_'))}id`;
    return str;
  },

  /*
  Inflector.ordinalize('the 1 pitch')     -> 'the 1st pitch'
  */
  ordinalize(str) {
    const str_arr = str.split(' ');
    for (let x = 0; x < str_arr.length; x++) {
      const i = parseInt(str_arr[x]);
      if (i === NaN) {
        const ltd = str_arr[x].substring(str_arr[x].length - 2);
        const ld = str_arr[x].substring(str_arr[x].length - 1);
        let suf = 'th';
        if (ltd != '11' && ltd != '12' && ltd != '13') {
          if (ld === '1') {
            suf = 'st';
          } else if (ld === '2') {
            suf = 'nd';
          } else if (ld === '3') {
            suf = 'rd';
          }
        }
        str_arr[x] += suf;
      }
    }
    str = str_arr.join(' ');
    return str;
  },
};
