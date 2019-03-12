import Inflector from '../../src/utils/inflector';

describe('Inflector returns specified values', () => {
  test('clean string with Inflector.clean(string)', () => {
    const fakeString = '      fake string   ';
    const cleanedString = Inflector.cleanString(fakeString);
    expect(cleanedString).toBe('fake string');
  });
  test('pluralize string with Inflector.pluralize(string)', () => {
    const cleanedString = Inflector.pluralize('person');
    expect(cleanedString).toBe('people');
  });
  test('pluralize string with Inflector.pluralize(string, plural) passing plural', () => {
    const cleanedString = Inflector.pluralize('apple', 'apples');
    expect(cleanedString).toBe('apples');
  });
  test('singularize string with Inflector.plusingularizeralize(string)', () => {
    const cleanedString = Inflector.singularize('people');
    expect(cleanedString).toBe('person');
  });
  test('singularize string with Inflector.singularize(string, plural) passing singular', () => {
    const cleanedString = Inflector.singularize('apples', 'apple');
    expect(cleanedString).toBe('apple');
  });
  test('camelize string with Inflector.camelize(string)', () => {
    const cleanedString = Inflector.camelize('Fake String To camelize');
    expect(cleanedString).toBe('FakeStringToCamelize');
  });
  test('camelize string with Inflector.camelize(string, true)', () => {
    const cleanedString = Inflector.camelize('Fake String To camelize', true);
    expect(cleanedString).toBe('fakeStringToCamelize');
  });
  test('humanize string with Inflector.humanize(string)', () => {
    const cleanedString = Inflector.humanize('fake-slug_to---humanize');
    expect(cleanedString).toBe('Fake Slug To Humanize');
  });
  test('humanize string with Inflector.humanize(string, true)', () => {
    const cleanedString = Inflector.humanize('fake-slug_to---humanize', true);
    expect(cleanedString).toBe('fake Slug To Humanize');
  });
  test('capitalize string with Inflector.capitalize(string)', () => {
    const cleanedString = Inflector.capitalize('fake-slug_to---HUMANIZE');
    expect(cleanedString).toBe('Fake-slug_to---humanize');
  });
  test('dasherize string with Inflector.dasherize(string)', () => {
    const cleanedString = Inflector.dasherize('fake Slug To Humanize');
    expect(cleanedString).toBe('fake-slug-to-humanize');
  });
  test('demodulize string with Inflector.demodulize(string)', () => {
    const cleanedString = Inflector.demodulize('Message::Bus::Properties');
    expect(cleanedString).toBe('Properties');
  });
  test('tableize string with Inflector.tableize(string)', () => {
    const cleanedString = Inflector.tableize('MessageBusProperty');
    expect(cleanedString).toBe('message_bus_properties');
  });
  test('classify string with Inflector.classify(string)', () => {
    const cleanedString = Inflector.classify('message_bus_properties');
    expect(cleanedString).toBe('MessageBusProperty');
  });
  test('foreignKey string with Inflector.foreignKey(string)', () => {
    const cleanedString = Inflector.foreignKey('MessageBusProperty');
    expect(cleanedString).toBe('message_bus_property_id');
  });
  test('foreignKey string with Inflector.foreignKey(string) with dropIdUbar', () => {
    const cleanedString = Inflector.foreignKey('MessageBusProperty', true);
    expect(cleanedString).toBe('message_bus_propertyid');
  });
  test('ordinalize string with Inflector.ordinalize(string)', () => {
    const cleanedString = Inflector.ordinalize('The 1 param is a string, the 2 is a number');
    expect(cleanedString).toBe('The 1st param is a string, the 2nd is a number');
  });
});
