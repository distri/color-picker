Color Picker
============

    Observable = require "observable"
    Touchy = require("./lib/touchy")

    {applyStylesheet} = require("./util")

    applyStylesheet(require("./style"))

    document.body.appendChild require("./template")()

    {x:saturation, y:inverseLightness} = Touchy(document.querySelector(".overlay.w"))
    {y:hue} = Touchy(document.querySelector(".hue"))

    hue(0)

    swatch = document.querySelector(".swatch")

    hue.observe (hueValue) ->
      document.body.style.backgroundColor = "hsl(#{hueValue * 360}, 100%, 54%)"
      update()

    update = ->
      swatch.style.backgroundColor = "hsl(#{hue() * 360}, #{saturation() * 100}%, #{lightness() * 100}%)"

    lightness = Observable(1)

    lightness.observe update

    saturation.observe update

    inverseLightness.observe (value) ->
      lightness(1 - value)
