# Pages
_Pages_ are able to handle some business logical and they can cast/grab messages.
NOTE: _Page_ can use `$` to select HTML elements in whole html page

##### Under the hood
Each _page_ has utility methods and properties:
- `CAST` method that wraps `Broadcast.cast` method
- `GRAB` method that wraps `Broadcast.grab` method


##### Create Page
Create your javascript file in the `pages` folder and import it into your _main javascript manifest_ file, such as follow.
NOTE: each page has to be added to _main pages collection_ in order to be able to handle its HTML page.
```js
// file: page/my-sample-page.js
import {Pages} from 'Zero';
export default class MySamplePage extends Pages {
    constructor() {
        super();
        // my page has been instantiated
    }
}
```
```js
// file: main-manifest.js
import {Zero, Pges} from 'Zero';
import MySamplePage from './pages/my-sample-page.js';
// add my-sample-page to main pages collection
Pages.create("MySamplePage", MySamplePage);
// start Zero
Zero.start();
```
##### Use Page
In your HTML page just add the `data-controller` attribute to Body element.
```html
<body class="my-body-class" data-controller="MySamplePage">
    ...
    <div id="my_id" class="my-class" data-component="MyMagicComponent" >
        <label>This element has been wrapper by my magic-component</label>
        <button class="my-button">Click me</button>
        <p id="my-hidden-message" style="display: none">This is a hidden message</p>
    </div>
    ...
</body>
```
