Color Picker
============

The goal of this color picker is to have a a picker that works well in almost
any size of environment, is easily embeddable within other web applications,
and responds instantly to mouse or touch interactions.

Load dependencies.

    Observable = require "observable"
    Touchy = require("./lib/touchy")
    Throttle = require("./lib/throttle")
    HSL = require "./lib/hsl"

Apply stylesheet.

    {applyStylesheet} = require("./util")
    applyStylesheet(require("./style"))

Render template.

    document.body.appendChild require("./template")()

Use the postmaster to send value to our parent, store our current value in it as well.

    postmaster = require("postmaster")()
    postmaster.value = Observable()

Propagate newly received values.

    postmaster.value.observe (newValue) ->
      [match, values...] = newValue.match HSL.matcher

      [h, s, l] = values.map parseFloat

      hue(h / 360)
      saturation(s / 100)
      lightness(l / 100)

      notifyParent(newValue)

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
      value = "hsl(#{hue() * 360}, #{saturation() * 100}%, #{lightness() * 100}%)"
      swatch.style.backgroundColor = value
      postmaster.value value

Throttle notifications to parent to limit to `20/s`.

    notifyParent = Throttle(0.05) (value) ->
      postmaster.sendToParent
        value: value

    lightness.observe update
    saturation.observe update
    hue.observe update

Initialize values. 

    if location.hash
      postmaster.value JSON.parse location.hash.substring(1)
    else
      hue(0)
      saturation(1)
      lightness(0.54)
