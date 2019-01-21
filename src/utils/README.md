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

- [JsonDa](#jsonda) (_core_)

##### JsonDa
It parses all _data-attributes_ of an HTML element and returns a JSON object representing all them values
###### Methods and Events:
- `JsonDA.nsData(element, namespace)` Returns a JSON object representing all _data-attributes_ of given HTML element scoped by _namespace_.
- `JsonDA.data(element, namespace)` It wraps the `nsData()` method. NOTE: it stores the returned JSON object in order to avoid recalculating it again



# Zero Ajax module standard API
It executes ajax request

##### Configuration:
- `method`: (String)
The default method for each request
one of _GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS_

- `onRequest`: (Function)
hook executed before each request

- `onResponse`: (Function)
hook executed after each response

- `throwErrors`: (boolean)
force to throw error after an ErrorResponse

- `headers`: (Object)
default headers for each request

- `baseUrl`: (String)
the default _baseUrl_ for each request

- `querystring`: (Object)
the default querystring for each request

- `timeout`: (Number)
the default timeout for each request

- `retry`: (Number)
the default number of retries

##### Methods:
- `get`: (String url, Object options)
Performs a request via `GET` method. `options` is a literal object following _configuration_ above
- `post`: (String url, Object options)
Performs a request via `POST` method. `options` is a literal object following _configuration_ above
- `put`: (String url, Object options)
Performs a request via `PUT` method. `options` is a literal object following _configuration_ above
- `delete`: (String url, Object options)
Performs a request via `DELETE` method. `options` is a literal object following _configuration_ above
- `patch`: (String url, Object options)
Performs a request via `PATCH` method. `options` is a literal object following _configuration_ above
- `head`: (String url, Object options)
Performs a request via `HEAD` method. `options` is a literal object following _configuration_ above
- `options`: (String url, Object options)
Performs a request via `OPTIONS` method. `options` is a literal object following _configuration_ above

- `_request`: (String url, Object options)
Performs a generic request. `options` is a literal object following _configuration_ above


###### Note:
each method returns a _Promise_ with a `abort` method in order to abort the current request

##### Events
`get Events`: getter property that returns an _KeyValuePair_ object like follow:
- `AJAX_SUCCESS`: emitted for each ajax request that comes with 20* status code
- `AJAX_ERROR`: emitted for each ajax request that comes with 40* / 50* status code, or while aborting it
- `AJAX_STATED`: emitted once for each group of ajax request which is stated
- `AJAX_COMPLETED`: emitted once for each group of ajax request which is completed



