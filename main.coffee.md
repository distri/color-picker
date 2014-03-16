Color Picker
============

    {applyStylesheet} = require("./util")

    applyStylesheet(require("./style"))

    document.body.appendChild require("./template")()

    Observable = require "observable"

    Touchy = require("./lib/touchy")

    {x:saturation, y:inverseLightness} = Touchy(document.querySelector(".overlay.w"))
    {y:hue} = Touchy(document.querySelector(".hue"))

    hue.observe (hueValue) ->
      document.body.style.backgroundColor = "hsl(#{hueValue * 360}, 100%, 54%)"

    update = ->

    lightness = Observable(1)

    lightness.observe (value) ->

    saturation.observe (value) ->
      
    inverseLightness.observe (value) ->
      lightness(1 - value)
