import {Zero, Utils, Components, Pages} from '../core/core.js'
// import $ from 'Vendor/jquery';

function LoadUtils(Context) {
  Context.keys().forEach(function(util){
    let module = Context( util );
    let util_name = util.match(/\.\/(.*)\.js/)[1];
    util_name = Zero.StringUtils.camelize( util_name );
    let N = module.default.name || util_name;
    if ( ! (N in Utils) ) {
      Utils.create( N, module.default );
    }
  });
}

function LoadComponents(Context) {
  Context.keys().forEach(function(component){
    let module = Context( component );
    let proto = Object.getPrototypeOf( module.default );
    while( proto && (proto !== Components) ) {
      proto = Object.getPrototypeOf( proto );
    }

    if ( !proto ) return true;

    let match = component.match(/\.\/(.*)\/.*\.js/);
    if ( ! match ) {
      match = component.match(/\.\/(.*)\.js/)
    }

    let comp_name = match[1];
    let N = Zero.StringUtils.camelize( comp_name );
    if ( ! (N in Components.__comps__ ))
      Components.create( N, module.default );
  });
}


function LoadPages(Context) {
  Context.keys().forEach(function(page){
    let module = Context( page );

    let proto = Object.getPrototypeOf( module.default );
    while( proto && (proto !== Pages) ) {
      proto = Object.getPrototypeOf( proto );
    }

    if ( !proto ) return true;

    let page_name = page.match(/\.\/(.*)\.js/)[1];
    let N = Zero.StringUtils.camelize( page_name );
    if ( ! (N in Pages) ) {
      Pages.create( N, module.default );
    }
  });
}


// Zero.Dom = $;

// LoadUtils( require.context("../utils", true, /\.js$/) );
LoadComponents( require.context("../components", true, /\.js$/) );
LoadPages( require.context("../pages", true, /\.js$/) );

// import LazyComponent from '../core/lazy-component';
// Components.create('First', LazyComponent('First') );

Zero.start({});
window.Zero = Zero;
