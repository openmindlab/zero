import Components from './components';

export default function LazyComponent(name) {

  class LazyComponent extends Components {
    constructor(element) {
      super(element);

      const self = this;

      import(/* webpackChunkName: `[request]` */ `../components/${name.toLowerCase()}`).then( (module) => {
        const comp = module.default;
        Object.defineProperty(comp, 'Name', {
          enumerable:true,
          value:self.Name
        })
        const C = new comp( element );
        self.destroy = self.destroy.bind(C);
      });

    }
  }

  return LazyComponent;
}
