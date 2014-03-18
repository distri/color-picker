window["distri/color-picker:master"]({
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "mode": "100644",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2014 \n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "color-picker\n============\n\nPicking my colors like yeah\n",
      "type": "blob"
    },
    "style.styl": {
      "path": "style.styl",
      "mode": "100644",
      "content": "*\n  box-sizing: border-box\n\nhtml\n  height: 100%\n  user-select: none\n\nbody\n  background-color: red\n  height: 100%\n  margin: 0\n  padding-right: 40px\n\n.overlays\n  position: relative\n  width: 100%\n  height: 100%\n\n.overlay\n  width: 100%\n  height: 100%\n  position: absolute\n\n  &.w\n    background-image: linear-gradient(bottom, #fff, rgba(255, 255, 255, 0))\n  &.b\n    background-image: linear-gradient(left, #000, rgba(0, 0, 0, 0))\n\n.wrap\n  width: 100%\n  height: 100%\n  position: relative\n\n.sidebar\n  padding-top: 40px\n  position: absolute\n  top: 0\n  right: 0\n  width: 40px\n  height: 100%\n\n.hue\n  background-image: linear-gradient(hsla(0, 100%, 54%, 1),hsla(10, 100%, 54%, 1),hsla(20, 100%, 54%, 1),hsla(30, 100%, 54%, 1),hsla(40, 100%, 54%, 1),hsla(50, 100%, 54%, 1),hsla(60, 100%, 54%, 1),hsla(70, 100%, 54%, 1),hsla(80, 100%, 54%, 1),hsla(90, 100%, 54%, 1),hsla(100, 100%, 54%, 1),hsla(110, 100%, 54%, 1),hsla(120, 100%, 54%, 1),hsla(130, 100%, 54%, 1),hsla(140, 100%, 54%, 1),hsla(150, 100%, 54%, 1),hsla(160, 100%, 54%, 1),hsla(170, 100%, 54%, 1),hsla(180, 100%, 54%, 1),hsla(190, 100%, 54%, 1),hsla(200, 100%, 54%, 1),hsla(210, 100%, 54%, 1),hsla(220, 100%, 54%, 1),hsla(230, 100%, 54%, 1),hsla(240, 100%, 54%, 1),hsla(250, 100%, 54%, 1),hsla(260, 100%, 54%, 1),hsla(270, 100%, 54%, 1),hsla(280, 100%, 54%, 1),hsla(290, 100%, 54%, 1),hsla(300, 100%, 54%, 1),hsla(310, 100%, 54%, 1),hsla(320, 100%, 54%, 1),hsla(330, 100%, 54%, 1),hsla(340, 100%, 54%, 1),hsla(350, 100%, 54%, 1),hsla(360, 100%, 54%, 1))\n  position: absolute\n  right: 0\n  width: 40px\n  height: 100%\n\n.swatch\n  width: 40px\n  height: 40px\n  border: 2px solid white\n  position: absolute\n  top: 0\n  right: 0\n",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "mode": "100644",
      "content": "Color Picker\n============\n\nThe goal of this color picker is to have a a picker that works well in almost\nany size of environment, is easily embeddable within other web applications,\nand responds instantly to mouse or touch interactions.\n\nLoad dependencies.\n\n    Observable = require \"observable\"\n    Touchy = require(\"./lib/touchy\")\n    Throttle = require(\"./lib/throttle\")\n    HSL = require \"./lib/hsl\"\n\nApply stylesheet.\n\n    {applyStylesheet} = require(\"./util\")\n    applyStylesheet(require(\"./style\"))\n\nRender template.\n\n    document.body.appendChild require(\"./template\")()\n\nUse the postmaster to send value to our parent, store our current value in it as well.\n\n    postmaster = require(\"postmaster\")()\n    postmaster.value = Observable()\n\nPropagate newly received values.\n\n    postmaster.value.observe (newValue) ->\n      if match = newValue.match HSL.matcher\n        [match, values...] = match\n\n        [h, s, l] = values.map parseFloat\n\n        hue(h / 360)\n        saturation(s / 100)\n        lightness(l / 100)\n\n        location.hash = JSON.stringify(newValue)\n        notifyParent(newValue)\n\nHook up observables. These map the x and y observable dimensions into names of \nwhat they actually are.\n\n    {x, y} = Touchy(document.querySelector(\".overlay.w\"))\n    {y:hue} = Touchy(document.querySelector(\".hue\"))\n\n    x.observe (newValue) ->\n      t = newValue/2\n\n      saturation(newValue)\n      lightness((1 - t) * y() + t)\n\n    y.observe (newValue) ->\n      t = x() / 2\n      lightness((1 - t) * newValue + t)\n\n    saturation = Observable(1)\n    lightness = Observable(0.54)\n\nOur swatch and background color update whenever a component value changes.\n\n    swatch = document.querySelector(\".swatch\")\n\n    update = ->\n      h = Math.floor hue() * 360\n      s = Math.floor saturation() * 100\n      l = Math.floor lightness() * 100\n\n      document.body.style.backgroundColor = \"hsl(#{h}, 100%, 54%)\"\n      value = \"hsl(#{h}, #{s}%, #{l}%)\"\n      swatch.style.backgroundColor = value\n      postmaster.value value\n\nThrottle notifications to parent to limit to `20/s`.\n\n    notifyParent = Throttle(0.05) (value) ->\n      postmaster.sendToParent\n        value: value\n\n    lightness.observe update\n    saturation.observe update\n    hue.observe update\n\nInitialize values. \n\n    if location.hash\n      postmaster.value JSON.parse location.hash.substring(1)\n    else\n      hue(0)\n      saturation(1)\n      lightness(0.54)\n",
      "type": "blob"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "mode": "100644",
      "content": "version: \"0.1.0\"\ndependencies: \n  observable: \"distri/observable:v0.1.0\"\n  postmaster: \"distri/postmaster:v0.2.1\"\n",
      "type": "blob"
    },
    "util.coffee.md": {
      "path": "util.coffee.md",
      "mode": "100644",
      "content": "Util\n====\n\n    module.exports =\n      applyStylesheet: (style, id=\"primary\") ->\n        styleNode = document.createElement(\"style\")\n        styleNode.innerHTML = style\n        styleNode.id = id\n\n        if previousStyleNode = document.head.querySelector(\"style##{id}\")\n          previousStyleNode.parentNode.removeChild(prevousStyleNode)\n\n        document.head.appendChild(styleNode)\n",
      "type": "blob"
    },
    "template.haml": {
      "path": "template.haml",
      "mode": "100644",
      "content": ".swatch\n.sidebar\n  .wrap\n    .hue\n.overlays\n  .overlay.b\n  .overlay.w\n",
      "type": "blob"
    },
    "scrap": {
      "path": "scrap",
      "mode": "100644",
      "content": ".hue\n  background-image: \n    linear-gradient(\n      left, \n      hsla(0, 100%, 54%, 1),\n      hsla(10, 100%, 54%, 1),\n      hsla(20, 100%, 54%, 1),\n      hsla(30, 100%, 54%, 1),\n      hsla(40, 100%, 54%, 1),\n      hsla(50, 100%, 54%, 1),\n      hsla(60, 100%, 54%, 1),\n      hsla(70, 100%, 54%, 1),\n      hsla(80, 100%, 54%, 1),\n      hsla(90, 100%, 54%, 1),\n      hsla(100, 100%, 54%, 1),\n      hsla(110, 100%, 54%, 1),\n      hsla(120, 100%, 54%, 1),\n      hsla(130, 100%, 54%, 1),\n      hsla(140, 100%, 54%, 1),\n      hsla(150, 100%, 54%, 1),\n      hsla(160, 100%, 54%, 1),\n      hsla(170, 100%, 54%, 1),\n      hsla(180, 100%, 54%, 1),\n      hsla(190, 100%, 54%, 1),\n      hsla(200, 100%, 54%, 1),\n      hsla(210, 100%, 54%, 1),\n      hsla(220, 100%, 54%, 1),\n      hsla(230, 100%, 54%, 1),\n      hsla(240, 100%, 54%, 1),\n      hsla(250, 100%, 54%, 1),\n      hsla(260, 100%, 54%, 1),\n      hsla(270, 100%, 54%, 1),\n      hsla(280, 100%, 54%, 1),\n      hsla(290, 100%, 54%, 1),\n      hsla(300, 100%, 54%, 1),\n      hsla(310, 100%, 54%, 1),\n      hsla(320, 100%, 54%, 1),\n      hsla(330, 100%, 54%, 1),\n      hsla(340, 100%, 54%, 1),\n      hsla(350, 100%, 54%, 1),\n      hsla(360, 100%, 54%, 1)\n    )\n",
      "type": "blob"
    },
    "lib/touchy.coffee.md": {
      "path": "lib/touchy.coffee.md",
      "mode": "100644",
      "content": "Touchy\n======\n\n    Observable = require \"observable\"\n\n    MAX = 1\n\nGet x,y position changes from mouse and touch events in an html element.\n\n    module.exports = (element, {x,y}={}) ->\n\n      x = Observable(x)\n      y = Observable(y)\n\n      # Keep track of if the mouse is active in the element\n      active = false\n\n      emit = (e) ->\n        position = localPosition(element, e)\n\n        x(position.x)\n        y(position.y)\n\nWhen we click within the element emit the values for the position we clicked at.\n\n      listen element, \"mousedown\", (e) ->\n        active = true\n\n        emit e\n\nHandle touch starts\n\n      listen element, \"touchstart\", (e) ->\n        # NOTE: Global `event`\n        processTouches event, emit\n\nWhen the mouse moves apply a change for each x value in the intervening positions.\n\n      listen element, \"mousemove\", (e) ->\n        emit(e) if active\n\nHandle moves outside of the element.\n\n      listen document, \"mousemove\", (e) ->\n        emit(e) if active\n\nHandle touch moves.\n\n      listen element, \"touchmove\", (e) ->\n        # NOTE: Global `event`\n        processTouches event, emit\n\nHandle releases.\n\n      listen element, \"mouseup\", (e) ->\n        emit e\n\n        active = false\n\n        return\n\nHandle touch ends.\n\n      listen element, \"touchend\", (e) ->\n        # NOTE: Global `event`\n        processTouches event, emit\n\nWhenever the mouse button is released from anywhere, deactivate. Be sure to emit \nthe position if it was activated within the element.\n\n      listen document, \"mouseup\", (e) ->\n        emit(e) if active\n    \n        active = false\n    \n        return\n\n      x: x\n      y: y\n\nHelpers\n-------\n\n    localPosition = (element, event) ->\n      rect = element.getBoundingClientRect()\n\n      point =\n        x: clamp (event.pageX - rect.left) / rect.width, 0, MAX\n        y: clamp (event.pageY - rect.top) / rect.height, 0, MAX\n\n      # Add mouse into touch identifiers as 0\n      point.identifier = (event.identifier + 1) or 0\n\n      return point\n\n    processTouches = (event, fn) ->\n      event.preventDefault()\n  \n      if event.type is \"touchend\"\n        # touchend doesn't have any touches, but does have changed touches\n        touches = event.changedTouches\n      else\n        touches = event.touches\n\n      Array::forEach.call touches, fn\n\nAttach an event listener to an element\n\n    listen = (element, event, handler) ->\n      element.addEventListener(event, handler, false)\n\nClamp a number to be within a range.\n\n    clamp = (number, min, max) ->\n      Math.min(Math.max(number, min), max)\n",
      "type": "blob"
    },
    "lib/throttle.coffee.md": {
      "path": "lib/throttle.coffee.md",
      "mode": "100644",
      "content": "Throttle\n========\n\nA throttle is the mechanism by which the flow of a fluid is managed by constriction or obstruction.\n\n`cycle` is the minimum time in seconds that will occur between emitting data.\n\nThrottle is a pipe generator.\n\n    module.exports = (cycle) ->\n      lastFired = -Infinity\n      lastValue = undefined\n      timeout = null\n      t = cycle * 1000 # ms\n\n      (output) ->\n        (input) ->\n          lastValue = input\n\n          unless timeout\n            currentTime = +new Date\n            delta = currentTime - lastFired\n            target = t - delta\n\n            timeout = setTimeout ->\n              lastFired = +new Date\n              output(lastValue)\n              timeout = null\n            , target\n",
      "type": "blob"
    },
    "lib/hsl.coffee.md": {
      "path": "lib/hsl.coffee.md",
      "mode": "100644",
      "content": "HSL\n===\n\n    module.exports =\n      matcher: /hsl\\(([\\d.]+),\\s*([\\d.]+)%,\\s*([\\d.]+)%\\)/\n",
      "type": "blob"
    }
  },
  "distribution": {
    "style": {
      "path": "style",
      "content": "module.exports = \"* {\\n  -ms-box-sizing: border-box;\\n  -moz-box-sizing: border-box;\\n  -webkit-box-sizing: border-box;\\n  box-sizing: border-box;\\n}\\n\\nhtml {\\n  height: 100%;\\n  -ms-user-select: none;\\n  -moz-user-select: none;\\n  -webkit-user-select: none;\\n  user-select: none;\\n}\\n\\nbody {\\n  background-color: red;\\n  height: 100%;\\n  margin: 0;\\n  padding-right: 40px;\\n}\\n\\n.overlays {\\n  position: relative;\\n  width: 100%;\\n  height: 100%;\\n}\\n\\n.overlay {\\n  width: 100%;\\n  height: 100%;\\n  position: absolute;\\n}\\n\\n.overlay.w {\\n  background-image: -ms-linear-gradient(bottom, #fff, rgba(255, 255, 255, 0));\\n  background-image: -moz-linear-gradient(bottom, #fff, rgba(255, 255, 255, 0));\\n  background-image: -webkit-linear-gradient(bottom, #fff, rgba(255, 255, 255, 0));\\n  background-image: linear-gradient(bottom, #fff, rgba(255, 255, 255, 0));\\n}\\n\\n.overlay.b {\\n  background-image: -ms-linear-gradient(left, #000, rgba(0, 0, 0, 0));\\n  background-image: -moz-linear-gradient(left, #000, rgba(0, 0, 0, 0));\\n  background-image: -webkit-linear-gradient(left, #000, rgba(0, 0, 0, 0));\\n  background-image: linear-gradient(left, #000, rgba(0, 0, 0, 0));\\n}\\n\\n.wrap {\\n  width: 100%;\\n  height: 100%;\\n  position: relative;\\n}\\n\\n.sidebar {\\n  padding-top: 40px;\\n  position: absolute;\\n  top: 0;\\n  right: 0;\\n  width: 40px;\\n  height: 100%;\\n}\\n\\n.hue {\\n  background-image: -ms-linear-gradient(hsla(0, 100%, 54%, 1),hsla(10, 100%, 54%, 1),hsla(20, 100%, 54%, 1),hsla(30, 100%, 54%, 1),hsla(40, 100%, 54%, 1),hsla(50, 100%, 54%, 1),hsla(60, 100%, 54%, 1),hsla(70, 100%, 54%, 1),hsla(80, 100%, 54%, 1),hsla(90, 100%, 54%, 1),hsla(100, 100%, 54%, 1),hsla(110, 100%, 54%, 1),hsla(120, 100%, 54%, 1),hsla(130, 100%, 54%, 1),hsla(140, 100%, 54%, 1),hsla(150, 100%, 54%, 1),hsla(160, 100%, 54%, 1),hsla(170, 100%, 54%, 1),hsla(180, 100%, 54%, 1),hsla(190, 100%, 54%, 1),hsla(200, 100%, 54%, 1),hsla(210, 100%, 54%, 1),hsla(220, 100%, 54%, 1),hsla(230, 100%, 54%, 1),hsla(240, 100%, 54%, 1),hsla(250, 100%, 54%, 1),hsla(260, 100%, 54%, 1),hsla(270, 100%, 54%, 1),hsla(280, 100%, 54%, 1),hsla(290, 100%, 54%, 1),hsla(300, 100%, 54%, 1),hsla(310, 100%, 54%, 1),hsla(320, 100%, 54%, 1),hsla(330, 100%, 54%, 1),hsla(340, 100%, 54%, 1),hsla(350, 100%, 54%, 1),hsla(360, 100%, 54%, 1));\\n  background-image: -moz-linear-gradient(hsla(0, 100%, 54%, 1),hsla(10, 100%, 54%, 1),hsla(20, 100%, 54%, 1),hsla(30, 100%, 54%, 1),hsla(40, 100%, 54%, 1),hsla(50, 100%, 54%, 1),hsla(60, 100%, 54%, 1),hsla(70, 100%, 54%, 1),hsla(80, 100%, 54%, 1),hsla(90, 100%, 54%, 1),hsla(100, 100%, 54%, 1),hsla(110, 100%, 54%, 1),hsla(120, 100%, 54%, 1),hsla(130, 100%, 54%, 1),hsla(140, 100%, 54%, 1),hsla(150, 100%, 54%, 1),hsla(160, 100%, 54%, 1),hsla(170, 100%, 54%, 1),hsla(180, 100%, 54%, 1),hsla(190, 100%, 54%, 1),hsla(200, 100%, 54%, 1),hsla(210, 100%, 54%, 1),hsla(220, 100%, 54%, 1),hsla(230, 100%, 54%, 1),hsla(240, 100%, 54%, 1),hsla(250, 100%, 54%, 1),hsla(260, 100%, 54%, 1),hsla(270, 100%, 54%, 1),hsla(280, 100%, 54%, 1),hsla(290, 100%, 54%, 1),hsla(300, 100%, 54%, 1),hsla(310, 100%, 54%, 1),hsla(320, 100%, 54%, 1),hsla(330, 100%, 54%, 1),hsla(340, 100%, 54%, 1),hsla(350, 100%, 54%, 1),hsla(360, 100%, 54%, 1));\\n  background-image: -webkit-linear-gradient(hsla(0, 100%, 54%, 1),hsla(10, 100%, 54%, 1),hsla(20, 100%, 54%, 1),hsla(30, 100%, 54%, 1),hsla(40, 100%, 54%, 1),hsla(50, 100%, 54%, 1),hsla(60, 100%, 54%, 1),hsla(70, 100%, 54%, 1),hsla(80, 100%, 54%, 1),hsla(90, 100%, 54%, 1),hsla(100, 100%, 54%, 1),hsla(110, 100%, 54%, 1),hsla(120, 100%, 54%, 1),hsla(130, 100%, 54%, 1),hsla(140, 100%, 54%, 1),hsla(150, 100%, 54%, 1),hsla(160, 100%, 54%, 1),hsla(170, 100%, 54%, 1),hsla(180, 100%, 54%, 1),hsla(190, 100%, 54%, 1),hsla(200, 100%, 54%, 1),hsla(210, 100%, 54%, 1),hsla(220, 100%, 54%, 1),hsla(230, 100%, 54%, 1),hsla(240, 100%, 54%, 1),hsla(250, 100%, 54%, 1),hsla(260, 100%, 54%, 1),hsla(270, 100%, 54%, 1),hsla(280, 100%, 54%, 1),hsla(290, 100%, 54%, 1),hsla(300, 100%, 54%, 1),hsla(310, 100%, 54%, 1),hsla(320, 100%, 54%, 1),hsla(330, 100%, 54%, 1),hsla(340, 100%, 54%, 1),hsla(350, 100%, 54%, 1),hsla(360, 100%, 54%, 1));\\n  background-image: linear-gradient(hsla(0, 100%, 54%, 1),hsla(10, 100%, 54%, 1),hsla(20, 100%, 54%, 1),hsla(30, 100%, 54%, 1),hsla(40, 100%, 54%, 1),hsla(50, 100%, 54%, 1),hsla(60, 100%, 54%, 1),hsla(70, 100%, 54%, 1),hsla(80, 100%, 54%, 1),hsla(90, 100%, 54%, 1),hsla(100, 100%, 54%, 1),hsla(110, 100%, 54%, 1),hsla(120, 100%, 54%, 1),hsla(130, 100%, 54%, 1),hsla(140, 100%, 54%, 1),hsla(150, 100%, 54%, 1),hsla(160, 100%, 54%, 1),hsla(170, 100%, 54%, 1),hsla(180, 100%, 54%, 1),hsla(190, 100%, 54%, 1),hsla(200, 100%, 54%, 1),hsla(210, 100%, 54%, 1),hsla(220, 100%, 54%, 1),hsla(230, 100%, 54%, 1),hsla(240, 100%, 54%, 1),hsla(250, 100%, 54%, 1),hsla(260, 100%, 54%, 1),hsla(270, 100%, 54%, 1),hsla(280, 100%, 54%, 1),hsla(290, 100%, 54%, 1),hsla(300, 100%, 54%, 1),hsla(310, 100%, 54%, 1),hsla(320, 100%, 54%, 1),hsla(330, 100%, 54%, 1),hsla(340, 100%, 54%, 1),hsla(350, 100%, 54%, 1),hsla(360, 100%, 54%, 1));\\n  position: absolute;\\n  right: 0;\\n  width: 40px;\\n  height: 100%;\\n}\\n\\n.swatch {\\n  width: 40px;\\n  height: 40px;\\n  border: 2px solid white;\\n  position: absolute;\\n  top: 0;\\n  right: 0;\\n}\";",
      "type": "blob"
    },
    "main": {
      "path": "main",
      "content": "(function() {\n  var HSL, Observable, Throttle, Touchy, applyStylesheet, hue, lightness, notifyParent, postmaster, saturation, swatch, update, x, y, _ref,\n    __slice = [].slice;\n\n  Observable = require(\"observable\");\n\n  Touchy = require(\"./lib/touchy\");\n\n  Throttle = require(\"./lib/throttle\");\n\n  HSL = require(\"./lib/hsl\");\n\n  applyStylesheet = require(\"./util\").applyStylesheet;\n\n  applyStylesheet(require(\"./style\"));\n\n  document.body.appendChild(require(\"./template\")());\n\n  postmaster = require(\"postmaster\")();\n\n  postmaster.value = Observable();\n\n  postmaster.value.observe(function(newValue) {\n    var h, l, match, s, values, _ref, _ref1;\n    if (match = newValue.match(HSL.matcher)) {\n      _ref = match, match = _ref[0], values = 2 <= _ref.length ? __slice.call(_ref, 1) : [];\n      _ref1 = values.map(parseFloat), h = _ref1[0], s = _ref1[1], l = _ref1[2];\n      hue(h / 360);\n      saturation(s / 100);\n      lightness(l / 100);\n      location.hash = JSON.stringify(newValue);\n      return notifyParent(newValue);\n    }\n  });\n\n  _ref = Touchy(document.querySelector(\".overlay.w\")), x = _ref.x, y = _ref.y;\n\n  hue = Touchy(document.querySelector(\".hue\")).y;\n\n  x.observe(function(newValue) {\n    var t;\n    t = newValue / 2;\n    saturation(newValue);\n    return lightness((1 - t) * y() + t);\n  });\n\n  y.observe(function(newValue) {\n    var t;\n    t = x() / 2;\n    return lightness((1 - t) * newValue + t);\n  });\n\n  saturation = Observable(1);\n\n  lightness = Observable(0.54);\n\n  swatch = document.querySelector(\".swatch\");\n\n  update = function() {\n    var h, l, s, value;\n    h = Math.floor(hue() * 360);\n    s = Math.floor(saturation() * 100);\n    l = Math.floor(lightness() * 100);\n    document.body.style.backgroundColor = \"hsl(\" + h + \", 100%, 54%)\";\n    value = \"hsl(\" + h + \", \" + s + \"%, \" + l + \"%)\";\n    swatch.style.backgroundColor = value;\n    return postmaster.value(value);\n  };\n\n  notifyParent = Throttle(0.05)(function(value) {\n    return postmaster.sendToParent({\n      value: value\n    });\n  });\n\n  lightness.observe(update);\n\n  saturation.observe(update);\n\n  hue.observe(update);\n\n  if (location.hash) {\n    postmaster.value(JSON.parse(location.hash.substring(1)));\n  } else {\n    hue(0);\n    saturation(1);\n    lightness(0.54);\n  }\n\n}).call(this);\n\n//# sourceURL=main.coffee",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.1.0\",\"dependencies\":{\"observable\":\"distri/observable:v0.1.0\",\"postmaster\":\"distri/postmaster:v0.2.1\"}};",
      "type": "blob"
    },
    "util": {
      "path": "util",
      "content": "(function() {\n  module.exports = {\n    applyStylesheet: function(style, id) {\n      var previousStyleNode, styleNode;\n      if (id == null) {\n        id = \"primary\";\n      }\n      styleNode = document.createElement(\"style\");\n      styleNode.innerHTML = style;\n      styleNode.id = id;\n      if (previousStyleNode = document.head.querySelector(\"style#\" + id)) {\n        previousStyleNode.parentNode.removeChild(prevousStyleNode);\n      }\n      return document.head.appendChild(styleNode);\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=util.coffee",
      "type": "blob"
    },
    "template": {
      "path": "template",
      "content": "Runtime = require(\"/_lib/hamljr_runtime\");\n\nmodule.exports = (function(data) {\n  return (function() {\n    var __runtime;\n    __runtime = Runtime(this);\n    __runtime.push(document.createDocumentFragment());\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.classes(\"swatch\");\n    __runtime.pop();\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.classes(\"sidebar\");\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.classes(\"wrap\");\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.classes(\"hue\");\n    __runtime.pop();\n    __runtime.pop();\n    __runtime.pop();\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.classes(\"overlays\");\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.classes(\"overlay\", \"b\");\n    __runtime.pop();\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.classes(\"overlay\", \"w\");\n    __runtime.pop();\n    __runtime.pop();\n    return __runtime.pop();\n  }).call(data);\n});\n",
      "type": "blob"
    },
    "lib/touchy": {
      "path": "lib/touchy",
      "content": "(function() {\n  var MAX, Observable, clamp, listen, localPosition, processTouches;\n\n  Observable = require(\"observable\");\n\n  MAX = 1;\n\n  module.exports = function(element, _arg) {\n    var active, emit, x, y, _ref;\n    _ref = _arg != null ? _arg : {}, x = _ref.x, y = _ref.y;\n    x = Observable(x);\n    y = Observable(y);\n    active = false;\n    emit = function(e) {\n      var position;\n      position = localPosition(element, e);\n      x(position.x);\n      return y(position.y);\n    };\n    listen(element, \"mousedown\", function(e) {\n      active = true;\n      return emit(e);\n    });\n    listen(element, \"touchstart\", function(e) {\n      return processTouches(event, emit);\n    });\n    listen(element, \"mousemove\", function(e) {\n      if (active) {\n        return emit(e);\n      }\n    });\n    listen(document, \"mousemove\", function(e) {\n      if (active) {\n        return emit(e);\n      }\n    });\n    listen(element, \"touchmove\", function(e) {\n      return processTouches(event, emit);\n    });\n    listen(element, \"mouseup\", function(e) {\n      emit(e);\n      active = false;\n    });\n    listen(element, \"touchend\", function(e) {\n      return processTouches(event, emit);\n    });\n    listen(document, \"mouseup\", function(e) {\n      if (active) {\n        emit(e);\n      }\n      active = false;\n    });\n    return {\n      x: x,\n      y: y\n    };\n  };\n\n  localPosition = function(element, event) {\n    var point, rect;\n    rect = element.getBoundingClientRect();\n    point = {\n      x: clamp((event.pageX - rect.left) / rect.width, 0, MAX),\n      y: clamp((event.pageY - rect.top) / rect.height, 0, MAX)\n    };\n    point.identifier = (event.identifier + 1) || 0;\n    return point;\n  };\n\n  processTouches = function(event, fn) {\n    var touches;\n    event.preventDefault();\n    if (event.type === \"touchend\") {\n      touches = event.changedTouches;\n    } else {\n      touches = event.touches;\n    }\n    return Array.prototype.forEach.call(touches, fn);\n  };\n\n  listen = function(element, event, handler) {\n    return element.addEventListener(event, handler, false);\n  };\n\n  clamp = function(number, min, max) {\n    return Math.min(Math.max(number, min), max);\n  };\n\n}).call(this);\n\n//# sourceURL=lib/touchy.coffee",
      "type": "blob"
    },
    "lib/throttle": {
      "path": "lib/throttle",
      "content": "(function() {\n  module.exports = function(cycle) {\n    var lastFired, lastValue, t, timeout;\n    lastFired = -Infinity;\n    lastValue = void 0;\n    timeout = null;\n    t = cycle * 1000;\n    return function(output) {\n      return function(input) {\n        var currentTime, delta, target;\n        lastValue = input;\n        if (!timeout) {\n          currentTime = +(new Date);\n          delta = currentTime - lastFired;\n          target = t - delta;\n          return timeout = setTimeout(function() {\n            lastFired = +(new Date);\n            output(lastValue);\n            return timeout = null;\n          }, target);\n        }\n      };\n    };\n  };\n\n}).call(this);\n\n//# sourceURL=lib/throttle.coffee",
      "type": "blob"
    },
    "lib/hsl": {
      "path": "lib/hsl",
      "content": "(function() {\n  module.exports = {\n    matcher: /hsl\\(([\\d.]+),\\s*([\\d.]+)%,\\s*([\\d.]+)%\\)/\n  };\n\n}).call(this);\n\n//# sourceURL=lib/hsl.coffee",
      "type": "blob"
    },
    "_lib/hamljr_runtime": {
      "path": "_lib/hamljr_runtime",
      "content": "(function() {\n  var Runtime, dataName, document,\n    __slice = [].slice;\n\n  dataName = \"__hamlJR_data\";\n\n  if (typeof window !== \"undefined\" && window !== null) {\n    document = window.document;\n  } else {\n    document = global.document;\n  }\n\n  Runtime = function(context) {\n    var append, bindObservable, classes, id, lastParent, observeAttribute, observeText, pop, push, render, stack, top;\n    stack = [];\n    lastParent = function() {\n      var element, i;\n      i = stack.length - 1;\n      while ((element = stack[i]) && element.nodeType === 11) {\n        i -= 1;\n      }\n      return element;\n    };\n    top = function() {\n      return stack[stack.length - 1];\n    };\n    append = function(child) {\n      var _ref;\n      if ((_ref = top()) != null) {\n        _ref.appendChild(child);\n      }\n      return child;\n    };\n    push = function(child) {\n      return stack.push(child);\n    };\n    pop = function() {\n      return append(stack.pop());\n    };\n    render = function(child) {\n      push(child);\n      return pop();\n    };\n    bindObservable = function(element, value, update) {\n      var observable, unobserve;\n      if (typeof Observable === \"undefined\" || Observable === null) {\n        update(value);\n        return;\n      }\n      observable = Observable(value);\n      observable.observe(update);\n      update(observable());\n      unobserve = function() {\n        return observable.stopObserving(update);\n      };\n      element.addEventListener(\"DOMNodeRemoved\", unobserve, true);\n      return element;\n    };\n    id = function() {\n      var element, sources, update, value;\n      sources = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n      element = top();\n      update = function(newValue) {\n        if (typeof newValue === \"function\") {\n          newValue = newValue();\n        }\n        return element.id = newValue;\n      };\n      value = function() {\n        var possibleValues;\n        possibleValues = sources.map(function(source) {\n          if (typeof source === \"function\") {\n            return source();\n          } else {\n            return source;\n          }\n        }).filter(function(idValue) {\n          return idValue != null;\n        });\n        return possibleValues[possibleValues.length - 1];\n      };\n      return bindObservable(element, value, update);\n    };\n    classes = function() {\n      var element, sources, update, value;\n      sources = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n      element = top();\n      update = function(newValue) {\n        if (typeof newValue === \"function\") {\n          newValue = newValue();\n        }\n        return element.className = newValue;\n      };\n      value = function() {\n        var possibleValues;\n        possibleValues = sources.map(function(source) {\n          if (typeof source === \"function\") {\n            return source();\n          } else {\n            return source;\n          }\n        }).filter(function(sourceValue) {\n          return sourceValue != null;\n        });\n        return possibleValues.join(\" \");\n      };\n      return bindObservable(element, value, update);\n    };\n    observeAttribute = function(name, value) {\n      var element, update;\n      element = top();\n      update = function(newValue) {\n        return element.setAttribute(name, newValue);\n      };\n      return bindObservable(element, value, update);\n    };\n    observeText = function(value) {\n      var element, update;\n      switch (value != null ? value.nodeType : void 0) {\n        case 1:\n        case 3:\n        case 11:\n          render(value);\n          return;\n      }\n      element = document.createTextNode('');\n      update = function(newValue) {\n        return element.nodeValue = newValue;\n      };\n      bindObservable(element, value, update);\n      return render(element);\n    };\n    return {\n      push: push,\n      pop: pop,\n      id: id,\n      classes: classes,\n      attribute: observeAttribute,\n      text: observeText,\n      filter: function(name, content) {},\n      each: function(items, fn) {\n        var elements, parent, replace;\n        items = Observable(items);\n        elements = [];\n        parent = lastParent();\n        items.observe(function(newItems) {\n          return replace(elements, newItems);\n        });\n        replace = function(oldElements, items) {\n          var firstElement;\n          if (oldElements) {\n            firstElement = oldElements[0];\n            parent = (firstElement != null ? firstElement.parentElement : void 0) || parent;\n            elements = items.map(function(item, index, array) {\n              var element;\n              element = fn.call(item, item, index, array);\n              element[dataName] = item;\n              parent.insertBefore(element, firstElement);\n              return element;\n            });\n            return oldElements.each(function(element) {\n              return element.remove();\n            });\n          } else {\n            return elements = items.map(function(item, index, array) {\n              var element;\n              element = fn.call(item, item, index, array);\n              element[dataName] = item;\n              return element;\n            });\n          }\n        };\n        return replace(null, items);\n      },\n      \"with\": function(item, fn) {\n        var element, replace, value;\n        element = null;\n        item = Observable(item);\n        item.observe(function(newValue) {\n          return replace(element, newValue);\n        });\n        value = item();\n        replace = function(oldElement, value) {\n          var parent;\n          element = fn.call(value);\n          element[dataName] = item;\n          if (oldElement) {\n            parent = oldElement.parentElement;\n            parent.insertBefore(element, oldElement);\n            return oldElement.remove();\n          } else {\n\n          }\n        };\n        return replace(element, value);\n      },\n      on: function(eventName, fn) {\n        var element;\n        element = lastParent();\n        if (eventName === \"change\") {\n          switch (element.nodeName) {\n            case \"SELECT\":\n              element[\"on\" + eventName] = function() {\n                var selectedOption;\n                selectedOption = this.options[this.selectedIndex];\n                return fn(selectedOption[dataName]);\n              };\n              if (fn.observe) {\n                return fn.observe(function(newValue) {\n                  return Array.prototype.forEach.call(element.options, function(option, index) {\n                    if (option[dataName] === newValue) {\n                      return element.selectedIndex = index;\n                    }\n                  });\n                });\n              }\n              break;\n            default:\n              element[\"on\" + eventName] = function() {\n                return fn(element.value);\n              };\n              if (fn.observe) {\n                return fn.observe(function(newValue) {\n                  return element.value = newValue;\n                });\n              }\n          }\n        } else {\n          return element[\"on\" + eventName] = function(event) {\n            return fn.call(context, event);\n          };\n        }\n      }\n    };\n  };\n\n  module.exports = Runtime;\n\n}).call(this);\n\n//# sourceURL=runtime.coffee",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  },
  "version": "0.1.0",
  "entryPoint": "main",
  "repository": {
    "id": 17806153,
    "name": "color-picker",
    "full_name": "distri/color-picker",
    "owner": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://gravatar.com/avatar/192f3f168409e79c42107f081139d9f3?d=https%3A%2F%2Fidenticons.github.com%2Ff90c81ffc1498e260c820082f2e7ca5f.png&r=x",
      "gravatar_id": "192f3f168409e79c42107f081139d9f3",
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/distri/color-picker",
    "description": "Picking my colors like yeah",
    "fork": false,
    "url": "https://api.github.com/repos/distri/color-picker",
    "forks_url": "https://api.github.com/repos/distri/color-picker/forks",
    "keys_url": "https://api.github.com/repos/distri/color-picker/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/distri/color-picker/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/distri/color-picker/teams",
    "hooks_url": "https://api.github.com/repos/distri/color-picker/hooks",
    "issue_events_url": "https://api.github.com/repos/distri/color-picker/issues/events{/number}",
    "events_url": "https://api.github.com/repos/distri/color-picker/events",
    "assignees_url": "https://api.github.com/repos/distri/color-picker/assignees{/user}",
    "branches_url": "https://api.github.com/repos/distri/color-picker/branches{/branch}",
    "tags_url": "https://api.github.com/repos/distri/color-picker/tags",
    "blobs_url": "https://api.github.com/repos/distri/color-picker/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/distri/color-picker/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/distri/color-picker/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/distri/color-picker/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/distri/color-picker/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/distri/color-picker/languages",
    "stargazers_url": "https://api.github.com/repos/distri/color-picker/stargazers",
    "contributors_url": "https://api.github.com/repos/distri/color-picker/contributors",
    "subscribers_url": "https://api.github.com/repos/distri/color-picker/subscribers",
    "subscription_url": "https://api.github.com/repos/distri/color-picker/subscription",
    "commits_url": "https://api.github.com/repos/distri/color-picker/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/distri/color-picker/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/distri/color-picker/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/distri/color-picker/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/distri/color-picker/contents/{+path}",
    "compare_url": "https://api.github.com/repos/distri/color-picker/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/distri/color-picker/merges",
    "archive_url": "https://api.github.com/repos/distri/color-picker/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/distri/color-picker/downloads",
    "issues_url": "https://api.github.com/repos/distri/color-picker/issues{/number}",
    "pulls_url": "https://api.github.com/repos/distri/color-picker/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/distri/color-picker/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/distri/color-picker/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/distri/color-picker/labels{/name}",
    "releases_url": "https://api.github.com/repos/distri/color-picker/releases{/id}",
    "created_at": "2014-03-16T18:39:28Z",
    "updated_at": "2014-03-16T18:39:28Z",
    "pushed_at": "2014-03-16T18:39:28Z",
    "git_url": "git://github.com/distri/color-picker.git",
    "ssh_url": "git@github.com:distri/color-picker.git",
    "clone_url": "https://github.com/distri/color-picker.git",
    "svn_url": "https://github.com/distri/color-picker",
    "homepage": null,
    "size": 0,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": null,
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master",
    "master_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "organization": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://gravatar.com/avatar/192f3f168409e79c42107f081139d9f3?d=https%3A%2F%2Fidenticons.github.com%2Ff90c81ffc1498e260c820082f2e7ca5f.png&r=x",
      "gravatar_id": "192f3f168409e79c42107f081139d9f3",
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "network_count": 0,
    "subscribers_count": 2,
    "branch": "master",
    "publishBranch": "gh-pages"
  },
  "dependencies": {
    "observable": {
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2014 distri\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "observable\n==========\n",
          "type": "blob"
        },
        "main.coffee.md": {
          "path": "main.coffee.md",
          "mode": "100644",
          "content": "Observable\n==========\n\n`Observable` allows for observing arrays, functions, and objects.\n\nFunction dependencies are automagically observed.\n\nStandard array methods are proxied through to the underlying array.\n\n    Observable = (value) ->\n\nReturn the object if it is already an observable object.\n\n      return value if typeof value?.observe is \"function\"\n\nMaintain a set of listeners to observe changes and provide a helper to notify each observer.\n\n      listeners = []\n\n      notify = (newValue) ->\n        listeners.forEach (listener) ->\n          listener(newValue)\n\nOur observable function is stored as a reference to `self`.\n\nIf `value` is a function compute dependencies and listen to observables that it depends on.\n\n      if typeof value is 'function'\n        fn = value\n        self = ->\n          # Automagic dependency observation\n          if base\n            self.observe base\n\n          return value\n\n        self.observe = (listener) ->\n          listeners.push listener\n\n        changed = ->\n          value = fn()\n          notify(value)\n\n        value = computeDependencies(fn, changed)\n\n      else\n\nWhen called with zero arguments it is treated as a getter. When called with one argument it is treated as a setter.\n\nChanges to the value will trigger notifications.\n\nThe value is always returned.\n\n        self = (newValue) ->\n          if arguments.length > 0\n            if value != newValue\n              value = newValue\n\n              notify(newValue)\n          else\n            # Automagic dependency observation\n            if base\n              self.observe base\n\n          return value\n\nAdd a listener for when this object changes.\n\n        self.observe = (listener) ->\n          listeners.push listener\n\nThis `each` iterator is similar to [the Maybe monad](http://en.wikipedia.org/wiki/Monad_&#40;functional_programming&#41;#The_Maybe_monad) in that our observable may contain a single value or nothing at all.\n\n      self.each = (args...) ->\n        if value?\n          [value].forEach(args...)\n\nIf the value is an array then proxy array methods and add notifications to mutation events.\n\n      if Array.isArray(value)\n        [\n          \"concat\"\n          \"every\"\n          \"filter\"\n          \"forEach\"\n          \"indexOf\"\n          \"join\"\n          \"lastIndexOf\"\n          \"map\"\n          \"reduce\"\n          \"reduceRight\"\n          \"slice\"\n          \"some\"\n        ].forEach (method) ->\n          self[method] = (args...) ->\n            value[method](args...)\n\n        [\n          \"pop\"\n          \"push\"\n          \"reverse\"\n          \"shift\"\n          \"splice\"\n          \"sort\"\n          \"unshift\"\n        ].forEach (method) ->\n          self[method] = (args...) ->\n            notifyReturning value[method](args...)\n\n        notifyReturning = (returnValue) ->\n          notify(value)\n\n          return returnValue\n\nAdd some extra helpful methods to array observables.\n\n        extend self,\n          each: (args...) ->\n            self.forEach(args...)\n\n            return self\n\nRemove an element from the array and notify observers of changes.\n\n          remove: (object) ->\n            index = value.indexOf(object)\n\n            if index >= 0\n              notifyReturning value.splice(index, 1)[0]\n\n          get: (index) ->\n            value[index]\n\n          first: ->\n            value[0]\n\n          last: ->\n            value[value.length-1]\n\n      self.stopObserving = (fn) ->\n        remove listeners, fn\n\n      return self\n\nExport `Observable`\n\n    module.exports = Observable\n\nAppendix\n--------\n\nThe extend method adds one objects properties to another.\n\n    extend = (target, sources...) ->\n      for source in sources\n        for name of source\n          target[name] = source[name]\n\n      return target\n\n    base = undefined\n\nAutomagically compute dependencies.\n\n    computeDependencies = (fn, root) ->\n      base = root\n      value = fn()\n      base = undefined\n\n      return value\n\nRemove a value from an array.\n\n    remove = (array, value) ->\n      index = array.indexOf(value)\n\n      if index >= 0\n        array.splice(index, 1)[0]\n",
          "type": "blob"
        },
        "test/observable.coffee": {
          "path": "test/observable.coffee",
          "mode": "100644",
          "content": "Observable = require \"../main\"\n\ndescribe 'Observable', ->\n  it 'should create an observable for an object', ->\n    n = 5\n\n    observable = Observable(n)\n\n    assert.equal(observable(), n)\n\n  it 'should fire events when setting', ->\n    string = \"yolo\"\n\n    observable = Observable(string)\n    observable.observe (newValue) ->\n      assert.equal newValue, \"4life\"\n\n    observable(\"4life\")\n\n  it 'should be idempotent', ->\n    o = Observable(5)\n\n    assert.equal o, Observable(o)\n\n  describe \"#each\", ->\n    it \"should be invoked once if there is an observable\", ->\n      o = Observable(5)\n      called = 0\n\n      o.each (value) ->\n        called += 1\n        assert.equal value, 5\n\n      assert.equal called, 1\n\n    it \"should not be invoked if observable is null\", ->\n      o = Observable(null)\n      called = 0\n\n      o.each (value) ->\n        called += 1\n\n      assert.equal called, 0\n\n  it \"should allow for stopping observation\", ->\n    observable = Observable(\"string\")\n\n    called = 0\n    fn = (newValue) ->\n      called += 1\n      assert.equal newValue, \"4life\"\n\n    observable.observe fn\n\n    observable(\"4life\")\n\n    observable.stopObserving fn\n\n    observable(\"wat\")\n\n    assert.equal called, 1\n\ndescribe \"Observable Array\", ->\n  it \"should proxy array methods\", ->\n    o = Observable [5]\n\n    o.map (n) ->\n      assert.equal n, 5\n\n  it \"should notify on mutation methods\", (done) ->\n    o = Observable []\n\n    o.observe (newValue) ->\n      assert.equal newValue[0], 1\n\n    o.push 1\n\n    done()\n\n  it \"should have an each method\", ->\n    o = Observable []\n\n    assert o.each\n\n  it \"#get\", ->\n    o = Observable [0, 1, 2, 3]\n\n    assert.equal o.get(2), 2\n\n  it \"#first\", ->\n    o = Observable [0, 1, 2, 3]\n\n    assert.equal o.first(), 0\n\n  it \"#last\", ->\n    o = Observable [0, 1, 2, 3]\n\n    assert.equal o.last(), 3\n\n  it \"#remove\", (done) ->\n    o = Observable [0, 1, 2, 3]\n\n    o.observe (newValue) ->\n      assert.equal newValue.length, 3\n      setTimeout ->\n        done()\n      , 0\n\n    assert.equal o.remove(2), 2\n\n  # TODO: This looks like it might be impossible\n  it \"should proxy the length property\"\n\ndescribe \"Observable functions\", ->\n  it \"should compute dependencies\", (done) ->\n    firstName = Observable \"Duder\"\n    lastName = Observable \"Man\"\n\n    o = Observable ->\n      \"#{firstName()} #{lastName()}\"\n\n    o.observe (newValue) ->\n      assert.equal newValue, \"Duder Bro\"\n\n      done()\n\n    lastName \"Bro\"\n\n  it \"should allow double nesting\", (done) ->\n    bottom = Observable \"rad\"\n    middle = Observable ->\n      bottom()\n    top = Observable ->\n      middle()\n\n    top.observe (newValue) ->\n      assert.equal newValue, \"wat\"\n      assert.equal top(), newValue\n      assert.equal middle(), newValue\n\n      done()\n\n    bottom(\"wat\")\n\n  it \"should have an each method\", ->\n    o = Observable ->\n\n    assert o.each\n\n  it \"should not invoke when returning undefined\", ->\n    o = Observable ->\n\n    o.each ->\n      assert false\n\n  it \"should invoke when returning any defined value\", (done) ->\n    o = Observable -> 5\n\n    o.each (n) ->\n      assert.equal n, 5\n      done()\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"0.1.0\"\n",
          "type": "blob"
        }
      },
      "distribution": {
        "main": {
          "path": "main",
          "content": "(function() {\n  var Observable, base, computeDependencies, extend, remove,\n    __slice = [].slice;\n\n  Observable = function(value) {\n    var changed, fn, listeners, notify, notifyReturning, self;\n    if (typeof (value != null ? value.observe : void 0) === \"function\") {\n      return value;\n    }\n    listeners = [];\n    notify = function(newValue) {\n      return listeners.forEach(function(listener) {\n        return listener(newValue);\n      });\n    };\n    if (typeof value === 'function') {\n      fn = value;\n      self = function() {\n        if (base) {\n          self.observe(base);\n        }\n        return value;\n      };\n      self.observe = function(listener) {\n        return listeners.push(listener);\n      };\n      changed = function() {\n        value = fn();\n        return notify(value);\n      };\n      value = computeDependencies(fn, changed);\n    } else {\n      self = function(newValue) {\n        if (arguments.length > 0) {\n          if (value !== newValue) {\n            value = newValue;\n            notify(newValue);\n          }\n        } else {\n          if (base) {\n            self.observe(base);\n          }\n        }\n        return value;\n      };\n      self.observe = function(listener) {\n        return listeners.push(listener);\n      };\n    }\n    self.each = function() {\n      var args, _ref;\n      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n      if (value != null) {\n        return (_ref = [value]).forEach.apply(_ref, args);\n      }\n    };\n    if (Array.isArray(value)) {\n      [\"concat\", \"every\", \"filter\", \"forEach\", \"indexOf\", \"join\", \"lastIndexOf\", \"map\", \"reduce\", \"reduceRight\", \"slice\", \"some\"].forEach(function(method) {\n        return self[method] = function() {\n          var args;\n          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n          return value[method].apply(value, args);\n        };\n      });\n      [\"pop\", \"push\", \"reverse\", \"shift\", \"splice\", \"sort\", \"unshift\"].forEach(function(method) {\n        return self[method] = function() {\n          var args;\n          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n          return notifyReturning(value[method].apply(value, args));\n        };\n      });\n      notifyReturning = function(returnValue) {\n        notify(value);\n        return returnValue;\n      };\n      extend(self, {\n        each: function() {\n          var args;\n          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n          self.forEach.apply(self, args);\n          return self;\n        },\n        remove: function(object) {\n          var index;\n          index = value.indexOf(object);\n          if (index >= 0) {\n            return notifyReturning(value.splice(index, 1)[0]);\n          }\n        },\n        get: function(index) {\n          return value[index];\n        },\n        first: function() {\n          return value[0];\n        },\n        last: function() {\n          return value[value.length - 1];\n        }\n      });\n    }\n    self.stopObserving = function(fn) {\n      return remove(listeners, fn);\n    };\n    return self;\n  };\n\n  module.exports = Observable;\n\n  extend = function() {\n    var name, source, sources, target, _i, _len;\n    target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n    for (_i = 0, _len = sources.length; _i < _len; _i++) {\n      source = sources[_i];\n      for (name in source) {\n        target[name] = source[name];\n      }\n    }\n    return target;\n  };\n\n  base = void 0;\n\n  computeDependencies = function(fn, root) {\n    var value;\n    base = root;\n    value = fn();\n    base = void 0;\n    return value;\n  };\n\n  remove = function(array, value) {\n    var index;\n    index = array.indexOf(value);\n    if (index >= 0) {\n      return array.splice(index, 1)[0];\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=main.coffee",
          "type": "blob"
        },
        "test/observable": {
          "path": "test/observable",
          "content": "(function() {\n  var Observable;\n\n  Observable = require(\"../main\");\n\n  describe('Observable', function() {\n    it('should create an observable for an object', function() {\n      var n, observable;\n      n = 5;\n      observable = Observable(n);\n      return assert.equal(observable(), n);\n    });\n    it('should fire events when setting', function() {\n      var observable, string;\n      string = \"yolo\";\n      observable = Observable(string);\n      observable.observe(function(newValue) {\n        return assert.equal(newValue, \"4life\");\n      });\n      return observable(\"4life\");\n    });\n    it('should be idempotent', function() {\n      var o;\n      o = Observable(5);\n      return assert.equal(o, Observable(o));\n    });\n    describe(\"#each\", function() {\n      it(\"should be invoked once if there is an observable\", function() {\n        var called, o;\n        o = Observable(5);\n        called = 0;\n        o.each(function(value) {\n          called += 1;\n          return assert.equal(value, 5);\n        });\n        return assert.equal(called, 1);\n      });\n      return it(\"should not be invoked if observable is null\", function() {\n        var called, o;\n        o = Observable(null);\n        called = 0;\n        o.each(function(value) {\n          return called += 1;\n        });\n        return assert.equal(called, 0);\n      });\n    });\n    return it(\"should allow for stopping observation\", function() {\n      var called, fn, observable;\n      observable = Observable(\"string\");\n      called = 0;\n      fn = function(newValue) {\n        called += 1;\n        return assert.equal(newValue, \"4life\");\n      };\n      observable.observe(fn);\n      observable(\"4life\");\n      observable.stopObserving(fn);\n      observable(\"wat\");\n      return assert.equal(called, 1);\n    });\n  });\n\n  describe(\"Observable Array\", function() {\n    it(\"should proxy array methods\", function() {\n      var o;\n      o = Observable([5]);\n      return o.map(function(n) {\n        return assert.equal(n, 5);\n      });\n    });\n    it(\"should notify on mutation methods\", function(done) {\n      var o;\n      o = Observable([]);\n      o.observe(function(newValue) {\n        return assert.equal(newValue[0], 1);\n      });\n      o.push(1);\n      return done();\n    });\n    it(\"should have an each method\", function() {\n      var o;\n      o = Observable([]);\n      return assert(o.each);\n    });\n    it(\"#get\", function() {\n      var o;\n      o = Observable([0, 1, 2, 3]);\n      return assert.equal(o.get(2), 2);\n    });\n    it(\"#first\", function() {\n      var o;\n      o = Observable([0, 1, 2, 3]);\n      return assert.equal(o.first(), 0);\n    });\n    it(\"#last\", function() {\n      var o;\n      o = Observable([0, 1, 2, 3]);\n      return assert.equal(o.last(), 3);\n    });\n    it(\"#remove\", function(done) {\n      var o;\n      o = Observable([0, 1, 2, 3]);\n      o.observe(function(newValue) {\n        assert.equal(newValue.length, 3);\n        return setTimeout(function() {\n          return done();\n        }, 0);\n      });\n      return assert.equal(o.remove(2), 2);\n    });\n    return it(\"should proxy the length property\");\n  });\n\n  describe(\"Observable functions\", function() {\n    it(\"should compute dependencies\", function(done) {\n      var firstName, lastName, o;\n      firstName = Observable(\"Duder\");\n      lastName = Observable(\"Man\");\n      o = Observable(function() {\n        return \"\" + (firstName()) + \" \" + (lastName());\n      });\n      o.observe(function(newValue) {\n        assert.equal(newValue, \"Duder Bro\");\n        return done();\n      });\n      return lastName(\"Bro\");\n    });\n    it(\"should allow double nesting\", function(done) {\n      var bottom, middle, top;\n      bottom = Observable(\"rad\");\n      middle = Observable(function() {\n        return bottom();\n      });\n      top = Observable(function() {\n        return middle();\n      });\n      top.observe(function(newValue) {\n        assert.equal(newValue, \"wat\");\n        assert.equal(top(), newValue);\n        assert.equal(middle(), newValue);\n        return done();\n      });\n      return bottom(\"wat\");\n    });\n    it(\"should have an each method\", function() {\n      var o;\n      o = Observable(function() {});\n      return assert(o.each);\n    });\n    it(\"should not invoke when returning undefined\", function() {\n      var o;\n      o = Observable(function() {});\n      return o.each(function() {\n        return assert(false);\n      });\n    });\n    return it(\"should invoke when returning any defined value\", function(done) {\n      var o;\n      o = Observable(function() {\n        return 5;\n      });\n      return o.each(function(n) {\n        assert.equal(n, 5);\n        return done();\n      });\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/observable.coffee",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.1.0\"};",
          "type": "blob"
        }
      },
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "version": "0.1.0",
      "entryPoint": "main",
      "repository": {
        "id": 17119562,
        "name": "observable",
        "full_name": "distri/observable",
        "owner": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/distri/observable",
        "description": "",
        "fork": false,
        "url": "https://api.github.com/repos/distri/observable",
        "forks_url": "https://api.github.com/repos/distri/observable/forks",
        "keys_url": "https://api.github.com/repos/distri/observable/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/distri/observable/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/distri/observable/teams",
        "hooks_url": "https://api.github.com/repos/distri/observable/hooks",
        "issue_events_url": "https://api.github.com/repos/distri/observable/issues/events{/number}",
        "events_url": "https://api.github.com/repos/distri/observable/events",
        "assignees_url": "https://api.github.com/repos/distri/observable/assignees{/user}",
        "branches_url": "https://api.github.com/repos/distri/observable/branches{/branch}",
        "tags_url": "https://api.github.com/repos/distri/observable/tags",
        "blobs_url": "https://api.github.com/repos/distri/observable/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/distri/observable/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/distri/observable/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/distri/observable/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/distri/observable/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/distri/observable/languages",
        "stargazers_url": "https://api.github.com/repos/distri/observable/stargazers",
        "contributors_url": "https://api.github.com/repos/distri/observable/contributors",
        "subscribers_url": "https://api.github.com/repos/distri/observable/subscribers",
        "subscription_url": "https://api.github.com/repos/distri/observable/subscription",
        "commits_url": "https://api.github.com/repos/distri/observable/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/distri/observable/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/distri/observable/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/distri/observable/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/distri/observable/contents/{+path}",
        "compare_url": "https://api.github.com/repos/distri/observable/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/distri/observable/merges",
        "archive_url": "https://api.github.com/repos/distri/observable/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/distri/observable/downloads",
        "issues_url": "https://api.github.com/repos/distri/observable/issues{/number}",
        "pulls_url": "https://api.github.com/repos/distri/observable/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/distri/observable/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/distri/observable/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/distri/observable/labels{/name}",
        "releases_url": "https://api.github.com/repos/distri/observable/releases{/id}",
        "created_at": "2014-02-23T23:17:52Z",
        "updated_at": "2014-02-23T23:17:52Z",
        "pushed_at": "2014-02-23T23:17:52Z",
        "git_url": "git://github.com/distri/observable.git",
        "ssh_url": "git@github.com:distri/observable.git",
        "clone_url": "https://github.com/distri/observable.git",
        "svn_url": "https://github.com/distri/observable",
        "homepage": null,
        "size": 0,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": null,
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master",
        "master_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "organization": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "network_count": 0,
        "subscribers_count": 2,
        "branch": "v0.1.0",
        "defaultBranch": "master"
      },
      "dependencies": {}
    },
    "postmaster": {
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2013 distri\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "postmaster\n==========\n\nSend and receive postMessage commands.\n",
          "type": "blob"
        },
        "main.coffee.md": {
          "path": "main.coffee.md",
          "mode": "100644",
          "content": "Postmaster\n==========\n\nPostmaster allows a child window that was opened from a parent window to\nreceive method calls from the parent window through the postMessage events.\n\nBind postMessage events to methods.\n\n    module.exports = (I={}, self={}) ->\n      # Only listening to messages from `opener`\n      addEventListener \"message\", (event) ->\n        if event.source is opener or event.source is parent\n          {method, params, id} = event.data\n\n          try\n            result = self[method](params...)\n\n            send\n              success:\n                id: id\n                result: result\n          catch error\n            send\n              error:\n                id: id\n                message: error.message\n                stack: error.stack\n\n      addEventListener \"unload\", ->\n        send\n          status: \"unload\"\n\n      # Tell our opener that we're ready\n      send\n        status: \"ready\"\n\n      self.sendToParent = send\n\n      return self\n\n    send = (data) ->\n      (opener or parent)?.postMessage data, \"*\"\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"0.2.1\"\n",
          "type": "blob"
        },
        "test/postmaster.coffee": {
          "path": "test/postmaster.coffee",
          "mode": "100644",
          "content": "Postmaster = require \"../main\"\n\ndescribe \"Postmaster\", ->\n  it \"should allow sending messages to parent\", ->\n    postmaster = Postmaster()\n\n    assert postmaster.sendToParent\n",
          "type": "blob"
        }
      },
      "distribution": {
        "main": {
          "path": "main",
          "content": "(function() {\n  var send;\n\n  module.exports = function(I, self) {\n    if (I == null) {\n      I = {};\n    }\n    if (self == null) {\n      self = {};\n    }\n    addEventListener(\"message\", function(event) {\n      var error, id, method, params, result, _ref;\n      if (event.source === opener || event.source === parent) {\n        _ref = event.data, method = _ref.method, params = _ref.params, id = _ref.id;\n        try {\n          result = self[method].apply(self, params);\n          return send({\n            success: {\n              id: id,\n              result: result\n            }\n          });\n        } catch (_error) {\n          error = _error;\n          return send({\n            error: {\n              id: id,\n              message: error.message,\n              stack: error.stack\n            }\n          });\n        }\n      }\n    });\n    addEventListener(\"unload\", function() {\n      return send({\n        status: \"unload\"\n      });\n    });\n    send({\n      status: \"ready\"\n    });\n    self.sendToParent = send;\n    return self;\n  };\n\n  send = function(data) {\n    var _ref;\n    return (_ref = opener || parent) != null ? _ref.postMessage(data, \"*\") : void 0;\n  };\n\n}).call(this);\n\n//# sourceURL=main.coffee",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.2.1\"};",
          "type": "blob"
        },
        "test/postmaster": {
          "path": "test/postmaster",
          "content": "(function() {\n  var Postmaster;\n\n  Postmaster = require(\"../main\");\n\n  describe(\"Postmaster\", function() {\n    return it(\"should allow sending messages to parent\", function() {\n      var postmaster;\n      postmaster = Postmaster();\n      return assert(postmaster.sendToParent);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/postmaster.coffee",
          "type": "blob"
        }
      },
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "version": "0.2.1",
      "entryPoint": "main",
      "repository": {
        "id": 15326478,
        "name": "postmaster",
        "full_name": "distri/postmaster",
        "owner": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/distri/postmaster",
        "description": "Send and receive postMessage commands.",
        "fork": false,
        "url": "https://api.github.com/repos/distri/postmaster",
        "forks_url": "https://api.github.com/repos/distri/postmaster/forks",
        "keys_url": "https://api.github.com/repos/distri/postmaster/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/distri/postmaster/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/distri/postmaster/teams",
        "hooks_url": "https://api.github.com/repos/distri/postmaster/hooks",
        "issue_events_url": "https://api.github.com/repos/distri/postmaster/issues/events{/number}",
        "events_url": "https://api.github.com/repos/distri/postmaster/events",
        "assignees_url": "https://api.github.com/repos/distri/postmaster/assignees{/user}",
        "branches_url": "https://api.github.com/repos/distri/postmaster/branches{/branch}",
        "tags_url": "https://api.github.com/repos/distri/postmaster/tags",
        "blobs_url": "https://api.github.com/repos/distri/postmaster/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/distri/postmaster/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/distri/postmaster/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/distri/postmaster/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/distri/postmaster/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/distri/postmaster/languages",
        "stargazers_url": "https://api.github.com/repos/distri/postmaster/stargazers",
        "contributors_url": "https://api.github.com/repos/distri/postmaster/contributors",
        "subscribers_url": "https://api.github.com/repos/distri/postmaster/subscribers",
        "subscription_url": "https://api.github.com/repos/distri/postmaster/subscription",
        "commits_url": "https://api.github.com/repos/distri/postmaster/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/distri/postmaster/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/distri/postmaster/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/distri/postmaster/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/distri/postmaster/contents/{+path}",
        "compare_url": "https://api.github.com/repos/distri/postmaster/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/distri/postmaster/merges",
        "archive_url": "https://api.github.com/repos/distri/postmaster/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/distri/postmaster/downloads",
        "issues_url": "https://api.github.com/repos/distri/postmaster/issues{/number}",
        "pulls_url": "https://api.github.com/repos/distri/postmaster/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/distri/postmaster/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/distri/postmaster/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/distri/postmaster/labels{/name}",
        "releases_url": "https://api.github.com/repos/distri/postmaster/releases{/id}",
        "created_at": "2013-12-20T00:42:15Z",
        "updated_at": "2014-02-13T20:12:20Z",
        "pushed_at": "2014-02-13T20:12:20Z",
        "git_url": "git://github.com/distri/postmaster.git",
        "ssh_url": "git@github.com:distri/postmaster.git",
        "clone_url": "https://github.com/distri/postmaster.git",
        "svn_url": "https://github.com/distri/postmaster",
        "homepage": null,
        "size": 152,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "CoffeeScript",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master",
        "master_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "organization": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "network_count": 0,
        "subscribers_count": 2,
        "branch": "v0.2.1",
        "publishBranch": "gh-pages"
      },
      "dependencies": {}
    }
  }
});