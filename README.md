## Constants

<dl>
<dt><a href="#Broadcast">Broadcast</a></dt>
<dd><p>Create a Broadcast object to dispatch/listen messages through the application</p>
</dd>
<dt><a href="#Inflector">Inflector</a></dt>
<dd><p>Inflector is an utility to manipulate strings</p>
</dd>
<dt><a href="#JsonDA">JsonDA</a></dt>
<dd><p>Returns the HtmlElement data attributes in object notation
If a key is given it will group each data with keys</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#cast">cast(msg, obj, immediate)</a></dt>
<dd></dd>
<dt><a href="#grab">grab(msg, callback)</a></dt>
<dd></dd>
<dt><a href="#ungrab">ungrab(msg, callback)</a></dt>
<dd></dd>
<dt><a href="#start">start()</a></dt>
<dd></dd>
</dl>

<a name="Broadcast"></a>

## Broadcast
Create a Broadcast object to dispatch/listen messages through the application

**Kind**: global constant  
<a name="Inflector"></a>

## Inflector
Inflector is an utility to manipulate strings

**Kind**: global constant  

* [Inflector](#Inflector)
    * [.cleanString(str)](#Inflector.cleanString) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
    * [.pluralize(str, plural)](#Inflector.pluralize) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
    * [.singularize(str, singular)](#Inflector.singularize)
    * [.camelize()](#Inflector.camelize) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
    * [.underscore()](#Inflector.underscore) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
    * [.humanize(str, [lowFirstLetter])](#Inflector.humanize) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
    * [.capitalize(str)](#Inflector.capitalize) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
    * [.dasherize()](#Inflector.dasherize) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
    * [.demodulize(str)](#Inflector.demodulize) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
    * [.tableize(str)](#Inflector.tableize) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
    * [.classify(str)](#Inflector.classify) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
    * [.foreignKey(str, [dropIdUbar])](#Inflector.foreignKey) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
    * [.ordinalize(str)](#Inflector.ordinalize) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

<a name="Inflector.cleanString"></a>

### Inflector.cleanString(str) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
Clean given string and remove spaces and new-lines from string

**Kind**: static method of [<code>Inflector</code>](#Inflector)  

| Param | Type |
| --- | --- |
| str | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | 

<a name="Inflector.pluralize"></a>

### Inflector.pluralize(str, plural) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
Returns the plural string for given singular

**Kind**: static method of [<code>Inflector</code>](#Inflector)  

| Param | Type |
| --- | --- |
| str | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | 
| plural | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | 

**Example**  
```js
Inflector.pluralize('person')           -> 'people'
Inflector.pluralize('octopus')          -> 'octopi'
Inflector.pluralize('Hat')              -> 'Hats'
Inflector.pluralize('person', 'guys')   -> 'guys'
```
<a name="Inflector.singularize"></a>

### Inflector.singularize(str, singular)
Returns the singular string for given plural

**Kind**: static method of [<code>Inflector</code>](#Inflector)  

| Param | Type |
| --- | --- |
| str | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | 
| singular | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | 

**Example**  
```js
Inflector.singularize('person')         -> 'person'
Inflector.singularize('octopi')         -> 'octopus'
Inflector.singularize('hats')           -> 'hat'
Inflector.singularize('guys', 'person') -> 'person'
```
<a name="Inflector.camelize"></a>

### Inflector.camelize() ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
Returns the string in camel case

**Kind**: static method of [<code>Inflector</code>](#Inflector)  
**See**: https://lodash.com/docs/4.17.10#camelCase  
**Example**  
```js
{'Foo Bar' => 'fooBar'}
```
<a name="Inflector.underscore"></a>

### Inflector.underscore() ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
Returns the string in snake case

**Kind**: static method of [<code>Inflector</code>](#Inflector)  
**See**: https://lodash.com/docs/4.17.10#snakeCase  
**Example**  
```js
{'Foo Bar' => 'foo_bar'}
```
<a name="Inflector.humanize"></a>

### Inflector.humanize(str, [lowFirstLetter]) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
Returns the human readable string

**Kind**: static method of [<code>Inflector</code>](#Inflector)  
**See**: https://lodash.com/docs/4.17.10#startCase  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| str | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) |  |  |
| [lowFirstLetter] | [<code>boolean</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | <code>false</code> | set to true if the first word must be lowercase |

**Example**  
```js
{'--foo-bar--' >= 'Foo Bar'}
```
<a name="Inflector.capitalize"></a>

### Inflector.capitalize(str) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
Returns the string with ONLY the first character to upper case and the remaining to lower case.

**Kind**: static method of [<code>Inflector</code>](#Inflector)  
**See**: https://lodash.com/docs/4.17.11#capitalize  

| Param | Type |
| --- | --- |
| str | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | 

**Example**  
```js
{'foo BAR' >= 'Foo bar'}
```
<a name="Inflector.dasherize"></a>

### Inflector.dasherize() ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
Returns the string in kebab case

**Kind**: static method of [<code>Inflector</code>](#Inflector)  
**See**: https://lodash.com/docs/4.17.10#kebabCase  
**Example**  
```js
{'Foo Bar' => 'foo-bar'}
```
<a name="Inflector.demodulize"></a>

### Inflector.demodulize(str) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
?

**Kind**: static method of [<code>Inflector</code>](#Inflector)  

| Param | Type |
| --- | --- |
| str | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | 

**Example**  
```js
Inflector.demodulize('Message::Bus::Properties')    -> 'Properties'
```
<a name="Inflector.tableize"></a>

### Inflector.tableize(str) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
?

**Kind**: static method of [<code>Inflector</code>](#Inflector)  

| Param | Type |
| --- | --- |
| str | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | 

**Example**  
```js
Inflector.tableize('MessageBusProperty')    -> 'message_bus_properties'
```
<a name="Inflector.classify"></a>

### Inflector.classify(str) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
?

**Kind**: static method of [<code>Inflector</code>](#Inflector)  

| Param | Type |
| --- | --- |
| str | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | 

**Example**  
```js
Inflector.classify('message_bus_properties')    -> 'MessageBusProperty'
```
<a name="Inflector.foreignKey"></a>

### Inflector.foreignKey(str, [dropIdUbar]) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
?

**Kind**: static method of [<code>Inflector</code>](#Inflector)  

| Param | Type | Default |
| --- | --- | --- |
| str | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) |  | 
| [dropIdUbar] | [<code>boolean</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | <code>false</code> | 

**Example**  
```js
Inflector.foreignKey('MessageBusProperty')       -> 'message_bus_property_id'
Inflector.foreignKey('MessageBusProperty', true) -> 'message_bus_propertyid'
```
<a name="Inflector.ordinalize"></a>

### Inflector.ordinalize(str) ⇒ [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
**Kind**: static method of [<code>Inflector</code>](#Inflector)  

| Param | Type |
| --- | --- |
| str | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | 

**Example**  
```js
Inflector.ordinalize('the 1 pitch')     -> 'the 1st pitch'
```
<a name="JsonDA"></a>

## JsonDA
Returns the HtmlElement data attributes in object notation
If a key is given it will group each data with keys

**Kind**: global constant  
**Example**  
```js
<div data-foo-name="foo" data-foo-age="16">Foo</div>
```

* [JsonDA](#JsonDA)
    * [.data(element, key)](#JsonDA.data) ⇒ [<code>object</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
    * [.nsData(element, namespace)](#JsonDA.nsData) ⇒ [<code>object</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

<a name="JsonDA.data"></a>

### JsonDA.data(element, key) ⇒ [<code>object</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
**Kind**: static method of [<code>JsonDA</code>](#JsonDA)  

| Param | Type | Description |
| --- | --- | --- |
| element | [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element) | the HtmlElement |
| key | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) |  |

<a name="JsonDA.nsData"></a>

### JsonDA.nsData(element, namespace) ⇒ [<code>object</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
**Kind**: static method of [<code>JsonDA</code>](#JsonDA)  

| Param | Type |
| --- | --- |
| element | [<code>HTMLElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element) | 
| namespace | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | 

<a name="cast"></a>

## cast(msg, obj, immediate)
**Kind**: global function  

| Param | Type |
| --- | --- |
| msg | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | 
| obj | [<code>object</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | 
| immediate | [<code>boolean</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | 

<a name="grab"></a>

## grab(msg, callback)
**Kind**: global function  

| Param | Type |
| --- | --- |
| msg | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | 
| callback | [<code>function</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) | 

<a name="ungrab"></a>

## ungrab(msg, callback)
**Kind**: global function  

| Param | Type |
| --- | --- |
| msg | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | 
| callback | [<code>function</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) | 

<a name="start"></a>

## start()
**Kind**: global function  
