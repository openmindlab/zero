import Inflector from '../utils/inflector';

const has = Object.prototype.hasOwnProperty;

const Util = {
  collection: new Map(),
  create(name, util) {
    let utilityName = '';
    if (typeof name === 'string') {
      utilityName = name;
    } else if (typeof name === 'object' && has.call(util.NAME)) {
      utilityName = util.NAME;
    }

    if (!utilityName) {
      throw new Error('name is required');
    }

    utilityName = Inflector.camelize(utilityName);

    if (this.collection.has(utilityName)) {
      throw new Error(`${utilityName} has already been created`);
    }
    this.collection.set(utilityName, util);
    return this.collection;
  },

  init() {
    this.collection.forEach((item) => {
      item.init();
    });
  },

};

export default Util;
