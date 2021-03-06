import trim from 'lodash/trim';
import snakeCase from 'lodash/snakeCase';
import camelcase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import kebabCase from 'lodash/kebabCase';
import startCase from 'lodash/startCase';
import capitalize from 'lodash/capitalize';
import lowerFirst from 'lodash/lowerFirst';

/**
 * Inflector is an utility to manipulate strings
 */
const Inflector = {
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

  counterRegex: [
    {
      match: /11(\s|$)/g,
      replace: '11th ',
    },
    {
      match: /12(\s|$)/g,
      replace: '12th ',
    },
    {
      match: /13(\s|$)/g,
      replace: '13th ',
    },
    {
      match: /1(\s|$)/g,
      replace: '1st ',
    },
    {
      match: /2(\s|$)/g,
      replace: '2nd ',
    },
    {
      match: /3(\s|$)/g,
      replace: '3rd ',
    },
    {
      match: /(\d)(\s|$)/g,
      replace: '$1th ',
    },
  ],

  idSuffix: new RegExp('(_ids|_id)$', 'g'),

  underbar: new RegExp('_', 'g'),

  spaceOrUnderbar: new RegExp('[ _]', 'g'),

  uppercase: new RegExp('([A-Z])', 'g'),

  underbarPrefix: new RegExp('^_'),

  applyRules(str, rules, skip, override) {
    let textString = str;
    if (override) {
      textString = override;
    } else {
      const ignore = (skip.indexOf(str.toLowerCase()) > -1);
      if (!ignore) {
        for (let x = 0; x < rules.length; x += 1) {
          if (str.match(rules[x][0])) {
            textString = textString.replace(rules[x][0], rules[x][1]);
            break;
          }
        }
      }
    }
    return textString;
  },


  /**
   * Clean given string and remove spaces and new-lines from string
   * @param {string} str
   * @returns {string}
   */
  cleanString(str) {
    return trim(str);
  },

  /**
   * Returns the plural string for given singular
   * @param {string} str
   * @param {string} plural
   * @returns {string}
   * @example
   * Inflector.pluralize('person')           -> 'people'
   * Inflector.pluralize('octopus')          -> 'octopi'
   * Inflector.pluralize('Hat')              -> 'Hats'
   * Inflector.pluralize('person', 'guys')   -> 'guys'
   */
  pluralize(str, plural) {
    return this.applyRules(
      str,
      this.pluralRules,
      this.uncountableWords,
      plural,
    );
  },

  /**
   * Returns the singular string for given plural
   * @param {string} str
   * @param {string} singular
   * @example
   * Inflector.singularize('person')         -> 'person'
   * Inflector.singularize('octopi')         -> 'octopus'
   * Inflector.singularize('hats')           -> 'hat'
   * Inflector.singularize('guys', 'person') -> 'person'
   */
  singularize(str, singular) {
    return this.applyRules(
      str,
      this.singularRules,
      this.uncountableWords,
      singular,
    );
  },

  /**
   * Returns the string in camel case
   * @see https://lodash.com/docs/4.17.10#camelCase
   * @returns {string}
   * @example
   * {'Foo Bar' => 'fooBar'}
   */
  camelize(str, lowFirstLetter = false) {
    return lowFirstLetter ? camelcase(str.toLowerCase()) : upperFirst(camelcase(str));
  },

  /**
   * Returns the string in snake case
   * @see https://lodash.com/docs/4.17.10#snakeCase
   * @returns {string}
   * @example
   * {'Foo Bar' => 'foo_bar'}
   */
  underscore(str) {
    return snakeCase(str);
  },

  /**
   * Returns the human readable string
   * @see https://lodash.com/docs/4.17.10#startCase
   * @param {string} str
   * @param {boolean} [lowFirstLetter = false] set to true if the first word must be lowercase
   * @returns {string}
   * @example
   * {'--foo-bar--' >= 'Foo Bar'}
   */
  humanize(str, lowFirstLetter = false) {
    let originalString = startCase(str);
    if (lowFirstLetter) {
      originalString = lowerFirst(originalString);
    }
    return originalString;
  },

  /**
   * Returns the string with ONLY the first character to upper case and the remaining to lower case.
   * @see https://lodash.com/docs/4.17.11#capitalize
   * @param {string} str
   * @returns {string}
   * @example
   * {'foo BAR' >= 'Foo bar'}
   */
  capitalize(str) {
    return capitalize(str);
  },

  /**
   * Returns the string in kebab case
   * @see https://lodash.com/docs/4.17.10#kebabCase
   * @return {string}
   * @example
   * {'Foo Bar' => 'foo-bar'}
   */
  dasherize(str) {
    return kebabCase(str);
  },

  /**
   * ?
   * @param {string} str
   * @return {string}
   * @example
   * Inflector.demodulize('Message::Bus::Properties')    -> 'Properties'
   */
  demodulize(str) {
    const words = str.split('::');
    const word = words[words.length - 1];
    return word;
  },

  /**
   * ?
   * @param {string} str
   * @return {string}
   * @example
   * Inflector.tableize('MessageBusProperty')    -> 'message_bus_properties'
   */
  tableize(str) {
    return this.pluralize(this.underscore(str));
  },

  /**
   * ?
   * @param {string} str
   * @returns {string}
   * @example
   * Inflector.classify('message_bus_properties')    -> 'MessageBusProperty'
   */
  classify(str) {
    return this.singularize(this.camelize(str));
  },

  /**
   * ?
   * @param {string} str
   * @param {boolean} [dropIdUbar = false]
   * @returns {string}
   * @example
   * Inflector.foreignKey('MessageBusProperty')       -> 'message_bus_property_id'
   * Inflector.foreignKey('MessageBusProperty', true) -> 'message_bus_propertyid'
   */
  foreignKey(str, dropIdUbar = false) {
    return `${this.underscore(this.demodulize(str)) + ((dropIdUbar) ? ('') : ('_'))}id`;
  },

  /**
   *
   * @param {string} str
   * @returns {string}
   * @example
   * Inflector.ordinalize('the 1 pitch')     -> 'the 1st pitch'
   */
  ordinalize(str) {
    let originalString = str;
    this.counterRegex.forEach((regex) => {
      originalString = originalString.replace(regex.match, regex.replace);
    });
    return originalString;
  },
};
export default Inflector;
