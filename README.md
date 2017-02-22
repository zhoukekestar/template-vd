# template-vd
A template webcomponets based on virtual dom.

[Here](https://zhoukekestar.github.io/template-vd/src/demo.html) is a online demo.

# How to dev
* `npm install watchify -g`
* `cd src && watchify index.es -o index.js`
* `serve .`
* Go `http://localhost/demo.html`

# Quick Start
```html
<!-- import -->
<link rel="import" href="./template-vd/index.html">

<!-- tempate -->
<template-vd id='vd'>
  <ul><li repeat='item, index in items'>{{index}} : <b>{{item}}</b></li></ul>
</template-vd>

<!-- set data -->
<script>
  vd.data = {
    items: ["a", "b", "c"]
  }
</script>
```
