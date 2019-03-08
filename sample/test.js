
(function ($, App, Zero) {
  App.ZeroComponent('Something', {

    Messages() {
      return {
        'backtotop:wentotop': this.backToTop.bind(this),
      };
    },


    init(element) {
      this.element.find('.cta-active').on('click', (e) => {
        e.preventDefault();
        Zero.Broadcast.cast('something:activated', { code: '001' });
      });
    },

    backToTop(e, msg) {
      console.info('SOMETHING: GRABBED EVENT', e, msg);

      alert('Window has gone TOP');
      this.element.addClass('test-active');
    },

  });
}(jQuery, window.App, window.App.Zero));
App.init();
