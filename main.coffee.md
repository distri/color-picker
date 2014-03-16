Color Picker
============

The goal of this color picker is to have a a picker that works well in almost
any size of environment, is easily embeddable within other web applications,
and responds instantly to mouse or touch interactions.

TODO: Use postmessage to transmit the data value to the embedding application.

Load dependencies.

    Observable = require "observable"
    Touchy = require("./lib/touchy")

Apply stylesheet.

    {applyStylesheet} = require("./util")
    applyStylesheet(require("./style"))

Render template.

    document.body.appendChild require("./template")()

Hook up observables. These map the x and y observable dimensions into names of 
what they actually are.

    {x, y} = Touchy(document.querySelector(".overlay.w"))
    {y:hue} = Touchy(document.querySelector(".hue"))

    x.observe (newValue) ->
      t = newValue/2

      saturation(newValue)
      lightness((1 - t) * y() + t)

    y.observe (newValue) ->
      t = x() / 2
      lightness((1 - t) * newValue + t)

    saturation = Observable(1)
    lightness = Observable(0.54)

Our swatch and background color update whenever a component value changes.

    swatch = document.querySelector(".swatch")

    update = ->
      document.body.style.backgroundColor = "hsl(#{hue() * 360}, 100%, 54%)"
      swatch.style.backgroundColor = "hsl(#{hue() * 360}, #{saturation() * 100}%, #{lightness() * 100}%)"

    lightness.observe update
    saturation.observe update
    hue.observe update

Initialize values. 

    # TODO: Load from calling context
    hue(0)
    saturation(1)
    lightness(0.54)
