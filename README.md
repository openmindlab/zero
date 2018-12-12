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
