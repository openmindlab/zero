describe("The App object", () => {
  it("should be globally declared", () => {
    assert.property(window, "App");
  });

  it("should NOT be a function", () => {
    expect(window.App).to.not.be.a("function");
  });

  it("should have the function Components", () => {
    assert.typeOf(App.Components, "function");
  });

  it("should be started", () => {
    assert.typeOf(App.start, "function");
  });

  it("should have the property html", () => {
    assert.isNotNull(window.App.Html);
  });

  it("should have the property body", () => {
    assert.isNotNull(window.App.Body);
  });

  describe("App.Body[0]", () => {
    it("should be equal to document.body", () => {
      expect(window.App.Body[0]).to.be.equal(document.body);
    });
  });

  describe("App.Html[0]", () => {
    it("should be equal to document.documentElement", () => {
      expect(window.App.Html[0]).to.be.equal(document.documentElement);
    });
  });
});
