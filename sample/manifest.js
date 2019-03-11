import JsonDa from '../src/utils/json_da';


const component = document.querySelector('[data-component="First"]');

console.log(component);

console.log(JsonDa.data(component, 'first'));

console.log(component.__data_first);
