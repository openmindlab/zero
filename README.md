# Project `Zero`

##### Contribute

Make sure you're using `nvm` as node environment. Otherwise check it on [nvm](https://github.com/creationix/nvm)
Make sure you have installed brew. Otherwise check it on [Homebrew](https://brew.sh/index_it.html)

```sh
git clone ssh://git@stash.openmindonline.it:7999/oc/zero.git
cd zero
nvm use
npm install -g npm
brew install yarn --without-node
yarn install
yarn dev
```


# Components
_Components_ are the beating heart of `Zero`. They have all functionalities to make HTML page works properly.
They are plug-and-play javascript class which will be auto-instantiated by `Zero` based on _data-component_ HTML attribute. Each component will be instantiated for each HTML element that has _data-component_ attribute.
Each HTML element can be handled by one or more _Component_.
NOTE: _Component_ must not use `$` to select HTML elements out of its related HTML element.

_Components_ can emit/grab messages in order to comunicate eachother and with the _Page_ (see Pages)

##### Under the hood
Each _component_ has utility methods and properties:
- _get_ `element` returns the HTML element handled by this component. Note: it is an instance of Zero.Dom (such as jQuery)
- _get_ `data` returns a JSON object representing its _data-attribute_ parsed by JsonDA utility (see Utilities)
- `CAST` method that wraps `Broadcast.cast` method
- `GRAB` method that wraps `Broadcast.grab` method


##### Create Component
Create your javascript file in the `components` folder and import it into your _main javascript manifest_ file, such as follow.
NOTE: each component has to be added to _main components collection_ in order to be able to handle its HTML elements.
```js
// file: components/my-magic-component.js
import {Components} from 'Zero';
export default class MyMagicComponent extends Components {
    constructor(element) {
        super(element);
        // my component has been instantiated and is ready to do magic
    }
}
```
```js
// file: main-manifest.js
import {Zero, Components} from 'Zero';
import MyMagicComponent from './components/my-magic-component.js';
// add my-magic-component to main components collection
Components.create("MyMagicComponent", MyMagicComponent);
// start Zero
Zero.start();
```
##### Use component
In your HTML page just add the `data-component` attribute to make the magic starts.
```html
<div id="my_id" class="my-class" data-component="MyMagicComponent" >
    <label>This element has been wrapper by my magic-component</label>
    <button class="my-button">Click me</button>
    <p id="my-hidden-message" style="display: none">This is a hidden message</p>
</div>
```




# Dynamic Import of Components
Create a file named `lazy-component.js` in your favourite folder and copy-n-paste this snippet.
Make sure you have set the path correctly: replace the string `RELATIVE_PATH_OF_YOUR_DYNAMIC_COMPONENT` with your relative path to your dynamic components
```js
import {Components} from 'Zero';

export default function LazyComponent(name) {

  class LazyComponent extends Components {
    constructor(element) {
      super(element);

      const self = this;

      import(/* webpackChunkName: `[request]` */ `{RELATIVE_PATH_OF_YOUR_DYNAMIC_COMPONENT}/${name.toLowerCase()}`).then( (module) => {
        const comp = module.default;

        comp.prototype.__defineGetter__('Name', ()  => self.Name);
        const C = new comp( element );
        self.destroy = self.destroy.bind(C);

      });

    }
  }
  return LazyComponent;
}
```

Add custom section in your webpack configuration:
```js
output: {
  chunkFilename: "component-[name].dev.js"
}
```

In order to use LazyComponent with Zero you have to do something as follow:
```js
import LazyComponent from 'path/to/lazy-component.js';

...
Component.create('MyComponentName', LazyComponent('MyComponentFileName') );
...

Zero.start()
```


### Work with Zero
#### Creating component

In your project go to 'javascripts' folder and create `components` folder.

Create a new file as follow:
```sh
my_new_compoent.js
```

Copy this code in order to quickly start using it
```js
import {Logger, Zero, Components, Utils} from 'Zero'

const Log = new Logger('MyComponentName');

export default class MyComponentName extends Components {

  get Messages() {
    return {
      "Message:To:Handle": this.onMessageReceived
    }
  }

  constructor(element) {
    super(element)
  }

  onMessageReceived() {
    // TODO: do something awesome
  }

}

```


### Enjoy ;)
