Touchy
======

    Observable = require "observable"

Get x,y position changes from mouse and touch events in an html element.

    module.exports = (element, {x,y}) ->
      x = Observable(x)
      y = Observable(y)

      x: x
      y: y
    
Helpers
-------

    localPosition = (element, event) ->
      rect = element.getBoundingClientRect()

      point =
        x: clamp (event.pageX - rect.left) / rect.width, 0, MAX
        y: clamp (event.pageY - rect.top) / rect.height, 0, MAX

      # Add mouse into touch identifiers as 0
      point.identifier = (event.identifier + 1) or 0

      return point

    processTouches = (event, fn) ->
      event.preventDefault()
  
      if event.type is "touchend"
        # touchend doesn't have any touches, but does have changed touches
        touches = event.changedTouches
      else
        touches = event.touches

      Array::forEach.call touches, fn

Attach an event listener to an element

    listen = (element, event, handler) ->
      element.addEventListener(event, handler, false)

Clamp a number to be within a range.

    clamp = (number, min, max) ->
      Math.min(Math.max(number, min), max)
