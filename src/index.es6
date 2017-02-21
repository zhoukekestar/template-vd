!(function() {
  const parser = require('./parser.js');
  const h = require('virtual-dom/h');
  const diff = require('virtual-dom/diff');
  const patch = require('virtual-dom/patch');
  const createElement = require('virtual-dom/create-element');

  const proto = Object.create(HTMLElement.prototype);
  proto.createdCallback  = function() {
    this._innerHTML = String(this.innerHTML);
    this.innerHTML = '';

    this.render = new Function('__d', `with(__d) { return ${parser(this._innerHTML.trim())} }`);

    Object.defineProperty(this, 'data', {
      get: function() {
        return this._data;
      },
      set: function(d) {
        d.h = h;

        this._data = d;

        // Get new tree
        this.newTree = this.render(d);

        // First init
        if (!this.tree) {
          this.tree = this.newTree;
          this.rootNode = createElement(this.tree);
          this.appendChild(this.rootNode);

        // Diff new tree & path it
        } else {
          var patches = diff(this.tree, this.newTree);
          this.rootNode = patch(this.rootNode, patches);
        }
      }
    })

    console.log('createdCallback');
  }

  proto.attachedCallback = function() {

  }

  document.registerElement("template-vd", {
    prototype: proto
  });

})();
