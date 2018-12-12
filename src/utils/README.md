# Utilities
All utilities must be added to main collection `Utils` as follow
```js
Zero.Utils.create('Name_of_Utility', Utility_Object)
```
You can access all Utilities just typing
```js
Zero.Utils.{Name_of_Utility}.{Method_of_Utility}
```
All _core_ utilities are added by default to _Zero_ environment

Utilities communicate with the other project elements by using events. Messages must be avoided.
Utilities are not instantiable classes, their functionalities are made available to the other components by static functions.
The utilities init function get always executed at Project Zero's inizialization.

### Under the Hood
- utilities might have an `init()` method, If present, it gets executed at Project Zero's initialization. `init()` function are a good place to execute something at Zero startup.

### Zero's Utilities

- [Browser](#browser) (_core_)
- [JsonDa](#jsonda) (_core_)
- [Ajax](#ajax) (_core_)
- [Responsive](#responsive) (_core_)

### Browser
It stores Browser's information such as `name` and `version`. It also knows the `OS` and `mobile` properties. It adds `{browser-name} {browser-name-version} {mobile/desktop}` css class to _HTML_ element. It also adds `data-os-detected={OS}` data attribute to _HTML_ element
###### Methods and Events:
- `Browser.is(name, version)` Returns _true_ if browser's name is equal to _name_ parameter (it can be either upper or lower case). If you pass _version_ it checks the browser's version number, too.
_Browser.isChrome Browser.isSafari Browser.isOpera Browser.isFirefox Browser.isExplorer_ are equivalent to `Browser.is('Chrome')` and all other cases.
- `Browser.isMobile` Returns _true_ if browser is running on a mobile device
- `Browser.Version` Returns the browser's version number
- `Browser.Browser` Returns the browser's standard name
- `Browser.OS` Returns the detected operative system
- *const* `Browser.Events.BROWSER_DETECTED` is emitted once browser has been detected

### JsonDa
It parses all _data-attributes_ of an HTML element and returns a JSON object representing all them values
###### Methods and Events:
- `JsonDA.nsData(element, namespace)` Returns a JSON object representing all _data-attributes_ of given HTML element scoped by _namespace_.
- `JsonDA.data(element, namespace)` It wraps the `nsData()` method. NOTE: it stores the returned JSON object in order to avoid recalculating it again

### Ajax
It executes ajax request
###### Methods:
- `Ajax.get/post/put/delete(url, data, options)` It performs an ajax request and returns a _jQuery XHR Object_ . All arguments are directly passed to jQuery function.

###### Events
- `Ajax.Events.AJAX_SUCCESS`: emitted for each ajax request that comes with 20* status code
- `Ajax.Events.AJAX_ERROR`: emitted for each ajax request that comes with 40* / 50* status code
- `Ajax.Events.AJAX_PROGRESS`: emitted for each ajax request which is downloading a file.
- `Ajax.Events.AJAX_STATED`: emitted once for each group of ajax request which is stated
- `Ajax.Events.AJAX_COMPLETED`: emitted once for each group of ajax request which is completed


### Responsive
It manages breakpoints
###### How to configure the util:
It is possible to set the breakpoints that trigger the utility via:
- `JavaScript`: By calling the `setBreakpoints()` function (before `Zero`'s start), and passing it an object containing the breakpoints enter value (expressed in pixels, without the CSS unit). E.g. passing the following object `{sm:0,md:768,large:1024}` will set the following breakpoints:
    - `sm` : 0-768
    - `md` : 768-1023
    - `lg` : 1024-100000
- `CSS`: By giving to a dom-element meta element with the data attribute "responsive" (e.g. <meta data-responsive="">) in the DOM a font-family value containing the breakpoints e.g. `font-family : "sm=0&md=768&large=1024&"`. This value will be parsed and used by the utility to set the breakpoints. The selector used by the util to find the dom element, is exported by the utility in the `Selectors` object (`Selectors.MqTagSelector`) it can be changed (before `Zero`'s start) in order to use different parameter to find the dom element (i.g. `Selectors.MqTagSelector = div.media-query-conf`).  
- `Data-Attribute`: By giving to the <html> dom element, data-responsive attributes containing label and resolution with the sintax : `data-responsive-LABEL="RESOLUTION"`. E.g. `data-responsive-sm="0" data-responsive-md="768" data-responsive-lg="1024"`

If no breakpoint is provided, the default ones will be used:
- `xs` : 0
- `sm` : 576
- `md` : 768
- `lg` : 1024
- `xl` : 1280

###### Methods:
- `Responsive.resolutionIs`: accept as an argument, the resolution label (e.g. `Responsive.resolutionIs("sm")`). Returns `true` if the passed resolution is the current one.
- `Responsive.getCurrentResolution`: return an object containing data about the current resolution (e.g. `{label: "sm", enter: 576, exit: 768}`)
- `Responsive.setBreakpoints`: used for setting the breakpoints before `Zero`'s start as explained in the `How to configure the util` section.

###### Variables:
- `Events`: contains the events emitted by the util
- `Selectors`: contains the `MqTagSelector` (selector used by the util to find the DOM element for the mq configuration via CSS) and `DataAttribute` (data-attribute which the util will use to extract the media query configuration from the <html> tag element, by default its value is "responsive", it can be changed before `Zero`'s start)

###### Events:
- `Responsive.Events.Ready`: Emitted when the util is ready, the event method is passed a data object with the following structure containing information about the enter resolution and the configured media queries:
   ``` JavaScript
    {
     enterRes: {
                    label: "sm", 
                    enter: 576, 
                    exit: 767
                }, 
     configuredMediaQueries: { 
                        0: {
                               label: "xs", 
                               enter: 0, 
                               exit: 575
                           } 
                        1: {
                               label: "sm", 
                               enter: 576, 
                               exit: 767
                            } 
                        ....
                      } 
    }`
   ```
- `Responsive.Events.ResolutionEnter`: Emitted when a resolution is entered, the event method is passed a data object with the following structure (`{label:md,enter:0,exit:767}`) referring to the entered resolution
- `Responsive.Events.ResolutionEnter:` + `breakpointLabel` : e.g. (`Zero.Utils.Responsive.Events.ResolutionEnter:` + `xs`)  Emitted when a resolution is entered
- `Responsive.Events.ResolutionExit`: Emitted when a resolution is left, the event method is passed a data object with the following structure (`{label:md,enter:0,exit:767}`) referring to the left resolution
- `Responsive.Events.ResolutionChanged`: Emitted when the resolution changes, the event method is passed two data objects with the following structure (`{label:md,enter:0,exit:767}`) referring to the previous and current resolution

