export default class Ajax {
  get NAME() {
    return 'Ajax';
  }

  // DO NOT MODIFY OR EXTENDS THIS PROPERTY: add here all other config keys
  get Defaults() {
    return {
      // the default method for each request
      method: 'GET',
      // hook executed before request will be sent
      onRequest: null,
      // hook executed while getting response
      onResponse: null,
      // force to throw error after an ErrorResponse
      throwErrors: false,
      // default header for each request
      headers: {},
      // the default base url for each request
      baseUrl: null,
      // the default timeout for each request
      timeout: 0,
      // the default number of retries
      retry: 0,
      // querystring or body of the request
      data: null,
      // true if body should be sent as json
      json: false,
      // true if body should be sent as text
      text: false,
    };
  }

  get Events() {
    return {
      AJAX_SUCCESS: 'Ajax:Success',
      AJAX_ERROR: 'Ajax:Error',
      AJAX_STATED: 'Ajax:Started',
      AJAX_COMPLETED: 'Ajax:Completed',
    };
  }

  get Engine() {
    return this.engine;
  }

  get Options() {
    return this._options;
  }

  constructor(options) {
    this.engine = null;
    options = Object.assign({}, this.Defaults, options || {});
    this._options = this.bindOptions(options);
  }

  bindOptions(opts) {
    return Object.assign({}, this.Defaults, opts);
  }

  get() {
    throw 'This is an interface only - no methods has been implemented';
  }

  post() {
    throw 'This is an interface only - no methods has been implemented';
  }

  put() {
    throw 'This is an interface only - no methods has been implemented';
  }

  delete() {
    throw 'This is an interface only - no methods has been implemented';
  }

  patch() {
    throw 'This is an interface only - no methods has been implemented';
  }

  head() {
    throw 'This is an interface only - no methods has been implemented';
  }

  options() {
    throw 'This is an interface only - no methods has been implemented';
  }

  abortAll() {
    throw 'This is an interface only - no methods has been implemented';
  }

  calculateQueryString(data) {
    throw 'This is an interface only - no methods has been implemented';
  }
}
