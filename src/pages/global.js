import {Zero, Logger, Pages, Components} from '../core/core.js'

const Log = new Logger("Pages/Global");


export default class Global extends Pages {


  constructor() {
    super();

    this.on('test:event', () => {
      Log.i("on EVENT Page itself");
    });

    setTimeout( () => {
      this.trigger('test:event');
    }, 1000)

    Zero.Events.on( Components.Events.Init, (comp) => {
      comp.on('test:component', () => {
        Log.i("on EVENT COMPONENT");
      })
    } );

  }


}
