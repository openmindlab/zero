import {Logger, Zero, Components, Utils} from 'Zero'

const Log = new Logger('<%= name %>');

export default class <%= name %> extends Components {


  get Messages() {
    return {
      "Message:To:handle": this.onMessageHandle
    }
  }


  constructor(element) {
    super(element)
  }

  onMessageHandle() {
    // TODO: do something awesome
  }

}
