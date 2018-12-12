const $Broadcast = App.Broadcast;

describe('The $Broadcast object', () => {
  it('should be an object', () => {
    assert.typeOf($Broadcast, 'object');
  });

  it('should contain the cast, grab and ungrab functions', () => {
      assert.typeOf($Broadcast.cast, 'function');
      assert.typeOf($Broadcast.grab, 'function');
      assert.typeOf($Broadcast.ungrab, 'function');
  });

  it('should send a message with cast and grab it with grab', () => {
      $Broadcast.grab('testEvent', body => {
          assert.typeOf(body, 'object');
          assert.property(body, 'id');
          assert.propertyVal(body, 'id', 'this is a test');
      });

      $Broadcast.cast('testEvent', { id: 'this is a test' });
  });
});
