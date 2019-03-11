import JsonDA from '../../src/utils/json_da';


describe('JsonDa will retrun [data-attributes] in object notation', () => {
  test('if no namespace it\'s specified it returns a plain object for data attributes', () => {
    const element = document.createElement('div');
    element.setAttribute('data-name', 'pippo');
    element.setAttribute('data-truth', 'true');
    const jsonDaObject = JsonDA.data(element);
    const expected = {
      name: 'pippo',
      truth: true,
    };
    expect(jsonDaObject).toMatchObject(expected);
  });
  test('all native values will be converted in values', () => {
    const element = document.createElement('div');
    element.setAttribute('data-truth', 'true');
    element.setAttribute('data-falsy', 'false');
    element.setAttribute('data-nully', 'null');
    element.setAttribute('data-undy', 'undefined');
    const jsonDaObject = JsonDA.data(element);
    const expected = {
      truth: true,
      falsy: false,
      nully: null,
      undy: undefined,
    };
    expect(jsonDaObject).toMatchObject(expected);
  });
  test('if no HTMLElement is passed it throws an error', () => {
    expect(() => {
      const jsonDaObject = JsonDA.data({});
    }).toThrow();
  });
  test('if namespace is given it will group all properties according to namespace', () => {
    const element = document.createElement('div');
    element.setAttribute('data-component-name', 'MyComponent');
    element.setAttribute('data-component-version', '1.0.0');
    element.setAttribute('data-component-deployed', 'true');
    const jsonDaObject = JsonDA.data(element, 'component');
    const expected = {
      component: {
        name: 'MyComponent',
        version: '1.0.0',
        deployed: true,
      },
    };
    const myCachedObject = element.__data_component;
    expect(myCachedObject).toMatchObject(expected);
  });
});
